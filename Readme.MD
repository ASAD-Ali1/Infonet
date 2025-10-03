<!DOCTYPE html>
<html lang="bs">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kontakt / Outcome – Infonet</title>
  <meta name="description" content="Brzi kontakt sa timom: Prodaja, Podrška, Opći upit, Karijere. Do cilja u ≤ 3 klika." />
  <style>
    :root{
      --bg:#0f2433; --card:#ffffff; --ink:#0b1320; --muted:#6b7280;
      --brand:#0ea5e9; --ring:#0ea5e9; --ok:#16a34a; --err:#dc2626;
      --bd:#e5e7eb; --radius:16px;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Inter,Helvetica,Arial;
      color:var(--ink);
      background:#f6f7fb;
      line-height:1.55;
    }

    /* Top hero (kept minimal, no controls) */
    .hero{
      background: radial-gradient(1100px 600px at 80% -20%, rgba(255,255,255,.08), transparent 60%), var(--bg);
      color:#fff; padding:48px 20px 36px;
    }
    .wrap{max-width:1100px;margin:0 auto;padding:0 20px}
    h1{margin:0 0 10px;font-size:clamp(28px,4vw,44px);line-height:1.15}
    .lead{max-width:720px;color:#c7d2fe;opacity:.9;margin:0}

    /* Tabs */
    .paths{
      display:grid;grid-template-columns:repeat(4,1fr);
      gap:16px;margin:24px 0 0;
    }
    @media (max-width:960px){.paths{grid-template-columns:repeat(2,1fr)}}
    @media (max-width:560px){.paths{grid-template-columns:1fr}}
    .path-btn{
      display:flex;align-items:center;justify-content:center;gap:10px;
      border:1px solid rgba(255,255,255,.25);
      background:rgba(255,255,255,.10); color:#fff;
      padding:14px 16px; border-radius:14px; text-decoration:none;
      font-weight:700; outline-offset:3px; cursor:pointer; transition:background .2s;
      min-height:48px;
    }
    .path-btn:hover{background:rgba(255,255,255,.18)}
    .path-btn[aria-selected="true"]{background:#fff;color:var(--ink)}
    .path-btn:focus-visible{outline:3px solid #fff}

    /* Panels area */
    main{margin-top:-20px}
    .panels{padding:24px 0}
    .panel{
      background:var(--card); border:1px solid var(--bd); border-radius:var(--radius);
      padding:24px; box-shadow:0 8px 24px rgba(2,6,23,.07); display:none;
    }
    .panel + .panel{margin-top:20px}
    .panel.active{display:block}
    .panel h2{margin:0 0 12px; font-size:22px}
    .help{color:var(--muted);font-size:13px;margin:0 0 10px}

    /* Forms */
    form{
      display:grid; grid-template-columns:1fr 1fr;
      gap:16px; margin-top:6px;
    }
    form .full{grid-column:1/-1}
    label{font-size:14px;font-weight:600;display:block;margin-bottom:6px}
    .field{
      width:100%; padding:12px; border:1px solid var(--bd); border-radius:12px; background:#fff; font:inherit;
    }
    textarea.field{min-height:120px; resize:vertical}
    .field:focus{outline:none;border-color:var(--ring);box-shadow:0 0 0 3px rgba(14,165,233,.15)}

    /* Actions */
    .actions{display:flex;gap:12px;align-items:center;margin-top:2px}
    .btn{appearance:none;border:0;background:var(--brand);color:#fff;padding:12px 16px;border-radius:12px;font-weight:700;cursor:pointer;transition:background .2s}
    .btn:hover{background:#0284c7}
    .btn.secondary{background:#1118270d;color:#0b1320;border:1px solid var(--bd)}

    /* Cards / links */
    .links{display:flex;flex-wrap:wrap;gap:10px}
    .callout{background:#f0f9ff;border:1px solid #bae6fd;padding:12px 14px;border-radius:12px;font-size:14px;margin-bottom:12px}

    /* Careers grid */
    .role-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    @media (max-width:720px){.role-grid{grid-template-columns:1fr}}
    .role-card{display:block;border:1px solid var(--bd);background:#f8fafc;border-radius:12px;padding:14px;text-decoration:none;color:inherit;transition:box-shadow .2s, background .2s}
    .role-card:hover{background:#eef2f7;box-shadow:0 6px 16px rgba(2,6,23,.06)}
    .role-card .title{font-weight:700}

    /* Status text */
    .confirm{display:none;margin-top:12px;font-weight:600;color:var(--ok)}
    .error{display:none;margin-top:12px;font-weight:600;color:var(--err)}

    .meta{margin:8px 0 28px;color:var(--muted);font-size:13px;text-align:center}
  </style>
</head>
<body>

  <!-- Minimal top (no header controls) -->
  <div class="hero">
    <div class="wrap">
      <h1>Kontaktirajte naš tim</h1>
      <p class="lead">Brzo do pravog ishoda u najviše tri klika: <strong>Prodaja</strong>, <strong>Podrška</strong>, <strong>Opći upit</strong>, <strong>Karijere</strong>.</p>

      <!-- Tabs -->
      <div role="tablist" aria-label="Izaberite putanju" class="paths" id="paths">
        <button class="path-btn" role="tab" aria-selected="true" aria-controls="sales" id="tab-sales">Prodaja</button>
        <button class="path-btn" role="tab" aria-selected="false" aria-controls="support" id="tab-support">Podrška</button>
        <button class="path-btn" role="tab" aria-selected="false" aria-controls="general" id="tab-general">Opći upit</button>
        <button class="path-btn" role="tab" aria-selected="false" aria-controls="careers" id="tab-careers">Karijere</button>
      </div>
    </div>
  </div>

  <!-- Panels -->
  <main class="wrap panels" id="main">
    <!-- SALES -->
    <section id="sales" class="panel active" role="tabpanel" aria-labelledby="tab-sales">
      <h2>Prodaja</h2>
      <p class="help">Poruke idu direktno na <strong>sales@infonet.ba</strong>.</p>
      <form onsubmit="demoConfirm(event,this)" novalidate enctype="multipart/form-data" aria-describedby="sales-confirm sales-error">
        <div>
          <label for="s-name">Ime i prezime *</label>
          <input id="s-name" class="field" required autocomplete="name" />
        </div>
        <div>
          <label for="s-email">Email *</label>
          <input id="s-email" class="field" type="email" required autocomplete="email" />
        </div>
        <div class="full">
          <label for="s-msg">Poruka *</label>
          <textarea id="s-msg" class="field" required></textarea>
        </div>
        <div class="full">
          <label for="s-files">Privitak (opcionalno)</label>
          <input id="s-files" class="field" type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt" />
        </div>
        <div class="actions full">
          <button class="btn" type="submit">Pošalji prodaji</button>
          <a class="btn secondary" href="mailto:sales@infonet.ba">Email prodaji</a>
        </div>
        <p id="sales-confirm" class="confirm" role="status">Poruka poslana na sales@infonet.ba</p>
        <p id="sales-error" class="error" role="alert">Došlo je do greške. Pokušajte ponovo.</p>
      </form>
    </section>

    <!-- SUPPORT (guest flow only) -->
    <section id="support" class="panel" role="tabpanel" aria-labelledby="tab-support">
      <h2>Podrška</h2>
      <div class="callout" role="note">
        Gosti: možete kreirati tiket ili pokrenuti TeamViewer za udaljenu pomoć.
      </div>
      <div class="links" style="margin-bottom:10px">
        <a class="btn secondary" href="https://tv.infonet.ba" target="_blank" rel="noopener">Pokreni Remote Help</a>
        <a class="btn" href="https://support.infonet.ba" target="_blank" rel="noopener">Otvori Support Portal</a>
      </div>

      <form onsubmit="demoConfirm(event,this)" novalidate enctype="multipart/form-data" aria-describedby="sup-confirm sup-error">
        <div>
          <label for="t-name">Ime i prezime *</label>
          <input id="t-name" class="field" required autocomplete="name" />
        </div>
        <div>
          <label for="t-email">Email *</label>
          <input id="t-email" class="field" type="email" required autocomplete="email" />
        </div>
        <div class="full">
          <label for="t-subject">Kratki naslov *</label>
          <input id="t-subject" class="field" required />
        </div>
        <div class="full">
          <label for="t-desc">Šta je pošlo po zlu? *</label>
          <textarea id="t-desc" class="field" required></textarea>
        </div>
        <div class="full">
          <label for="t-files">Privitak (opcionalno)</label>
          <input id="t-files" class="field" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.txt,.log" />
        </div>
        <div class="actions full">
          <button class="btn" type="submit">Kreiraj tiket</button>
        </div>
        <p id="sup-confirm" class="confirm" role="status">Tiket kreiran. Potvrda poslana na email.</p>
        <p id="sup-error" class="error" role="alert">Greška pri slanju. Pokušajte ponovo.</p>
      </form>
    </section>

    <!-- GENERAL -->
    <section id="general" class="panel" role="tabpanel" aria-labelledby="tab-general">
      <h2>Opći upit</h2>
      <p class="help">Za pitanja koja nisu prodaja/podrška – stiže u <strong>info@infonet.ba</strong>.</p>
      <form onsubmit="demoConfirm(event,this)" novalidate enctype="multipart/form-data" aria-describedby="gen-confirm gen-error">
        <div>
          <label for="g-name">Ime i prezime *</label>
          <input id="g-name" class="field" required autocomplete="name" />
        </div>
        <div>
          <label for="g-email">Email *</label>
          <input id="g-email" class="field" type="email" required autocomplete="email" />
        </div>
        <div class="full">
          <label for="g-msg">Poruka *</label>
          <textarea id="g-msg" class="field" required></textarea>
        </div>
        <div class="full">
          <label for="g-files">Privitak (opcionalno)</label>
          <input id="g-files" class="field" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.txt" />
        </div>
        <div class="actions full">
          <button class="btn" type="submit">Pošalji</button>
          <a class="btn secondary" href="mailto:info@infonet.ba">Email</a>
        </div>
        <p id="gen-confirm" class="confirm" role="status">Poruka poslana na info@infonet.ba</p>
        <p id="gen-error" class="error" role="alert">Došlo je do greške. Pokušajte ponovo.</p>
      </form>
    </section>

    <!-- CAREERS -->
    <section id="careers" class="panel" role="tabpanel" aria-labelledby="tab-careers">
      <h2>Karijere</h2>

      <div class="full" style="margin-bottom:8px">
        <h3 style="margin:0 0 8px">Otvorene pozicije</h3>
        <div class="role-grid" aria-label="Otvorene pozicije">
          <a class="role-card" href="/careers/systems-engineer">
            <div class="title">Systems Engineer</div>
            <div class="help">Pogledaj detalje →</div>
          </a>
          <a class="role-card" href="/careers/account-manager">
            <div class="title">Account Manager</div>
            <div class="help">Pogledaj detalje →</div>
          </a>
          <a class="role-card" href="/careers/service-desk-technician">
            <div class="title">Service Desk Technician</div>
            <div class="help">Pogledaj detalje →</div>
          </a>
          <a class="role-card" href="/careers/project-coordinator">
            <div class="title">Project Coordinator</div>
            <div class="help">Pogledaj detalje →</div>
          </a>
        </div>
      </div>

      <h3 style="margin:16px 0 8px">Ili pošaljite generalnu prijavu</h3>
      <form onsubmit="demoConfirm(event,this)" novalidate enctype="multipart/form-data" aria-describedby="car-confirm car-error">
        <div>
          <label for="c-name">Ime i prezime *</label>
          <input id="c-name" class="field" required autocomplete="name" />
        </div>
        <div>
          <label for="c-email">Email *</label>
          <input id="c-email" class="field" type="email" required autocomplete="email" />
        </div>
        <div class="full">
          <label for="c-role">Pozicija (opcionalno)</label>
          <input id="c-role" class="field" />
        </div>
        <div class="full">
          <label for="c-cv">CV / Portfolio *</label>
          <input id="c-cv" class="field" type="file" required accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
        </div>
        <div class="full">
          <label for="c-link">Portfolio link (opcionalno)</label>
          <input id="c-link" class="field" type="url" placeholder="https://..." />
        </div>
        <div class="actions full">
          <button class="btn" type="submit">Pošalji prijavu</button>
          <a class="btn secondary" href="mailto:hr@infonet.ba">Piši HR-u</a>
        </div>
        <p id="car-confirm" class="confirm" role="status">Prijava poslana na hr@infonet.ba</p>
        <p id="car-error" class="error" role="alert">Greška pri slanju. Pokušajte ponovo.</p>
      </form>
    </section>

    <p class="meta">Dostupnost: WCAG 2.1 AA, GDPR usklađeno (bez obaveznih checkboxa), prilagođeno mobilnim i desktop uređajima.</p>
  </main>

  <script>
    // Tabs
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
    function activate(id){
      tabs.forEach(t=>t.setAttribute('aria-selected', t.getAttribute('aria-controls')===id));
      panels.forEach(p=>p.classList.toggle('active', p.id===id));
      document.getElementById('main').scrollIntoView({behavior:'smooth', block:'start'});
    }
    tabs.forEach(t=>{
      t.addEventListener('click', ()=>activate(t.getAttribute('aria-controls')));
      t.addEventListener('keydown', (e)=>{
        const i = tabs.indexOf(t);
        if(e.key==='ArrowRight') tabs[(i+1)%tabs.length].focus();
        if(e.key==='ArrowLeft') tabs[(i-1+tabs.length)%tabs.length].focus();
      });
    });

    // Demo confirmation for Live Preview
    function demoConfirm(e, form){
      e.preventDefault();
      const ok = form.parentElement.querySelector('.confirm');
      const err = form.parentElement.querySelector('.error');
      if(ok) ok.style.display='block';
      if(err) err.style.display='none';
    }
  </script>
</body>
</html>
