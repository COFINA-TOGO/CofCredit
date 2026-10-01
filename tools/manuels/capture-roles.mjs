// Captures d'écran des manuels par profil.
// Usage : node capture-roles.mjs [dossier_sortie] [profils] [scenarios]   (voir README.md)
//   - profils   : slugs séparés par des virgules (défaut : toutes les sessions/*.json) ;
//   - scenarios : ne rejoue que les scénarios dont le nom contient l'un des textes (séparés par des virgules) ;
//   - CREDIT_URL : adresse de l'application (défaut https://credit.cofina.com) ;
//   - PARALLELE : nombre de profils capturés en même temps (défaut 2).
// Chaque profil a son compte de démonstration (sessions/<slug>.json) et ne passe
// que par les écrans que ses droits lui ouvrent. Rien n'est jamais enregistré :
// les formulaires sont ouverts mais jamais soumis, les dialogues sont refermés.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

const BASE = (process.env.CREDIT_URL ?? 'https://credit.cofina.com').replace(/\/$/, '')
const OUT = path.resolve(process.argv[2] || new URL('./captures', import.meta.url).pathname)
const PROFILS = (process.argv[3] ?? '').split(',').filter(Boolean)
const FILTRES = (process.argv[4] ?? '').split(',').filter(Boolean)
const PARALLELE = Number(process.env.PARALLELE ?? 2)

const dossierSessions = new URL('./sessions/', import.meta.url)
const lire = f => JSON.parse(fs.readFileSync(new URL(f, dossierSessions)))
const sessions = fs.readdirSync(dossierSessions)
  .filter(f => f.endsWith('.json') && !f.startsWith('_'))
  .map(lire)
  .filter(s => !PROFILS.length || PROFILS.includes(s.slug))
if (!sessions.length) {
  console.error('Aucune session : lancez d\'abord comptes-demo.php (voir README.md).')
  process.exit(1)
}
const ex = lire('_exemples.json')

const pause = ms => new Promise(r => setTimeout(r, ms))
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME ?? '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--ignore-certificate-errors', '--window-size=1440,900'],
})
browser.on('targetcreated', async t => {
  // Les nouveaux onglets (PDF, aperçus) sont refermés aussitôt.
  if (t.type() === 'page' && t.opener()) (await t.page())?.close().catch(() => {})
})

async function capturerProfil(session) {
  const OUTR = path.join(OUT, session.slug)
  fs.rmSync(OUTR, { recursive: true, force: true })
  fs.mkdirSync(OUTR, { recursive: true })
  const contexte = await browser.createBrowserContext()
  const page = await contexte.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  page.on('dialog', d => d.dismiss())
  const log = m => console.log(`[${session.slug}] ${m}`)

  // Journal des anomalies rencontrées pendant les captures (erreurs JS, API en erreur)
  const journal = fs.createWriteStream(path.join(OUTR, 'journal.txt'), { flags: 'a' })
  const noter = m => journal.write(`[${new Date().toLocaleTimeString('fr-FR')}] ${page.url().replace(BASE, '')} · ${m}\n`)
  page.on('pageerror', e => noter(`ERREUR JS ${e.message.split('\n')[0]}`))
  page.on('response', async r => {
    if (r.url().includes('/api/') && r.status() >= 400)
      noter(`API ${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`)
  })
  // Aucun téléchargement pendant les captures
  const cdp = await page.createCDPSession()
  await cdp.send('Browser.setDownloadBehavior', { behavior: 'deny' }).catch(() => {})

  const regles = session.rules ?? []
  const peut = (action, sujet) => regles.some(r =>
    (r.subject.includes('all') || r.subject.includes(sujet)) && (r.action.includes('manage') || r.action.includes(action)))

  // ─── Outils ─────────────────────────────────────────────────────────────
  async function attendreFin(max = 30000) {
    const debut = Date.now()
    await pause(600)
    while (Date.now() - debut < max) {
      const occupe = await page.evaluate(() => !!document.querySelector('.v-progress-circular--indeterminate, .v-btn--loading, .v-progress-linear--active .v-progress-linear__indeterminate, .v-data-table-progress'))
      if (!occupe) break
      await pause(500)
    }
    await pause(600)
  }
  async function capturer(nom, { pleinePage = true } = {}) {
    await attendreFin()
    await page.screenshot({ path: path.join(OUTR, `${nom}.png`), fullPage: pleinePage, captureBeyondViewport: false })
    log(`✓ ${nom}`)
  }
  async function ouvrir(chemin, nom, options = {}) {
    await page.goto(BASE + chemin, { waitUntil: 'networkidle2', timeout: 120000 }).catch(() => {})
    await pause(1200)
    // Une page refusée (droits) n'est pas capturée
    const refusee = await page.evaluate(() => location.pathname.startsWith('/not-authorized'))
    if (refusee) { log(`  (${chemin} non autorisé)`); return false }
    if (nom) await capturer(nom, options)
    return true
  }
  // Ouvre le menu d'actions de la première ligne d'un tableau et capture la fenêtre
  async function capturerMenuActions(nom) {
    const ok = await page.evaluate(() => {
      const icone = document.querySelector('table tbody tr .tabler-dots-vertical')
      const bouton = icone?.closest('button, .v-btn')
      if (bouton) { bouton.scrollIntoView({ block: 'center' }); bouton.click() }
      return !!bouton
    })
    if (!ok) return
    await pause(1000)
    await capturer(nom, { pleinePage: false })
    await page.keyboard.press('Escape')
    await pause(500)
  }

  // ─── Connexion par la session du compte de démonstration ──────────────────
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle2' })
  const enc = v => encodeURIComponent(JSON.stringify(v))
  await page.setCookie(
    { name: 'userToken', value: enc(session.token), url: BASE },
    { name: 'userData', value: enc(session.user), url: BASE },
    { name: 'userAbilityRules', value: enc(regles), url: BASE },
  )
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
  await pause(2000)
  if (page.url().includes('/login')) { log('✗ connexion refusée'); await contexte.close(); return }

  const scenarios = []
  const scenario = (nom, condition, fn) => scenarios.push([nom, condition, fn])

  // ─── Prise en main ──────────────────────────────────────────────────────
  scenario('accueil', true, async () => {
    await capturer('01-accueil')
    // Le menu entier, rogné sous la dernière entrée
    await page.setViewport({ width: 1440, height: 2000 })
    await pause(1000)
    const nav = await page.$('.layout-vertical-nav')
    const cadre = await nav?.boundingBox()
    const bas = await page.evaluate(() => Math.max(0, ...[...document.querySelectorAll('.layout-vertical-nav .nav-link, .layout-vertical-nav .nav-group, .layout-vertical-nav .nav-section-title')]
      .map(e => e.getBoundingClientRect().bottom)))
    // Un menu vide n'est pas capturé (et n'interrompt pas le scénario)
    if (cadre && bas > cadre.y) {
      await page.screenshot({ path: path.join(OUTR, '01-menu.png'), clip: { x: cadre.x, y: cadre.y, width: cadre.width, height: Math.min(cadre.height, Math.ceil(bas - cadre.y) + 16) } })
      log('✓ 01-menu')
    }
    await page.setViewport({ width: 1440, height: 900 })
    await ouvrir('/settings/user/account', '02-parametres-compte', { pleinePage: false })
    await ouvrir('/settings/user/security', '02-parametres-securite', { pleinePage: false })
    await ouvrir('/settings/user/signatory', '02-parametres-signature', { pleinePage: false })
    await ouvrir('/user-guide', '03-manuel', { pleinePage: false })
  })

  // ─── PV de comité ───────────────────────────────────────────────────────
  scenario('pv', peut('read', 'pv') || peut('historical', 'pv'), async () => {
    if (peut('read', 'pv') && await ouvrir('/pv', '10-pv-liste'))
      await capturerMenuActions('10-pv-liste-actions')
    if (peut('historical', 'pv'))
      await ouvrir('/pv/historical', '10-pv-historique')
    if (ex.pv)
      await ouvrir(`/pv/${ex.pv}`, '10-pv-detail')
    if (peut('create', 'pv'))
      await ouvrir('/pv/add', '10-pv-creation')
  })

  // ─── Notifications de CAF (avant PV) ────────────────────────────────────
  scenario('notification-caf', peut('read', 'pv-notification'), async () => {
    if (await ouvrir('/pv/notification/without-pv', '11-notification-caf-liste'))
      await capturerMenuActions('11-notification-caf-liste-actions')
    if (peut('read-historical', 'pv-notification'))
      await ouvrir('/pv/notification/historical', '11-notification-caf-historique')
    if (peut('create', 'pv-notification'))
      await ouvrir('/pv/notification/add', '11-notification-caf-creation')
    if (ex.pv_notification) {
      await ouvrir(`/pv/notification/${ex.pv_notification}`, '11-notification-caf-detail')
      if (peut('check', 'pv-notification'))
        await ouvrir(`/pv/notification/check/${ex.pv_notification}`, '11-notification-caf-verification')
    }
  })

  // ─── Contrats ───────────────────────────────────────────────────────────
  scenario('contrats', peut('read', 'contract') || peut('read-without-cat', 'basic-contract'), async () => {
    if (await ouvrir('/contract', '20-contrats-liste'))
      await capturerMenuActions('20-contrats-liste-actions')
    if (peut('read-historical', 'basic-contract'))
      await ouvrir('/contract/historical', '20-contrats-historique')
    if (ex.contrat) {
      await ouvrir(`/contract/${ex.contrat}`, '20-contrat-detail')
      if (peut('read', 'guarantor')) {
        await ouvrir(`/contract/${ex.contrat}/guarantor`, '21-cautions-liste')
        if (ex.caution)
          await ouvrir(`/contract/${ex.contrat}/guarantor/${ex.caution}`, '21-caution-detail')
        if (peut('create', 'guarantor'))
          await ouvrir(`/contract/${ex.contrat}/guarantor/add`, '21-caution-creation')
      }
    }
    if (peut('create', 'basic-contract'))
      await ouvrir('/contract/add', '20-contrat-creation')
  })

  // ─── Contrats hypothécaires (notifications) ─────────────────────────────
  scenario('hypothecaire', peut('read', 'notification') || peut('without-signed-contract', 'notification') || peut('read-without-notarized-contract', 'notarized-contract'), async () => {
    if (peut('read-without-head-validation', 'notarized-contract') || peut('read', 'notification'))
      await ouvrir('/notification', '30-notifications-sans-validation')
    await ouvrir('/notification/without-signed-contract', '30-notifications-sans-contrat-notarie')
    if (peut('historical', 'notification') || peut('read-historical', 'notarized-contract'))
      await ouvrir('/notification/historical', '30-notifications-historique')
    if (ex.notification)
      await ouvrir(`/notification/${ex.notification}`, '30-notification-detail')
    if (peut('create', 'notification'))
      await ouvrir('/notification/add', '30-notification-creation')
  })

  // ─── CAT ────────────────────────────────────────────────────────────────
  scenario('cat', peut('read', 'cat') || peut('read', 'basic-cat'), async () => {
    if (await ouvrir('/cat', '40-cat-liste'))
      await capturerMenuActions('40-cat-liste-actions')
    if (ex.cat)
      await ouvrir(`/cat/${ex.cat}`, '40-cat-detail')
    if (peut('create', 'basic-cat'))
      await ouvrir('/cat/add', '40-cat-creation')
    if (peut('read', 'cat')) {
      await ouvrir('/cat/notification', '41-cat-hypothecaire-liste')
      if (ex.cat_notification)
        await ouvrir(`/cat/notification/${ex.cat_notification}`, '41-cat-hypothecaire-detail')
    }
  })

  // ─── Reports d'échéance ─────────────────────────────────────────────────
  scenario('reports', peut('read', 'deadline-postponed'), async () => {
    await ouvrir('/deadline-postponed', '50-reports-liste')
    if (ex.report)
      await ouvrir(`/deadline-postponed/${ex.report}`, '50-report-detail')
  })

  // ─── Garants et garanties ───────────────────────────────────────────────
  scenario('garants', peut('read', 'guarantor-list'), async () => {
    await ouvrir('/guarantor', '60-garants-liste')
  })
  scenario('garanties', peut('read', 'guarantee-list'), async () => {
    await ouvrir('/guarantee', '61-garanties-liste')
  })

  // ─── Utilisateurs ───────────────────────────────────────────────────────
  scenario('utilisateurs', peut('read', 'user'), async () => {
    await ouvrir('/user', '70-utilisateurs-liste')
    if (ex.utilisateur)
      await ouvrir(`/user/${ex.utilisateur}`, '70-utilisateur-detail')
    if (peut('create', 'user'))
      await ouvrir('/user/add', '70-utilisateur-creation')
  })

  for (const [nom, condition, fn] of scenarios) {
    if (!condition || (FILTRES.length && !FILTRES.some(f => nom.includes(f))))
      continue
    try {
      await fn()
    }
    catch (e) {
      log(`✗ ${nom} : ${e.message.split('\n')[0]}`)
      noter(`ÉCHEC scénario ${nom} : ${e.message.split('\n')[0]}`)
    }
  }
  journal.end()
  await contexte.close()
  log('terminé')
}

// La page de connexion, commune à tous les profils
{
  const contexte = await browser.createBrowserContext()
  const page = await contexte.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle2' })
  await pause(1500)
  fs.mkdirSync(path.join(OUT, '_commun'), { recursive: true })
  await page.screenshot({ path: path.join(OUT, '_commun', '00-connexion.png') })
  await contexte.close()
  console.log('[commun] ✓ 00-connexion')
}

// Les profils sont capturés PARALLELE par PARALLELE
const file = [...sessions]
await Promise.all(Array.from({ length: PARALLELE }, async () => {
  while (file.length)
    await capturerProfil(file.shift())
}))
await browser.close()
console.log(`Captures dans ${OUT}`)
