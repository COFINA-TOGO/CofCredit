// Construit la couverture et le sommaire imprimés à partir du manuel.
// Injecté par ManualController, avec impression.css : ces éléments ne
// s'affichent qu'à l'impression (export PDF).
(() => {
  const texte = sel => document.querySelector(sel)?.textContent.trim().replace(/\s+/g, ' ') ?? ''
  const echapper = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

  const titre = texte('header.entete h1')
  const role = titre.replace(/^Manuel d'utilisation du rôle\s*/i, '')
  const chapeau = texte('header.entete .chapeau').replace(/\s*Chaque écran est illustré.*$/, '')
  const meta = [...document.querySelectorAll('header.entete .meta span')].map(s => {
    const b = s.querySelector('b')?.textContent.trim() ?? ''
    return [s.textContent.replace(b, '').replace(/[:\s]+$/, '').trim(), b]
  })
  const aujourdhui = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  const couverture = document.createElement('section')
  couverture.className = 'couverture impression-seule'
  couverture.innerHTML = `
    <div class="bandeau"><img src="{{LOGO}}" alt="Cofina"><span>Crédit Digital</span></div>
    <div class="titre-bloc">
      <p class="sur">Manuel d'utilisation</p>
      <h1>${echapper(role || titre)}</h1>
      <p class="role">Application Cofina Crédit Digital</p>
      <div class="filet"></div>
      <p class="resume">${echapper(chapeau)}</p>
    </div>
    <dl>
      ${meta.map(([k, v]) => `<dt>${echapper(k)}</dt><dd>${echapper(v)}</dd>`).join('')}
      <dt>Exporté le</dt><dd>${aujourdhui}</dd>
      <dt>Diffusion</dt><dd>Usage interne Cofina</dd>
    </dl>`

  // Sommaire : chapitres numérotés, sections sur deux colonnes.
  const chapitres = [...document.querySelectorAll('section.chapitre')].map(s => ({
    num: s.querySelector('h2.titre .num')?.textContent.trim() ?? '',
    titre: [...(s.querySelector('h2.titre')?.childNodes ?? [])].filter(n => !n.classList?.contains('num')).map(n => n.textContent).join('').trim(),
    sections: [...s.querySelectorAll('h3')].map(h => h.textContent.trim()),
  }))
  const sommaire = document.createElement('section')
  sommaire.className = 'sommaire-impression impression-seule'
  sommaire.innerHTML = `<h2>Sommaire</h2><ol>${chapitres.map(c => `
    <li><div class="chap"><b>${echapper(c.num)}</b><span>${echapper(c.titre)}</span></div>
    ${c.sections.length ? `<ol>${c.sections.map(t => `<li>${echapper(t)}</li>`).join('')}</ol>` : ''}</li>`).join('')}</ol>`

  const main = document.querySelector('main')
  if (!main) return
  main.before(couverture, sommaire)

  const fin = document.createElement('p')
  fin.className = 'fin-impression impression-seule'
  fin.textContent = texte('body > footer')
  main.after(fin)

  // Les captures chargées à la demande doivent l'être avant l'impression.
  document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager' })
  if (role) document.title = `Manuel ${role} - Crédit Digital`
})()
