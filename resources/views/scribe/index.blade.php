<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Document de CofCredit</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.style.css") }}" media="screen">
    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.print.css") }}" media="print">

    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>

    <link rel="stylesheet"
          href="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/obsidian.min.css">
    <script src="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jets/0.14.1/jets.min.js"></script>

    <style id="language-style">
        /* starts out as display none and is replaced with js later  */
                    body .content .bash-example code { display: none; }
                    body .content .javascript-example code { display: none; }
            </style>

    <script>
        var tryItOutBaseUrl = "http://cofcredit.cofina.localhost";
        var useCsrf = Boolean();
        var csrfUrl = "/sanctum/csrf-cookie";
    </script>
    <script src="{{ asset("/vendor/scribe/js/tryitout-4.29.0.js") }}"></script>

    <script src="{{ asset("/vendor/scribe/js/theme-default-4.29.0.js") }}"></script>

</head>

<body data-languages="[&quot;bash&quot;,&quot;javascript&quot;]">

<a href="#" id="nav-button">
    <span>
        MENU
        <img src="{{ asset("/vendor/scribe/images/navbar.png") }}" alt="navbar-image"/>
    </span>
</a>
<div class="tocify-wrapper">
            <img src="../img/logo.png" alt="logo" class="logo" style="padding-top: 10px;" width="100%"/>
    
            <div class="lang-selector">
                                            <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                            <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                    </div>
    
    <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Rechercher">
    </div>

    <div id="toc">
                    <ul id="tocify-header-introduction" class="tocify-header">
                <li class="tocify-item level-1" data-unique="introduction">
                    <a href="#introduction">Introduction</a>
                </li>
                            </ul>
                    <ul id="tocify-header-authentification-des-requetes" class="tocify-header">
                <li class="tocify-item level-1" data-unique="authentification-des-requetes">
                    <a href="#authentification-des-requetes">Authentification des requêtes</a>
                </li>
                            </ul>
                    <ul id="tocify-header-authentification" class="tocify-header">
                <li class="tocify-item level-1" data-unique="authentification">
                    <a href="#authentification">Authentification</a>
                </li>
                                    <ul id="tocify-subheader-authentification" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="authentification-POSTapi-auth-login">
                                <a href="#authentification-POSTapi-auth-login">Connecte un utilisateur</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="authentification-GETapi-auth-show">
                                <a href="#authentification-GETapi-auth-show">Affiche l'utilisateur connecté</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="authentification-DELETEapi-auth-logout">
                                <a href="#authentification-DELETEapi-auth-logout">Déconnecte l'utilisateur connecté</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-utilisateur" class="tocify-header">
                <li class="tocify-item level-1" data-unique="utilisateur">
                    <a href="#utilisateur">Utilisateur</a>
                </li>
                                    <ul id="tocify-subheader-utilisateur" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="utilisateur-GETapi-user">
                                <a href="#utilisateur-GETapi-user">Affiche les utilisateurs</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="utilisateur-GETapi-user--id-">
                                <a href="#utilisateur-GETapi-user--id-">Affiche un utilisateur</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="utilisateur-POSTapi-user">
                                <a href="#utilisateur-POSTapi-user">Créer un nouvel utilisateur</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="utilisateur-PUTapi-user-update-password">
                                <a href="#utilisateur-PUTapi-user-update-password">Mettre à jour le mot de passe de l'utilisateur connecté utilisateur</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="utilisateur-PUTapi-user--id-">
                                <a href="#utilisateur-PUTapi-user--id-">Mettre à jour un utilisateur</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="utilisateur-DELETEapi-user--id-">
                                <a href="#utilisateur-DELETEapi-user--id-">Supprime un utilisateur</a>
                            </li>
                                                                        </ul>
                            </ul>
            </div>

    <ul class="toc-footer" id="toc-footer">
                    <li style="padding-bottom: 5px;"><a href="{{ route("scribe.postman") }}">Voir la collection Postman</a></li>
                            <li style="padding-bottom: 5px;"><a href="{{ route("scribe.openapi") }}">Voir la spécification OpenAPI</a></li>
                <li><a href="http://github.com/knuckleswtf/scribe">Documentation powered by Scribe ✍</a></li>
    </ul>

    <ul class="toc-footer" id="last-updated">
        <li>Last updated: February 6, 2024</li>
    </ul>
</div>

<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1 id="introduction">Introduction</h1>
<p>Application web de digitalisation du processus de mise en place d'un dossier de credit, de son suivi et supléments</p>
<aside>
    <strong>URL de base</strong>: <code>http://cofcredit.cofina.localhost</code>
</aside>
<p>This documentation aims to provide all the information you need to work with our API.</p>
<aside>As you scroll, you'll see code examples for working with the API in different programming languages in the dark area to the right (or as part of the content on mobile).
You can switch the language used with the tabs at the top right (or from the nav menu at the top left on mobile).</aside>

        <h1 id="authentification-des-requetes">Authentification des requêtes</h1>
<p>Pour authentifier les requêtes, incluez un en-tête <strong><code>Authorization</code></strong> avec la valeur <strong><code>"Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"</code></strong>.</p>
<p>Toutes les points d'accès authentifiés sont marqués d'un badge <code>requiert une authentification</code> dans la documentation ci-dessous.</p>
<p>Vous pouvez récupérer votre token en visitant votre tableau de bord et en cliquant sur <b>1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</b>.</p>

        <h1 id="authentification">Authentification</h1>

    <p>Endpoints pour gérer l_authentification</p>

                                <h2 id="authentification-POSTapi-auth-login">Connecte un utilisateur</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-POSTapi-auth-login">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://cofcredit.cofina.localhost/api/auth/login" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"email\": \"charles.gamligo@cofinacorp.com\",
    \"password\": \"password\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/auth/login"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "charles.gamligo@cofinacorp.com",
    "password": "password"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-auth-login">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-POSTapi-auth-login" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-POSTapi-auth-login"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-auth-login"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-auth-login" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-POSTapi-auth-login">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-POSTapi-auth-login" data-method="POST"
      data-path="api/auth/login"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-auth-login', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-auth-login"
                    onclick="tryItOut('POSTapi-auth-login');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-auth-login"
                    onclick="cancelTryOut('POSTapi-auth-login');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-auth-login"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/auth/login</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="POSTapi-auth-login"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-auth-login"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-auth-login"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Paramètres du corps</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTapi-auth-login"
               value="charles.gamligo@cofinacorp.com"
               data-component="body">
    <br>
<p>L'email de l'utilsateur. Example: <code>charles.gamligo@cofinacorp.com</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTapi-auth-login"
               value="password"
               data-component="body">
    <br>
<p>Le mot de passe complet de l'utilisateur. Example: <code>password</code></p>
        </div>
        </form>

                    <h2 id="authentification-GETapi-auth-show">Affiche l&#039;utilisateur connecté</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-auth-show">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://cofcredit.cofina.localhost/api/auth/show" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/auth/show"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-auth-show">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-auth-show" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-GETapi-auth-show"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-auth-show"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-auth-show" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-GETapi-auth-show">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-GETapi-auth-show" data-method="GET"
      data-path="api/auth/show"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-auth-show', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-auth-show"
                    onclick="tryItOut('GETapi-auth-show');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-auth-show"
                    onclick="cancelTryOut('GETapi-auth-show');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-auth-show"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/auth/show</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="GETapi-auth-show"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-auth-show"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-auth-show"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="authentification-DELETEapi-auth-logout">Déconnecte l&#039;utilisateur connecté</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-DELETEapi-auth-logout">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://cofcredit.cofina.localhost/api/auth/logout" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/auth/logout"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEapi-auth-logout">
            <blockquote>
            <p>Exemple de réponse (204):</p>
        </blockquote>
                <pre>
<code>Réponse vide</code>
 </pre>
    </span>
<span id="execution-results-DELETEapi-auth-logout" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-DELETEapi-auth-logout"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-auth-logout"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-auth-logout" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-auth-logout">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-DELETEapi-auth-logout" data-method="DELETE"
      data-path="api/auth/logout"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-auth-logout', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-auth-logout"
                    onclick="tryItOut('DELETEapi-auth-logout');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-auth-logout"
                    onclick="cancelTryOut('DELETEapi-auth-logout');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-auth-logout"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/auth/logout</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="DELETEapi-auth-logout"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEapi-auth-logout"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEapi-auth-logout"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                <h1 id="utilisateur">Utilisateur</h1>

    <p>EndPoints pour gérer les utilisateurs</p>

                                <h2 id="utilisateur-GETapi-user">Affiche les utilisateurs</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-user">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://cofcredit.cofina.localhost/api/user" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/user"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-user">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-user" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-GETapi-user"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-user" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-GETapi-user">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-GETapi-user" data-method="GET"
      data-path="api/user"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-user', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-user"
                    onclick="tryItOut('GETapi-user');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-user"
                    onclick="cancelTryOut('GETapi-user');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-user"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/user</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="GETapi-user"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Paramètres de la chaîne de requête</b></h4>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="GETapi-user"
               value=""
               data-component="query">
    <br>
<p>Filtrer par username.</p>
            </div>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>full_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="full_name"                data-endpoint="GETapi-user"
               value=""
               data-component="query">
    <br>
<p>Filtrer par nom complet.</p>
            </div>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="GETapi-user"
               value=""
               data-component="query">
    <br>
<p>Filtrer par email.</p>
            </div>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>profile</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="profile"                data-endpoint="GETapi-user"
               value=""
               data-component="query">
    <br>
<p>Filtrer par profil.</p>
            </div>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>activated</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="number" style="display: none"
               step="any"               name="activated"                data-endpoint="GETapi-user"
               value=""
               data-component="query">
    <br>
<p>Filtrer par statut d'activation</p>
            </div>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>password_change_required</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="number" style="display: none"
               step="any"               name="password_change_required"                data-endpoint="GETapi-user"
               value=""
               data-component="query">
    <br>
<p>Filtrer par statut de mot de passe à changer</p>
            </div>
                </form>

                    <h2 id="utilisateur-GETapi-user--id-">Affiche un utilisateur</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-user--id-">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://cofcredit.cofina.localhost/api/user/1" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/user/1"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-user--id-">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-user--id-" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-GETapi-user--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user--id-"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-user--id-" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-GETapi-user--id-">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-GETapi-user--id-" data-method="GET"
      data-path="api/user/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-user--id-', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-user--id-"
                    onclick="tryItOut('GETapi-user--id-');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-user--id-"
                    onclick="cancelTryOut('GETapi-user--id-');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-user--id-"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/user/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="GETapi-user--id-"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-user--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-user--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>Paramètres d&#039;URL</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="GETapi-user--id-"
               value="1"
               data-component="url">
    <br>
<p>L'ID de l'utilisateur. Example: <code>1</code></p>
            </div>
                    </form>

                    <h2 id="utilisateur-POSTapi-user">Créer un nouvel utilisateur</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-POSTapi-user">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://cofcredit.cofina.localhost/api/user" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"mawena\",
    \"full_name\": \"Charles GAMLIGO\",
    \"profile\": \"admin\",
    \"activated\": 1,
    \"password\": \"password\",
    \"password_change_required\": 1
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/user"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "mawena",
    "full_name": "Charles GAMLIGO",
    "profile": "admin",
    "activated": 1,
    "password": "password",
    "password_change_required": 1
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-user">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-POSTapi-user" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-POSTapi-user"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-user"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-user" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-POSTapi-user">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-POSTapi-user" data-method="POST"
      data-path="api/user"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-user', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-user"
                    onclick="tryItOut('POSTapi-user');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-user"
                    onclick="cancelTryOut('POSTapi-user');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-user"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/user</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="POSTapi-user"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Paramètres du corps</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTapi-user"
               value="mawena"
               data-component="body">
    <br>
<p>Le username de l'utilsateur. Example: <code>mawena</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>full_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="full_name"                data-endpoint="POSTapi-user"
               value="Charles GAMLIGO"
               data-component="body">
    <br>
<p>Le nom complet de l'utilisateur. Example: <code>Charles GAMLIGO</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>profile</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="profile"                data-endpoint="POSTapi-user"
               value="admin"
               data-component="body">
    <br>
<p>Le profil de l'utilisateur. Example: <code>admin</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>activated</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="activated"                data-endpoint="POSTapi-user"
               value="1"
               data-component="body">
    <br>
<p>Le statut d'activation de l'utilisateur Example: <code>1</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTapi-user"
               value="password"
               data-component="body">
    <br>
<p>Le mot de passe de l'utilisateur. Example: <code>password</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password_change_required</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="password_change_required"                data-endpoint="POSTapi-user"
               value="1"
               data-component="body">
    <br>
<p>Le statut d'activation de l'utilisateur Example: <code>1</code></p>
        </div>
        </form>

                    <h2 id="utilisateur-PUTapi-user-update-password">Mettre à jour le mot de passe de l&#039;utilisateur connecté utilisateur</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-PUTapi-user-update-password">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://cofcredit.cofina.localhost/api/user/update-password" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"old_password\": null,
    \"new_password\": null,
    \"new_password_confirmation\": null
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/user/update-password"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "old_password": null,
    "new_password": null,
    "new_password_confirmation": null
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-user-update-password">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-PUTapi-user-update-password" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-PUTapi-user-update-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-user-update-password"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-user-update-password" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-PUTapi-user-update-password">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-PUTapi-user-update-password" data-method="PUT"
      data-path="api/user/update-password"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-user-update-password', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-user-update-password"
                    onclick="tryItOut('PUTapi-user-update-password');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-user-update-password"
                    onclick="cancelTryOut('PUTapi-user-update-password');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-user-update-password"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/user/update-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="PUTapi-user-update-password"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-user-update-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-user-update-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Paramètres du corps</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>old_password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="old_password"                data-endpoint="PUTapi-user-update-password"
               value=""
               data-component="body">
    <br>
<p>L'ancien mot de passe de l'utilisateur.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>new_password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="new_password"                data-endpoint="PUTapi-user-update-password"
               value=""
               data-component="body">
    <br>
<p>Le nouveau mot de passe de l'utilisateur.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>new_password_confirmation</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="new_password_confirmation"                data-endpoint="PUTapi-user-update-password"
               value=""
               data-component="body">
    <br>
<p>La confirmation du nouveau mot de passe de l'utilisateur.</p>
        </div>
        </form>

                    <h2 id="utilisateur-PUTapi-user--id-">Mettre à jour un utilisateur</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-PUTapi-user--id-">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://cofcredit.cofina.localhost/api/user/1" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"mawena\",
    \"full_name\": \"Charles GAMLIGO\",
    \"profile\": \"admin\",
    \"email\": \"gamligocharles@gmail.com\",
    \"activated\": 1,
    \"password_change_required\": 1
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/user/1"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "mawena",
    "full_name": "Charles GAMLIGO",
    "profile": "admin",
    "email": "gamligocharles@gmail.com",
    "activated": 1,
    "password_change_required": 1
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-user--id-">
            <blockquote>
            <p>Exemple de réponse (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{}</code>
 </pre>
    </span>
<span id="execution-results-PUTapi-user--id-" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-PUTapi-user--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-user--id-"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-user--id-" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-PUTapi-user--id-">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-PUTapi-user--id-" data-method="PUT"
      data-path="api/user/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-user--id-', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-user--id-"
                    onclick="tryItOut('PUTapi-user--id-');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-user--id-"
                    onclick="cancelTryOut('PUTapi-user--id-');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-user--id-"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/user/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="PUTapi-user--id-"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-user--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-user--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>Paramètres d&#039;URL</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="PUTapi-user--id-"
               value="1"
               data-component="url">
    <br>
<p>L'ID de l'utilisateur. Example: <code>1</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Paramètres du corps</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTapi-user--id-"
               value="mawena"
               data-component="body">
    <br>
<p>Le username de l'utilsateur. Example: <code>mawena</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>full_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="full_name"                data-endpoint="PUTapi-user--id-"
               value="Charles GAMLIGO"
               data-component="body">
    <br>
<p>Le nom complet de l'utilisateur. Example: <code>Charles GAMLIGO</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>profile</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="profile"                data-endpoint="PUTapi-user--id-"
               value="admin"
               data-component="body">
    <br>
<p>Le profil de l'utilisateur. Example: <code>admin</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="PUTapi-user--id-"
               value="gamligocharles@gmail.com"
               data-component="body">
    <br>
<p>L'email de l'utilisateur. Example: <code>gamligocharles@gmail.com</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>activated</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="activated"                data-endpoint="PUTapi-user--id-"
               value="1"
               data-component="body">
    <br>
<p>Le statut d'activation de l'utilisateur Example: <code>1</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="PUTapi-user--id-"
               value=""
               data-component="body">
    <br>
<p>Le mot de passe de l'utilisateur.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password_change_required</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="password_change_required"                data-endpoint="PUTapi-user--id-"
               value="1"
               data-component="body">
    <br>
<p>Le statut d'activation de l'utilisateur Example: <code>1</code></p>
        </div>
        </form>

                    <h2 id="utilisateur-DELETEapi-user--id-">Supprime un utilisateur</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-DELETEapi-user--id-">
<blockquote>Exemple de requête:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://cofcredit.cofina.localhost/api/user/16" \
    --header "Authorization: Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://cofcredit.cofina.localhost/api/user/16"
);

const headers = {
    "Authorization": "Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEapi-user--id-">
            <blockquote>
            <p>Exemple de réponse (204):</p>
        </blockquote>
                <pre>
<code>Réponse vide</code>
 </pre>
    </span>
<span id="execution-results-DELETEapi-user--id-" hidden>
    <blockquote>Réponse reçue<span
                id="execution-response-status-DELETEapi-user--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-user--id-"
      data-empty-response-text="<Réponse vide>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-user--id-" hidden>
    <blockquote>La requête a échoué avec l&#039;erreur:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-user--id-">

Conseil : Vérifiez que vous êtes correctement connecté au réseau.
Si vous êtes un responsable de cette API, vérifiez que votre API est en cours d&#039;exécution et que CORS est activé.
Vous pouvez consulter la console des outils de développement pour obtenir des informations de débogage.</code></pre>
</span>
<form id="form-DELETEapi-user--id-" data-method="DELETE"
      data-path="api/user/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-user--id-', this);">
    <h3>
        Requête&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-user--id-"
                    onclick="tryItOut('DELETEapi-user--id-');">Essayez-le ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-user--id-"
                    onclick="cancelTryOut('DELETEapi-user--id-');" hidden>Annuler 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-user--id-"
                    data-initial-text="Envoyer la requête 💥"
                    data-loading-text="⏱ Envoi en cours..."
                    hidden>Envoyer la requête 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/user/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>En-têtes</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Authorization" class="auth-value"               data-endpoint="DELETEapi-user--id-"
               value="Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979"
               data-component="header">
    <br>
<p>Example: <code>Bearer 1|VllEQEqmdEP8Rgfd6M90ZiWdgbXWWs5GJNXjjk2Cef3b3979</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEapi-user--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEapi-user--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>Paramètres d&#039;URL</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="DELETEapi-user--id-"
               value="16"
               data-component="url">
    <br>
<p>L'ID de l'utilisateur Example: <code>16</code></p>
            </div>
                    </form>

            

        
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                                        <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                                        <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                            </div>
            </div>
</div>
</body>
</html>
