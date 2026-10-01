// Génère un manuel par profil dans resources/manuels/<slug>/ à partir :
//   - des captures de capture-roles.mjs (captures/<slug>/*.png) ;
//   - des droits de chaque profil (droits.php → sessions/_droits.json) ;
//   - du menu de l'application (navigation/vertical/dashboard.js) ;
//   - de la mise en forme des manuels de Report (gabarit/).
// Usage, depuis la racine du projet : node tools/manuels/generer-manuels.mjs [profils]
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ICI = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(ICI, '../..')
const CAPT = path.resolve(process.env.CAPTURES ?? path.join(ICI, 'captures'))
const SORTIE = path.join(REPO, 'resources/manuels')
const PROFILS = (process.argv[2] ?? '').split(',').filter(Boolean)
const DATE = new Date().toLocaleDateString('fr-FR')

// tinker sort en erreur même quand le script réussit : seul le fichier produit compte
fs.rmSync(path.join(ICI, 'sessions/_droits.json'), { force: true })
spawnSync('php', ['artisan', 'tinker', path.join(ICI, 'droits.php')], { cwd: REPO, stdio: ['ignore', 'ignore', 'inherit'] })
const droits = JSON.parse(fs.readFileSync(path.join(ICI, 'sessions/_droits.json'), 'utf8'))
const nav = (await import(pathToFileURL(path.join(REPO, 'resources/js/navigation/vertical/dashboard.js')))).default

const STYLE_PLUS = `.menu-cote{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:24px;align-items:start;margin:16px 0 24px}
.menu-cote .menu-arbre{margin:0;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
figure.menu{margin:0;max-width:240px}
figure.menu img{width:100%;height:auto}
@media (max-width:760px){.menu-cote{grid-template-columns:1fr}figure.menu{max-width:220px;margin:0 auto}}
@media print{.menu-cote{grid-template-columns:minmax(0,1fr) 200px}figure.menu{max-width:200px}}
ol.circuit{list-style:none;padding:0;margin:16px 0 24px;counter-reset:e;display:grid;gap:8px}
ol.circuit li{counter-increment:e;display:grid;grid-template-columns:28px 150px minmax(0,1fr);gap:12px;align-items:baseline;padding:10px 14px;border:1px solid var(--trait);border-radius:10px;background:var(--papier)}
ol.circuit li::before{content:counter(e);font-family:var(--mono);color:var(--pale)}
ol.circuit li b{font-weight:600}
ol.circuit li.vous{border-color:var(--accent);background:var(--accent-fond)}
ol.circuit li.vous::before{color:var(--accent-encre);font-weight:700}
@media (max-width:640px){ol.circuit li{grid-template-columns:24px minmax(0,1fr)}ol.circuit li span{grid-column:2}}
`
const gabarit = f => fs.readFileSync(path.join(ICI, 'gabarit', f), 'utf8')
const STYLE = gabarit('style.html').replace('</style>', `${STYLE_PLUS}</style>`)
const FIN = gabarit('fin.html')

const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ─── Ce que chaque profil fait dans l'application ──────────────────────────
const MISSIONS = {
  'administrateur': 'L\'Administrateur gère les comptes utilisateurs et dispose de tous les droits : il ouvre chacun des écrans décrits dans les manuels des autres profils et peut intervenir à toutes les étapes d\'un dossier.',
  'admin-credit': 'L\'Admin Crédit saisit les PV de comité, prépare les contrats (ou les notifications hypothécaires quand le crédit est garanti par une hypothèque), charge les documents signés et envoie le contrat en validation au Head Crédit, gère les cautions et crée les CAT une fois le contrat validé.',
  'analyste-credit': 'L\'Analyste Crédit vérifie les notifications de CAF : il les complète si besoin puis les valide, ce qui en fait un PV soumis à la validation du Head Crédit, ou les rejette vers le CAF.',
  'head-credit': 'Le Head Crédit valide ou rejette les PV, la version finale des contrats, les notifications hypothécaires et les CAT.',
  'caf': 'Le CAF saisit les notifications de CAF de ses clients, suit leurs contrats et saisit les demandes de report d\'échéance.',
  'chef-agence': 'Le Chef d\'agence valide ou rejette, en premier niveau, les demandes de report d\'échéance de son agence.',
  'md': 'Le MD valide les reports d\'échéance et consulte les PV, les contrats, les notifications hypothécaires et les CAT.',
  'dex': 'Le DEX valide les reports d\'échéance et consulte les PV, les contrats, les notifications hypothécaires et les CAT.',
  'operations': 'Les Opérations débloquent les CAT validés, ou en rejettent le déblocage.',
  'juridique': 'Le Juridique charge les contrats notariés des notifications hypothécaires, gère les documents signés des garants et consulte les garanties.',
  'courrier': 'Le Courrier consulte et télécharge les garants et les garanties.',
}

// Les compteurs « À traiter » de l'accueil (voir DashboardController)
const ACCUEIL = {
  'admin-credit': ['les PV rejetés à corriger', 'les PV validés sans contrat ni notification', 'les contrats signés à envoyer en validation', 'les contrats rejetés par le Head Crédit', 'les contrats validés sans CAT', 'les CAT rejetés'],
  'head-credit': ['les PV en attente de votre validation', 'les contrats en attente de validation finale', 'les CAT en attente de validation', 'les notifications en attente de validation'],
  'operations': ['les CAT à débloquer'],
  'caf': ['les contrats en attente de signature du client'],
  'analyste-credit': ['les notifications de CAF à vérifier'],
  'juridique': ['les notifications sans contrat notarié'],
  'administrateur': ['les PV en attente de validation', 'les contrats signés à envoyer en validation', 'les contrats en attente de validation finale', 'les CAT en attente de validation', 'les notifications en attente de validation', 'les CAT à débloquer'],
}

// Le circuit d'un crédit : [profil(s) concerné(s), étape]
const CIRCUIT = [
  [['admin-credit'], 'Admin Crédit', 'saisit le <b>PV de comité</b>. Un PV peut aussi venir d\'une notification de CAF, vérifiée par l\'Analyste Crédit.'],
  [['head-credit'], 'Head Crédit', 'valide le PV, ou le rejette avec un motif : l\'Admin Crédit le corrige et le PV repart en validation.'],
  [['admin-credit'], 'Admin Crédit', 'crée le <b>contrat</b>, ou la <b>notification hypothécaire</b> si une hypothèque garantit le crédit, et ses cautions.'],
  [['admin-credit'], 'Admin Crédit', 'une fois le client passé à la signature, charge le contrat et le billet à ordre signés, puis <b>envoie le contrat en validation</b>.'],
  [['head-credit', 'juridique'], 'Head Crédit', 'valide le contrat, ou le rejette avec un motif. Pour une notification hypothécaire, le Head Crédit la valide puis le <b>Juridique</b> charge le contrat notarié.'],
  [['admin-credit'], 'Admin Crédit', 'crée le <b>CAT</b> (conditions avant tirage).'],
  [['head-credit'], 'Head Crédit', 'valide le CAT ou le rejette.'],
  [['operations'], 'Opérations', '<b>débloque</b> le CAT validé : les fonds peuvent être décaissés.'],
]
const CIRCUIT_REPORT = [
  [['caf'], 'CAF', 'saisit la demande de report d\'échéance.'],
  [['chef-agence'], 'Chef d\'agence', 'valide ou rejette la demande.'],
  [['dex'], 'DEX', 'valide ou rejette la demande.'],
  [['head-credit'], 'Head Crédit', 'valide ou rejette la demande.'],
  [['md'], 'MD', 'valide ou rejette la demande.'],
  [['admin-credit'], 'Admin Crédit', 'traite le report validé.'],
]

function generer(d) {
  const slug = d.slug
  const regles = d.rules ?? []
  const admin = regles.some(r => r.subject.includes('all'))
  const peut = (action, sujet) => regles.some(r =>
    (r.subject.includes('all') || r.subject.includes(sujet)) && (r.action.includes('manage') || r.action.includes(action)))
  const dossier = path.join(SORTIE, slug)
  const dossierImg = path.join(dossier, 'img')
  fs.rmSync(dossier, { recursive: true, force: true })
  fs.mkdirSync(dossierImg, { recursive: true })

  // ─── Captures : converties en webp à la première utilisation ───────────
  const dims = {}
  function image(nom) {
    if (dims[nom]) return dims[nom]
    const png = [path.join(CAPT, slug, `${nom}.png`), path.join(CAPT, '_commun', `${nom}.png`)].find(f => fs.existsSync(f))
    if (!png) return null
    const b = fs.readFileSync(png)
    const dim = { l: b.readUInt32BE(16), h: b.readUInt32BE(20) }
    execFileSync('convert', [png, '-quality', '80', path.join(dossierImg, `${nom}.webp`)])
    return (dims[nom] = dim)
  }
  const a = nom => !!image(nom)
  function fig(nom, alt, legende = '') {
    const dim = image(nom)
    if (!dim) return ''
    const classe = nom === '01-menu' ? ' class="menu"' : dim.h > 1400 ? ' class="haute"' : dim.h <= 900 ? ' class="moyenne"' : ''
    return `  <figure${classe}><button class="zoom" type="button" aria-label="Agrandir la capture"><img src="img/${nom}.webp" alt="${esc(alt)}" loading="lazy" width="${dim.l}" height="${dim.h}"></button><figcaption>${legende || `<b>${esc(alt)}.</b>`}</figcaption></figure>\n`
  }
  const chemin = t => `  <p class="chemin">${t}</p>\n`
  const liste = items => {
    const li = items.filter(Boolean)
    return li.length ? `  <ul>\n${li.map(x => `    <li>${x}</li>`).join('\n')}\n  </ul>\n` : ''
  }

  const chapitres = []
  const chapitre = (id, titre, intro, corps) => { if (corps.trim()) chapitres.push({ id, titre, intro, corps }) }

  // ─── 1. Prise en main ────────────────────────────────────────────────────
  const visible = e => e.children ? e.children.some(visible) && (!e.action || peut(e.action, e.subject)) : peut(e.action, e.subject)
  const feuilles = e => e.children.filter(visible).map(c => c.children ? `${esc(c.title)} (${c.children.filter(visible).map(x => esc(x.title)).join(', ')})` : esc(c.title)).join(', ')
  let arbre = ''
  let groupe = null
  const fermer = () => { if (groupe?.li.length) arbre += `    <div><h5>${esc(groupe.titre)}</h5><ul>\n${groupe.li.join('\n')}</ul></div>\n`; groupe = null }
  for (const e of nav) {
    if (e.heading) { fermer(); groupe = { titre: e.heading, li: [] }; continue }
    if (!visible(e)) continue
    groupe ??= { titre: 'Menu', li: [] }
    groupe.li.push(`      <li>${e.children ? `${esc(e.title)} › ${feuilles(e)}` : esc(e.title)}</li>`)
  }
  fermer()

  const accueil = ACCUEIL[slug] ?? []
  chapitre('prise-en-main', 'Prise en main', 'Cofina Crédit Digital s\'ouvre dans un navigateur. Chaque profil ne voit que les écrans et les boutons que ses droits lui ouvrent.', `  <h3 id="connexion">Connexion</h3>
  <ol>
    <li>Saisissez votre adresse e-mail et votre mot de passe.</li>
    <li>Cliquez sur <span class="btn">Connexion</span>.</li>
    <li>Si votre compte a été créé avec « Changement de mot de passe : Obligatoire », l'application vous demande d'en choisir un nouveau avant d'aller plus loin.</li>
  </ol>
${fig('00-connexion', 'Écran de connexion', '<b>Écran de connexion.</b> Un compte désactivé est refusé.')}
  <h3 id="accueil">L'accueil</h3>
${chemin('Menu <b>Accueil</b>, ouvert après chaque connexion')}  <p>L'accueil rappelle la date et votre profil, puis rassemble dans <b>À traiter</b> les dossiers qui attendent une action de votre part${accueil.length ? ' :' : '.'}</p>
${liste(accueil.map(x => x[0].toUpperCase() + x.slice(1) + '.'))}  <p>Chaque compteur ouvre la liste où traiter ces dossiers ; seuls les compteurs non nuls s'affichent, et « Rien n'attend votre action » s'affiche quand tout est à jour. Le bouton <span class="btn">Actualiser</span> recompte. Les <b>Raccourcis</b> mènent aux écrans de création que votre profil peut ouvrir.</p>
${fig('01-accueil', 'Page d\'accueil', `<b>Page d'accueil</b> du profil ${esc(d.role)}.`)}
  <h3 id="menu">Votre menu</h3>
  <p>Le menu de gauche ne montre que les écrans autorisés pour votre profil ; les groupes se déplient d'un clic. Voici l'arborescence vue par le profil ${esc(d.role)} :</p>
  <div class="menu-cote">
  <div class="menu-arbre">
${arbre}  </div>
${fig('01-menu', 'Menu du profil', '<b>Le menu</b>, groupes repliés.')}  </div>
  <h3 id="listes">Les écrans</h3>
  <ul>
    <li>Sous la barre du haut, le <b>fil d'Ariane</b> rappelle où vous êtes (par exemple <b>Contrat › Basique › Sans CAT</b>) ; un clic sur une étape y revient.</li>
    <li>Chaque page commence par un <b>en-tête</b> : son titre, une phrase qui dit à quoi elle sert, la flèche de retour à la liste et, à droite, les actions principales (<span class="btn">Enregistrer</span>, <span class="btn">Consulter</span>…).</li>
    <li>Les <b>listes</b> se filtrent par les champs du bloc Filtres et par la recherche ; <span class="btn">Recharger</span> relit les données. Le pied de liste indique le nombre de résultats et permet de changer de page.</li>
    <li>Dans une liste, l'icône en forme d'œil ouvre la fiche ; les trois points verticaux ouvrent le <b>menu d'actions</b> de la ligne (consulter les pièces, télécharger un document, valider…). Les actions absentes du menu sont celles que votre profil ou l'état du dossier ne permettent pas.</li>
    <li>Les <b>fiches</b> présentent les chiffres clés en tête, puis les informations par bloc. Un dossier rejeté affiche le motif du rejet en rouge.</li>
  </ul>
  <h3 id="compte">Votre compte</h3>
${chemin('Menu de l\'avatar, en haut à droite')}  <p>Trois onglets : <b>Compte</b> (nom et adresse e-mail), <b>Sécurité</b> (changer de mot de passe : au moins 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial) et <b>Signature</b> (l'image de votre signature, reprise dans les documents générés).</p>
${fig('02-parametres-compte', 'Paramètres du compte')}${fig('02-parametres-securite', 'Changer de mot de passe')}${fig('02-parametres-signature', 'Signature')}
  <h3 id="manuel-appli">Retrouver ce manuel</h3>
${chemin('Menu <b>Aide › Manuel d\'utilisation</b>')}  <p>Le manuel de votre profil s'ouvre directement. Le champ de recherche surligne un mot dans le manuel ; <span class="btn">Exporter en PDF</span> l'imprime avec une couverture et un sommaire, et <span class="btn">Plein écran</span> l'ouvre dans un nouvel onglet.${admin ? ' En tant qu\'administrateur, la liste de gauche vous donne aussi accès aux manuels de tous les profils.' : ''}</p>
${fig('03-manuel', 'Manuel d\'utilisation')}`)

  // ─── 2. Le circuit d'un dossier ─────────────────────────────────────────
  const etapes = c => `  <ol class="circuit">\n${c.map(([qui, nom, texte]) => `    <li${qui.includes(slug) ? ' class="vous"' : ''}><b>${esc(nom)}</b><span>${texte}</span></li>`).join('\n')}\n  </ol>\n`
  const dansCircuit = CIRCUIT.some(([qui]) => qui.includes(slug))
  const dansReport = CIRCUIT_REPORT.some(([qui]) => qui.includes(slug))
  chapitre('circuit', 'Le circuit d\'un dossier', `De la demande au décaissement, chaque dossier passe de profil en profil. ${dansCircuit || dansReport ? 'Vos étapes sont surlignées.' : admin ? 'L\'administrateur peut intervenir à chacune de ces étapes.' : 'Votre profil consulte les dossiers sans intervenir dans ce circuit.'} Chaque passage d'étape prévient par e-mail le profil suivant.`,
    `  <h3 id="circuit-credit">Crédit</h3>\n${etapes(CIRCUIT)}${peut('read', 'deadline-postponed') ? `  <h3 id="circuit-report">Report d'échéance</h3>\n${etapes(CIRCUIT_REPORT)}` : ''}`)

  // ─── 3. PV de comité et notifications de CAF ────────────────────────────
  let pv = ''
  if (a('11-notification-caf-liste') || a('11-notification-caf-historique') || a('11-notification-caf-detail')) {
    pv += `  <h3 id="notifications-caf">Les notifications de CAF</h3>
  <p>La notification de CAF est la demande de crédit saisie par le CAF : client, montant, durée, conditions et garanties proposées. Elle attend la vérification de l'Analyste Crédit ; une fois validée, elle devient un PV soumis au Head Crédit.</p>
${liste([
  a('11-notification-caf-liste') && 'La liste <b>Sans PV</b> montre les notifications en cours de vérification ou rejetées ; l\'<b>Historique</b> les montre toutes.',
  peut('create', 'pv-notification') && 'Pour en saisir une, ouvrez le formulaire de création, remplissez chaque bloc puis <span class="btn">Enregistrer</span>. Une notification rejetée se corrige depuis son menu d\'actions (<b>Modifier</b>) puis repart en vérification.',
  peut('check', 'pv-notification') && 'Pour vérifier une notification, choisissez <b>Vérifier</b> dans son menu d\'actions : complétez si besoin les informations (Admin Crédit, conditions…), puis validez-la, ce qui crée le PV et l\'envoie en validation au Head Crédit, ou rejetez-la avec un motif.',
])}${fig('11-notification-caf-liste', 'Notifications de CAF sans PV')}${fig('11-notification-caf-historique', 'Historique des notifications de CAF')}${fig('11-notification-caf-creation', 'Nouvelle notification de CAF')}${fig('11-notification-caf-detail', 'Fiche d\'une notification de CAF')}${fig('11-notification-caf-verification', 'Vérification d\'une notification de CAF')}`
  }
  if (a('10-pv-liste') || a('10-pv-historique') || a('10-pv-detail')) {
    pv += `  <h3 id="pv">Les PV de comité</h3>
${chemin('Menu <b>Pv Comité</b>')}  <p>Le PV de comité reprend la décision d'octroi : client, montant, durée, périodicité, taux, frais, garanties à recueillir et réserves de l'analyste. Saisi par l'Admin Crédit, il est validé ou rejeté par le Head Crédit. Son statut (En attente, Validé, Rejeté) s'affiche dans la liste et sur la fiche.</p>
${liste([
  a('10-pv-liste') && '<b>Sans contrat</b> : les PV en cours de validation, et les PV validés qui attendent leur contrat ou leur notification hypothécaire. Les filtres trient par type de crédit, statut et niveau de validation.',
  a('10-pv-historique') && '<b>Historique</b> : tous les PV.',
  peut('create', 'pv') && '<b>Créer</b> : saisissez le PV bloc par bloc ; les garanties s\'ajoutent une à une. À l\'enregistrement, le PV part en validation chez le Head Crédit. Tant qu\'il n\'est pas validé, il se modifie depuis son menu d\'actions ; un PV rejeté se corrige de la même façon et repart en validation.',
  (peut('validate', 'pv') || peut('reject', 'pv')) && 'Un PV en attente de validation propose <b>Valider</b> et <b>Rejeter</b> dans son menu d\'actions ; un rejet demande un motif, envoyé par e-mail à l\'Admin Crédit.',
  peut('create', 'basic-contract') && 'Un PV validé propose <b>Créer le contrat</b>, ou <b>Créer la notification</b> s\'il comporte une hypothèque.',
  peut('download', 'pv') && 'Le PV se télécharge depuis sa fiche ou son menu d\'actions.',
])}${fig('10-pv-liste', 'PV sans contrat')}${fig('10-pv-historique', 'Historique des PV')}${fig('10-pv-detail', 'Fiche d\'un PV')}${fig('10-pv-creation', 'Nouveau PV de comité')}`
  }
  chapitre('pv-chapitre', 'PV de comité', '', pv)

  // ─── 4. Contrats ────────────────────────────────────────────────────────
  let ct = ''
  if (a('20-contrats-liste') || a('20-contrats-historique') || a('20-contrat-detail')) {
    ct += `  <h3 id="contrats">Les contrats</h3>
${chemin('Menu <b>Contrat › Basique</b>')}  <p>Le contrat est établi à partir d'un PV validé. Son statut suit les étapes : <b>En attente des documents signés</b>, <b>Signé, à envoyer en validation</b>, <b>En attente de validation head</b>, puis <b>Validé</b> ou <b>Rejeté</b>.</p>
${liste([
  a('20-contrats-liste') && '<b>Sans CAT</b> : les contrats qui n\'ont pas encore de CAT. La colonne <b>Observations</b> signale ce qui manque (contrat signé, billet à ordre signé, cautions incomplètes) avec un bouton pour y remédier : <span class="btn">Charger</span>, <span class="btn">Cautions</span>, <span class="btn">Créer CAT</span>.',
  a('20-contrats-historique') && '<b>Historique</b> : tous les contrats.',
  peut('create', 'basic-contract') && '<b>Créer</b> : choisissez le PV validé, puis complétez les informations du contrat, du client et, s\'il y en a, des gages.',
  peut('upload', 'contract') && 'Le menu d\'actions télécharge les documents à faire signer (contrat, billet à ordre, mention manuscrite) et permet d\'<b>ajouter le contrat signé</b> et le <b>billet à ordre signé</b>. Quand les deux sont chargés, <b>Envoyer en validation</b> transmet le contrat au Head Crédit.',
  peut('validate', 'basic-contract') && 'Un contrat en attente de validation head propose <b>Valider le contrat</b> et <b>Rejeter le contrat</b> ; le motif d\'un rejet est envoyé à l\'Admin Crédit et affiché sur la fiche.',
  'La fiche du contrat affiche le montant, la durée, l\'échéance, la périodicité et le différé, puis le dossier, le client, les conditions du crédit, les garanties et les gages.',
])}${fig('20-contrats-liste', 'Contrats sans CAT')}${fig('20-contrats-liste-actions', 'Menu d\'actions d\'un contrat', '<b>Menu d\'actions</b> d\'un contrat.')}${fig('20-contrats-historique', 'Historique des contrats')}${fig('20-contrat-detail', 'Fiche d\'un contrat')}${fig('20-contrat-creation', 'Nouveau contrat')}`
  }
  if (a('21-cautions-liste') || a('21-caution-detail')) {
    ct += `  <h3 id="cautions">Les cautions</h3>
${chemin('Bouton <b>Cautions</b> de la fiche du contrat, ou menu d\'actions <b>Voir les cautions</b>')}  <p>Les cautions (garants) d'un contrat se gèrent depuis le contrat : identité, pièce d'identité, coordonnées, et l'acte de cautionnement à faire signer.</p>
${liste([
  peut('create', 'guarantor') && '<span class="btn">Ajouter</span> ouvre le formulaire d\'une nouvelle caution.',
  peut('upload', 'guarantor') && 'Une fois l\'acte signé, chargez-le depuis le menu d\'actions de la caution.',
  peut('download', 'guarantor') && 'L\'acte, signé ou non, se télécharge depuis la fiche de la caution.',
])}${fig('21-cautions-liste', 'Cautions d\'un contrat')}${fig('21-caution-detail', 'Fiche d\'une caution')}${fig('21-caution-creation', 'Nouvelle caution')}`
  }
  chapitre('contrats-chapitre', 'Contrats et cautions', '', ct)

  // ─── 5. Notifications hypothécaires ─────────────────────────────────────
  let hy = ''
  if (a('30-notifications-sans-validation') || a('30-notifications-sans-contrat-notarie') || a('30-notifications-historique')) {
    hy += `${chemin('Menu <b>Contrat › Hypothécaire</b>')}  <p>Quand une hypothèque garantit le crédit, le PV validé donne lieu à une <b>notification hypothécaire</b> au lieu d'un contrat. Elle est validée par le Head Crédit, puis le Juridique y charge le contrat notarié.</p>
${liste([
  a('30-notifications-sans-validation') && '<b>Sans Validation Head</b> : les notifications qui attendent la validation du Head Crédit.',
  a('30-notifications-sans-contrat-notarie') && '<b>Sans Contrat notarié</b> : les notifications validées dont le contrat notarié n\'est pas encore chargé.',
  a('30-notifications-historique') && '<b>Historique</b> : toutes les notifications.',
  peut('create', 'notification') && '<b>Créer</b> : choisissez le PV validé, puis complétez la notification et les informations de la société ou de l\'entreprise individuelle.',
  peut('validate', 'notification') && 'Une notification en attente propose <b>Valider</b> et <b>Rejeter</b> dans son menu d\'actions.',
  peut('upload', 'notarized-contract') && 'Le contrat notarié se charge depuis le menu d\'actions de la notification.',
])}${fig('30-notifications-sans-validation', 'Notifications sans validation head')}${fig('30-notifications-sans-contrat-notarie', 'Notifications sans contrat notarié')}${fig('30-notifications-historique', 'Historique des notifications')}${fig('30-notification-detail', 'Fiche d\'une notification')}${fig('30-notification-creation', 'Nouvelle notification hypothécaire')}`
  }
  chapitre('hypothecaire', 'Notifications hypothécaires', '', hy)

  // ─── 6. CAT ─────────────────────────────────────────────────────────────
  let cat = ''
  if (a('40-cat-liste') || a('41-cat-hypothecaire-liste')) {
    cat += `${chemin('Menu <b>CAT</b>')}  <p>Le CAT (conditions avant tirage) autorise le décaissement d'un contrat validé ou d'une notification hypothécaire. Il porte deux statuts : sa <b>validation</b> (Head Crédit), puis son <b>déblocage</b> (Opérations). La liste affiche pour chaque CAT le dossier et le client, le secteur, le montant et le numéro de prêt.</p>
${liste([
  peut('create', 'basic-cat') && '<b>Créer</b> : choisissez le contrat validé, puis complétez le CAT (numéro de prêt, secteur, frais, TEG, garanties, dépôt de garantie).',
  (peut('validate', 'cat') || peut('validate', 'basic-cat')) && 'Un CAT en attente de validation propose <b>Valider</b> et <b>Rejeter</b> dans son menu d\'actions.',
  (peut('unblock', 'cat') || peut('unblock', 'basic-cat')) && 'Un CAT validé et en attente de déblocage propose <b>Débloquer</b> et <b>Rejeter le déblocage</b>.',
  (peut('update', 'cat') || peut('update', 'basic-cat')) && 'Un CAT se modifie tant qu\'il n\'est pas validé.',
  'Le CAT se télécharge depuis son menu d\'actions ; <b>Voir Pv</b> et <b>Voir Contrat</b> ouvrent le dossier d\'origine.',
])}${fig('40-cat-liste', 'CAT des contrats')}${fig('40-cat-liste-actions', 'Menu d\'actions d\'un CAT', '<b>Menu d\'actions</b> d\'un CAT.')}${fig('40-cat-detail', 'Fiche d\'un CAT')}${fig('40-cat-creation', 'Nouveau CAT')}${fig('41-cat-hypothecaire-liste', 'CAT hypothécaires')}${fig('41-cat-hypothecaire-detail', 'Fiche d\'un CAT hypothécaire')}`
  }
  chapitre('cat', 'CAT', '', cat)

  // ─── 7. Suivi ───────────────────────────────────────────────────────────
  let suivi = ''
  if (a('50-reports-liste')) {
    suivi += `  <h3 id="reports">Reports d'échéance</h3>
${chemin('Menu <b>Report d\'échéance › En attente</b>')}  <p>Une demande de report d'échéance passe par le Chef d'agence, le DEX, le Head Crédit et le MD avant d'être traitée par l'Admin Crédit. La liste montre les demandes en attente ; le statut indique le niveau où chacune se trouve (par exemple « En attente du DEX ») ou qui l'a rejetée.</p>
${liste([
  peut('change_status', 'deadline-postponed') && 'Quand une demande attend votre niveau, son menu d\'actions propose <b>Valider</b> et <b>Rejeter</b>.',
  peut('update', 'deadline-postponed') && 'Une demande rejetée ou en attente du Chef d\'agence se modifie, ou se supprime, depuis son menu d\'actions.',
])}${fig('50-reports-liste', 'Reports d\'échéance en attente')}${fig('50-report-detail', 'Fiche d\'un report d\'échéance')}`
  }
  if (a('60-garants-liste') || a('61-garanties-liste')) {
    suivi += `  <h3 id="garants">Garants et garanties</h3>
${chemin('Menus <b>Liste des garants</b> et <b>Liste des garanties</b>')}  <p>Ces deux listes rassemblent, tous dossiers confondus, les garants (cautions) et les garanties recueillies. Chaque ligne mène au dossier ; les documents signés se téléchargent depuis le menu d'actions et chaque liste s'exporte.</p>
${fig('60-garants-liste', 'Liste des garants')}${fig('61-garanties-liste', 'Liste des garanties')}`
  }
  chapitre('suivi', 'Suivi', '', suivi)

  // ─── 8. Utilisateurs ────────────────────────────────────────────────────
  let us = ''
  if (a('70-utilisateurs-liste')) {
    us += `${chemin('Menu <b>Paramétrage › Utilisateurs</b>')}  <p>La liste des comptes de l'application, avec leur profil et leur état.${peut('create', 'user') ? '' : ' Votre profil la consulte sans la modifier : elle sert notamment aux filtres « Admin Crédit » des listes.'}</p>
${liste([
  peut('create', 'user') && '<b>Nouveau</b> : nom, profil, adresse e-mail, mot de passe initial, activation, et « Changement de mot de passe : Obligatoire » pour imposer un nouveau mot de passe à la première connexion.',
  peut('update', 'user') && 'Un compte se modifie depuis sa fiche ou son menu d\'actions : changer son profil, le désactiver (il ne peut plus se connecter) ou réinitialiser son mot de passe.',
])}${fig('70-utilisateurs-liste', 'Utilisateurs')}${fig('70-utilisateur-detail', 'Fiche d\'un utilisateur')}${fig('70-utilisateur-creation', 'Nouvel utilisateur')}`
  }
  chapitre('utilisateurs', 'Utilisateurs', '', us)

  // ─── 9. Droits du profil ────────────────────────────────────────────────
  const domaines = [
    ['PV de comité', 'pv'], ['Notifications de CAF', 'pv-notification'], ['Contrats', 'contract'], ['Contrats basiques', 'basic-contract'],
    ['Notifications hypothécaires', 'notification'], ['Contrats notariés', 'notarized-contract'], ['CAT', 'cat'], ['CAT basiques', 'basic-cat'],
    ['Cautions', 'guarantor'], ['Liste des garants', 'guarantor-list'], ['Garanties', 'guarantee'], ['Liste des garanties', 'guarantee-list'],
    ['Reports d\'échéance', 'deadline-postponed'], ['Utilisateurs', 'user'],
  ]
  const ACTIONS = {
    'menu': 'menu', 'read': 'consulter', 'create': 'créer', 'update': 'modifier', 'delete': 'supprimer', 'historical': 'historique', 'read-historical': 'historique',
    'download': 'télécharger', 'upload': 'charger les documents signés', 'send': 'envoyer', 'validate': 'valider', 'reject': 'rejeter', 'change_status': 'changer le statut',
    'check': 'vérifier', 'analyst_delete': 'retirer', 'read-without-pv': 'sans PV', 'read-without-cat': 'sans CAT', 'read-without-head-validation': 'sans validation head',
    'read-without-notarized-contract': 'sans contrat notarié', 'without-signed-contract': 'sans contrat notarié', 'unblock': 'débloquer', 'reject_unblock': 'rejeter le déblocage',
    'reject_validation': 'rejeter la validation', 'change_head_credit_status': 'validation head', 'simple-notification': 'notifications simplifiées',
    'without-signed-notification': 'sans notification signée',
  }
  let droitsHtml
  if (admin) droitsHtml = '  <p class="intro">Le profil Administrateur détient tous les droits : aucun écran ni aucune action ne lui est refusé.</p>\n'
  else {
    const lignes = domaines.map(([nom, s]) => {
      const r = regles.find(x => x.subject.includes(s))
      return r ? `      <tr><td>${nom}</td><td>${[...new Set(r.action.map(x => ACTIONS[x] ?? x))].join(', ')}</td></tr>` : ''
    }).filter(Boolean)
    droitsHtml = `  <p class="intro">Un bouton ou un menu absent de votre écran correspond presque toujours à un droit que votre profil n'a pas, ou à une étape où le dossier n'est pas encore. Pour un droit supplémentaire, adressez-vous à l'administrateur de l'application.</p>
  <div class="tableau"><table>
    <thead><tr><th>Domaine</th><th>Droits</th></tr></thead>
    <tbody>
${lignes.join('\n')}
    </tbody></table></div>
`
  }
  chapitre('droits', 'Droits du profil', '', droitsHtml)

  // ─── Assemblage ──────────────────────────────────────────────────────────
  const sommaire = chapitres.map(c => {
    const sous = [...c.corps.matchAll(/<h3 id="([^"]+)">([^<]+)<\/h3>/g)]
    return `    <li><a href="#${c.id}">${esc(c.titre)}</a>${sous.length > 1 ? `\n      <ol>${sous.map(m => `<li><a href="#${m[1]}">${m[2]}</a></li>`).join('')}</ol>` : ''}</li>`
  }).join('\n')
  const corps = chapitres.map((c, i) => `<section class="chapitre" id="${c.id}">
  <h2 class="titre"><span class="num">${String(i + 1).padStart(2, '0')}</span>${esc(c.titre)}</h2>
${c.intro ? `  <p class="intro">${c.intro}</p>\n` : ''}${c.corps}</section>`).join('\n\n')

  const html = `<title>${esc(`Manuel ${d.role}`)}</title>
${STYLE}

<header class="entete">
  <div class="surtitre">Cofina Crédit Digital</div>
  <h1>Manuel d'utilisation du profil ${esc(d.role)}</h1>
  <p class="chapeau">${MISSIONS[slug] ?? ''} Chaque écran est illustré par une capture réelle de l'application, faite avec un compte de ce profil.</p>
  <div class="meta">
    <span>Version du <b>${DATE}</b></span>
  </div>
</header>

<div class="cadre">
<nav class="sommaire" aria-label="Sommaire">
  <h2>Sommaire</h2>
  <ol>
${sommaire}
  </ol>
</nav>

<main>

${corps}

</main>
</div>

<footer>Manuel établi à partir de l'application Cofina Crédit Digital au ${DATE}. Les captures montrent des données réelles : ce document est à usage interne.</footer>

${FIN}`
  fs.writeFileSync(path.join(dossier, 'manuel.html'), html)
  const utilisees = new Set([...html.matchAll(/img\/([^"]+\.webp)/g)].map(m => m[1]))
  for (const f of fs.readdirSync(dossierImg)) if (!utilisees.has(f)) fs.rmSync(path.join(dossierImg, f))
  console.log(`${slug.padEnd(16)} ${chapitres.length} chapitres, ${utilisees.size} captures`)
}

for (const d of Object.values(droits).filter(d => !PROFILS.length || PROFILS.includes(d.slug))) {
  if (fs.existsSync(path.join(CAPT, d.slug))) generer(d)
  else console.log(`${d.slug.padEnd(16)} pas de captures, manuel non généré`)
}
