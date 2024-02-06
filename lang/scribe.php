<?php

return [
    "labels" => [
        "search" => "Rechercher",
        "base_url" => "URL de base",
    ],

    "auth" => [
        "none" => "Cette API n'est pas authentifiée.",
        "instruction" => [
            "query" => <<<TEXT
                Pour authentifier les requêtes, incluez un paramètre de requête **`:parameterName`** dans la demande.
                TEXT,
            "body" => <<<TEXT
                Pour authentifier les requêtes, incluez un paramètre **`:parameterName`** dans le corps de la demande.
                TEXT,
            "query_or_body" => <<<TEXT
                Pour authentifier les requêtes, incluez un paramètre **`:parameterName`** soit dans la chaîne de requête, soit dans le corps de la demande.
                TEXT,
            "bearer" => <<<TEXT
                Pour authentifier les requêtes, incluez un en-tête **`Authorization`** avec la valeur **`"Bearer :placeholder"`**.
                TEXT,
            "basic" => <<<TEXT
                Pour authentifier les requêtes, incluez un en-tête **`Authorization`** sous la forme **`"Basic {credentials}"`**.
                La valeur de `{credentials}` devrait être votre nom d'utilisateur/identifiant et votre mot de passe, joints par un deux-points (:),
                puis encodés en base64.
                TEXT,
            "header" => <<<TEXT
                Pour authentifier les requêtes, incluez un en-tête **`:parameterName`** avec la valeur **`":placeholder"`**.
                TEXT,
        ],
        "details" => <<<TEXT
            Toutes les points d'accès authentifiés sont marqués d'un badge `requiert une authentification` dans la documentation ci-dessous.
            TEXT,
    ],

    "headings" => [
        "introduction" => "Introduction",
        "auth" => "Authentification des requêtes",
    ],

    "endpoint" => [
        "request" => "Requête",
        "headers" => "En-têtes",
        "url_parameters" => "Paramètres d'URL",
        "body_parameters" => "Paramètres du corps",
        "query_parameters" => "Paramètres de la chaîne de requête",
        "response" => "Réponse",
        "response_fields" => "Champs de la réponse",
        "example_request" => "Exemple de requête",
        "example_response" => "Exemple de réponse",
        "responses" => [
            "binary" => "Données binaires",
            "empty" => "Réponse vide",
        ],
    ],

    "try_it_out" => [
        "open" => "Essayez-le ⚡",
        "cancel" => "Annuler 🛑",
        "send" => "Envoyer la requête 💥",
        "loading" => "⏱ Envoi en cours...",
        "received_response" => "Réponse reçue",
        "request_failed" => "La requête a échoué avec l'erreur",
        "error_help" => <<<TEXT
            Conseil : Vérifiez que vous êtes correctement connecté au réseau.
            Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d'exécution et que CORS est activé.
            Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.
            TEXT,
    ],

    "links" => [
        "postman" => "Voir la collection Postman",
        "openapi" => "Voir la spécification OpenAPI",
    ],
];
