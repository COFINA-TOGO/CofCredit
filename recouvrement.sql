-- ===============================================================================
-- Requête de calcul du taux de recouvrement par prêt (ACCOUNT_NUMBER)
-- Période : Septembre 2024
-- Système : Oracle Flexcube
-- ===============================================================================

-- Définition de la période
DEFINE periode_debut = TO_DATE('01/09/2024', 'DD/MM/YYYY');
DEFINE periode_fin = TO_DATE('30/09/2024', 'DD/MM/YYYY');

WITH 
-- Liste des composants à considérer
composants_filtres AS (
    SELECT 'TAF_OPRPNY' AS component_name FROM DUAL
    UNION ALL SELECT 'TAF_INT' FROM DUAL
    UNION ALL SELECT 'MAIN_INT' FROM DUAL
    UNION ALL SELECT 'PRINCIPAL' FROM DUAL
    UNION ALL SELECT 'ODPR_PNTY' FROM DUAL
),

-- Montants dus AVANT la période
dus_avant_periode AS (
    SELECT 
        s.ACCOUNT_NUMBER,
        SUM(s.AMOUNT_DUE) AS montant_du_avant,
        SUM(s.AMOUNT_SETTLED) AS montant_regle_avant
    FROM cltb_account_schedules s
    INNER JOIN composants_filtres cf ON s.COMPONENT_NAME = cf.component_name
    WHERE s.SCHEDULE_DUE_DATE < '01/09/2025'
    GROUP BY s.ACCOUNT_NUMBER
),

-- Montants payés AVANT la période
payes_avant_periode AS (
    SELECT 
        p.ACCOUNT_NUMBER,
        SUM(p.AMOUNT_PAID) AS montant_paye_avant
    FROM CLTB_AMOUNT_PAID p
    INNER JOIN composants_filtres cf ON p.COMPONENT_NAME = cf.component_name
    WHERE p.PAID_DATE < '01/09/2025'
    GROUP BY p.ACCOUNT_NUMBER
),

-- Calcul de l'exigible avant période
exigible_avant AS (
    SELECT 
        COALESCE(d.ACCOUNT_NUMBER, p.ACCOUNT_NUMBER) AS ACCOUNT_NUMBER,
        COALESCE(d.montant_du_avant, 0) AS montant_du_avant,
        COALESCE(p.montant_paye_avant, 0) AS montant_paye_avant,
        COALESCE(d.montant_du_avant, 0) - COALESCE(p.montant_paye_avant, 0) AS exigible_avant_periode
    FROM dus_avant_periode d
    FULL OUTER JOIN payes_avant_periode p ON d.ACCOUNT_NUMBER = p.ACCOUNT_NUMBER
),

-- Montants dus PENDANT la période
dus_periode AS (
    SELECT 
        s.ACCOUNT_NUMBER,
        SUM(s.AMOUNT_DUE) AS montant_du_periode
    FROM cltb_account_schedules s
    INNER JOIN composants_filtres cf ON s.COMPONENT_NAME = cf.component_name
    WHERE s.SCHEDULE_DUE_DATE >= '01/09/2025'
      AND s.SCHEDULE_DUE_DATE <= '30/09/2025'
    GROUP BY s.ACCOUNT_NUMBER
),

-- TOUS les paiements (avant ET pendant la période) sur les échéances DE la période
tous_payes_sur_echeances_periode AS (
    SELECT 
        p.ACCOUNT_NUMBER,
        SUM(p.AMOUNT_PAID) AS total_paye_sur_echeances_periode
    FROM CLTB_AMOUNT_PAID p
    INNER JOIN composants_filtres cf ON p.COMPONENT_NAME = cf.component_name
    WHERE p.DUE_DATE >= '01/09/2025'
      AND p.DUE_DATE <= '30/09/2025'
    GROUP BY p.ACCOUNT_NUMBER
),

-- TOUS les paiements (avant ET pendant la période) sur les échéances AVANT la période
tous_payes_sur_echeances_avant AS (
    SELECT 
        p.ACCOUNT_NUMBER,
        SUM(p.AMOUNT_PAID) AS total_paye_sur_echeances_avant
    FROM CLTB_AMOUNT_PAID p
    INNER JOIN composants_filtres cf ON p.COMPONENT_NAME = cf.component_name
    WHERE p.DUE_DATE < '01/09/2025'
    GROUP BY p.ACCOUNT_NUMBER
),

-- Montants payés PENDANT la période sur les échéances DE la période
payes_periode_sur_echeances_periode AS (
    SELECT 
        p.ACCOUNT_NUMBER,
        SUM(p.AMOUNT_PAID) AS montant_paye_sur_echeances_periode
    FROM CLTB_AMOUNT_PAID p
    INNER JOIN composants_filtres cf ON p.COMPONENT_NAME = cf.component_name
    WHERE p.PAID_DATE >= '01/09/2025'
      AND p.PAID_DATE <= '30/09/2025'
      AND p.DUE_DATE >= '01/09/2025'
      AND p.DUE_DATE <= '30/09/2025'
    GROUP BY p.ACCOUNT_NUMBER
),

-- Montants payés PENDANT la période sur les échéances AVANT la période
payes_periode_sur_echeances_avant AS (
    SELECT 
        p.ACCOUNT_NUMBER,
        SUM(p.AMOUNT_PAID) AS montant_paye_sur_echeances_avant
    FROM CLTB_AMOUNT_PAID p
    INNER JOIN composants_filtres cf ON p.COMPONENT_NAME = cf.component_name
    WHERE p.PAID_DATE >= '01/09/2025'
      AND p.PAID_DATE <= '30/09/2025'
      AND p.DUE_DATE < '01/09/2025'
    GROUP BY p.ACCOUNT_NUMBER
),

-- Calcul de l'exigible de la période (éclaté en deux colonnes)
exigible_periode AS (
    SELECT 
        COALESCE(d.ACCOUNT_NUMBER, tpp.ACCOUNT_NUMBER, tpa.ACCOUNT_NUMBER, pp.ACCOUNT_NUMBER, pa.ACCOUNT_NUMBER) AS ACCOUNT_NUMBER,
        COALESCE(d.montant_du_periode, 0) AS montant_du_periode,
        COALESCE(pp.montant_paye_sur_echeances_periode, 0) AS montant_paye_sur_echeances_periode,
        COALESCE(pa.montant_paye_sur_echeances_avant, 0) AS montant_paye_sur_echeances_avant,
        -- Exigible éclaté en deux parties basé sur TOUS les paiements :
        -- Exigible échéances période = Montant dû période - TOUS les paiements sur échéances période
        COALESCE(d.montant_du_periode, 0) - COALESCE(tpp.total_paye_sur_echeances_periode, 0) AS exigible_echeances_periode,
        -- Exigible échéances avant = Montant dû avant - TOUS les paiements sur échéances avant
        COALESCE(ea_ref.montant_du_avant, 0) - COALESCE(tpa.total_paye_sur_echeances_avant, 0) AS exigible_echeances_avant
    FROM dus_periode d
    FULL OUTER JOIN tous_payes_sur_echeances_periode tpp ON d.ACCOUNT_NUMBER = tpp.ACCOUNT_NUMBER
    FULL OUTER JOIN tous_payes_sur_echeances_avant tpa ON COALESCE(d.ACCOUNT_NUMBER, tpp.ACCOUNT_NUMBER) = tpa.ACCOUNT_NUMBER
    FULL OUTER JOIN payes_periode_sur_echeances_periode pp ON COALESCE(d.ACCOUNT_NUMBER, tpp.ACCOUNT_NUMBER, tpa.ACCOUNT_NUMBER) = pp.ACCOUNT_NUMBER
    FULL OUTER JOIN payes_periode_sur_echeances_avant pa ON COALESCE(d.ACCOUNT_NUMBER, tpp.ACCOUNT_NUMBER, tpa.ACCOUNT_NUMBER, pp.ACCOUNT_NUMBER) = pa.ACCOUNT_NUMBER
    LEFT JOIN exigible_avant ea_ref ON COALESCE(d.ACCOUNT_NUMBER, tpp.ACCOUNT_NUMBER, tpa.ACCOUNT_NUMBER, pp.ACCOUNT_NUMBER, pa.ACCOUNT_NUMBER) = ea_ref.ACCOUNT_NUMBER
),

-- Liste complète des comptes (ACCOUNT_NUMBER)
-- Exclusion des comptes soldés (L) et annulés (V)
tous_comptes AS (
    SELECT DISTINCT s.ACCOUNT_NUMBER 
    FROM cltb_account_schedules s
    INNER JOIN cltb_account_master m ON s.ACCOUNT_NUMBER = m.ACCOUNT_NUMBER
    WHERE s.COMPONENT_NAME IN ('TAF_OPRPNY', 'TAF_INT', 'MAIN_INT', 'PRINCIPAL', 'ODPR_PNTY')
      AND m.ACCOUNT_STATUS NOT IN ('L', 'V')
    UNION
    SELECT DISTINCT p.ACCOUNT_NUMBER 
    FROM CLTB_AMOUNT_PAID p
    INNER JOIN cltb_account_master m ON p.ACCOUNT_NUMBER = m.ACCOUNT_NUMBER
    WHERE p.COMPONENT_NAME IN ('TAF_OPRPNY', 'TAF_INT', 'MAIN_INT', 'PRINCIPAL', 'ODPR_PNTY')
      AND m.ACCOUNT_STATUS NOT IN ('L', 'V')
),

-- Consolidation finale
donnees_consolidees AS (
    SELECT 
        tc.ACCOUNT_NUMBER,
        COALESCE(ea.montant_du_avant, 0) AS montant_du_avant,
        COALESCE(ea.montant_paye_avant, 0) AS montant_paye_avant,
        COALESCE(ea.exigible_avant_periode, 0) AS exigible_avant_periode,
        COALESCE(ep.montant_du_periode, 0) AS montant_du_periode,
        COALESCE(ep.montant_paye_sur_echeances_periode, 0) AS montant_paye_sur_echeances_periode,
        COALESCE(ep.montant_paye_sur_echeances_avant, 0) AS montant_paye_sur_echeances_avant,
        COALESCE(ep.exigible_echeances_periode, 0) AS exigible_echeances_periode,
        COALESCE(ep.exigible_echeances_avant, 0) AS exigible_echeances_avant
    FROM tous_comptes tc
    LEFT JOIN exigible_avant ea ON tc.ACCOUNT_NUMBER = ea.ACCOUNT_NUMBER
    LEFT JOIN exigible_periode ep ON tc.ACCOUNT_NUMBER = ep.ACCOUNT_NUMBER
)

-- Requête finale avec calcul des taux de recouvrement
SELECT 
    ACCOUNT_NUMBER AS "Numéro de Compte",
    
    -- Données AVANT la période
    ROUND(montant_du_avant, 2) AS "Montant Total Dû Avant Période",
    ROUND(montant_paye_avant, 2) AS "Montant Total Payé Avant Période",
    ROUND(exigible_avant_periode, 2) AS "Exigible Avant Période",
    
    -- Données DE la période
    ROUND(montant_du_periode, 2) AS "Montant Dû de la Période",
    ROUND(montant_paye_sur_echeances_periode, 2) AS "Montant Payé sur Échéances de la Période",
    ROUND(montant_paye_sur_echeances_avant, 2) AS "Montant Payé sur Échéances Avant la Période",
    
    -- Exigible éclaté en deux colonnes
    ROUND(exigible_echeances_periode, 2) AS "Exigible des Échéances de la Période",
    ROUND(exigible_echeances_avant, 2) AS "Exigible des Échéances Avant la Période",
    
    -- Pourcentages d'exigible
    CASE 
        WHEN montant_du_periode > 0 THEN
            ROUND((exigible_echeances_periode / montant_du_periode) * 100, 2)
        ELSE 
            0
    END AS "% Exigible Échéances Période",
    
    CASE 
        WHEN exigible_avant_periode > 0 THEN
            ROUND((exigible_echeances_avant / exigible_avant_periode) * 100, 2)
        ELSE 
            0
    END AS "% Exigible Échéances Avant",
    
    -- Taux de recouvrement sur la période (échéances de la période)
    -- (Montant payé sur échéances période / Montant dû durant la période) * 100
    CASE 
        WHEN montant_du_periode > 0 THEN
            ROUND((montant_paye_sur_echeances_periode / montant_du_periode) * 100, 2)
        ELSE 
            0
    END AS "Taux Recouvrement Période (%)",
    
    -- Taux de recouvrement sur échéances avant la période
    -- (Montant payé sur échéances avant / Exigible avant période) * 100
    CASE 
        WHEN exigible_avant_periode > 0 THEN
            ROUND((montant_paye_sur_echeances_avant / exigible_avant_periode) * 100, 2)
        ELSE 
            0
    END AS "Taux Recouvrement Avant Période (%)",
    
    -- Taux de recouvrement total
    -- Recouvrement de l'exigible avant ET durant la période
    -- (Total payé durant période / (Exigible avant + Dû durant période)) * 100
    CASE 
        WHEN (exigible_avant_periode + montant_du_periode) > 0 THEN
            ROUND(((montant_paye_sur_echeances_periode + montant_paye_sur_echeances_avant) / (exigible_avant_periode + montant_du_periode)) * 100, 2)
        ELSE 
            0
    END AS "Taux Recouvrement Total (%)"
    
FROM donnees_consolidees

-- Filtrer les comptes qui ont au moins une activité (dû ou payé)
WHERE montant_du_avant > 0 
   OR montant_paye_avant > 0 
   OR montant_du_periode > 0 
   OR montant_paye_sur_echeances_periode > 0
   OR montant_paye_sur_echeances_avant > 0

ORDER BY ACCOUNT_NUMBER;

-- ===============================================================================
-- NOTES D'UTILISATION :
-- ===============================================================================
-- 1. Pour changer la période, modifier les dates dans les clauses WHERE
-- 2. Les composants filtrés sont : TAF_OPRPNY, TAF_INT, MAIN_INT, PRINCIPAL, ODPR_PNTY
-- 3. EXIGIBLE ÉCLATÉ EN DEUX COLONNES :
--    - Exigible des Échéances de la Période = Montant dû période - TOUS les paiements sur échéances période (avant + pendant)
--    - Exigible des Échéances Avant = Montant dû avant période - TOUS les paiements sur échéances avant (avant + pendant)
--    IMPORTANT : L'exigible est calculé en fonction de la date d'échéance (DUE_DATE), pas de la date de paiement
-- 4. POURCENTAGES D'EXIGIBLE :
--    - % Exigible Échéances Période = (Exigible échéances période / Montant dû période) * 100
--    - % Exigible Échéances Avant = (Exigible échéances avant / Montant dû avant période) * 100
-- 5. TAUX DE RECOUVREMENT :
--    - Taux Recouvrement Période = paiements PENDANT période sur échéances période / dû période
--    - Taux Recouvrement Avant Période = paiements PENDANT période sur échéances avant / montant dû avant période
--    - Taux Recouvrement Total = (paiements PENDANT période sur toutes échéances) / (montant dû avant + dû période)
-- 6. L'exigible = montant dû - montant payé (solde restant à payer sur les échéances concernées)
-- 7. EXCLUSIONS : Comptes avec ACCOUNT_STATUS = 'L' (soldé) ou 'V' (annulé)
-- 8. Les paiements de la période sont séparés selon qu'ils concernent :
--    - Des échéances de la période (DUE_DATE dans la période)
--    - Des échéances antérieures (DUE_DATE avant la période)
-- ===============================================================================

-- Exemple pour changer la période (décommenter et adapter) :
-- DEFINE periode_debut = TO_DATE('01/10/2024', 'DD/MM/YYYY');
-- DEFINE periode_fin = TO_DATE('31/10/2024', 'DD/MM/YYYY');

