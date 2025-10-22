/* ===== Header dropdown ===== */
(function initHeaderDropdown(){
  const toggle = document.getElementById('contactToggle');
  const menu = document.getElementById('contactDropdown');

  if (!toggle || !menu) return;

  const wrapper = toggle.closest('.dropdown');
  let hoverTimer;

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (menu.hidden) openMenu(); else closeMenu();
  }

  // Hover: open immediately, close after short delay
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      openMenu();
    });
    wrapper.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(closeMenu, 250); // linger before closing
    });
  }

  // Touch/mobile fallback: toggle on tap/click when hover isn't available
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Route dropdown clicks to panels
  menu.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.js-nav-target');
    if (!targetBtn) return;
    const id = targetBtn.getAttribute('data-target');
    if (id) {
      activate(id);
      closeMenu();
    }
  });
})();

/* ===== Panels activation ===== */
const tabs = Array.from(document.querySelectorAll('[role="tab"]')); // none now, safe
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const mainNavTriggers = Array.from(document.querySelectorAll('.main-nav > .js-nav-target'));

mainNavTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const id = trigger.getAttribute('data-target');
    if (id) activate(id);
  });
});

const initialActive = panels.find(p => p.classList.contains('active'));
if (initialActive) {
  document.body.classList.toggle('home-active', initialActive.id === 'home');
}

function activate(id){
  // If any legacy tabs exist, sync them (no-op otherwise)
  tabs.forEach(t => t.setAttribute('aria-selected', t.getAttribute('aria-controls') === id));
  panels.forEach(p => p.classList.toggle('active', p.id === id));
  document.body.classList.toggle('home-active', id === 'home');
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById('main').scrollIntoView({ behavior:'smooth', block:'start' });
  }
}

/* ===== Demo confirmation (unchanged) ===== */
function demoConfirm(e, form){
  e.preventDefault();

  const missing = Array.from(form.querySelectorAll('[required]')).some(el => {
    if (el.type === 'file') return el.files.length === 0;
    return !el.value || (el.type === 'email' && !el.value.includes('@'));
  });

  const ok = form.querySelector('.confirm');
  const err = form.querySelector('.error');

  if (missing) {
    if (err) { err.style.display = 'block'; }
    if (ok)  { ok.style.display = 'none'; }
    return;
  }

  if (ok) { ok.style.display = 'block'; }
  if (err) { err.style.display = 'none'; }
}
window.demoConfirm = demoConfirm;

/* ===== Product search relevance sorting ===== */
(function initProductSearch(){
  const searchInput = document.querySelector('[data-product-search]');
  const productList = document.querySelector('[data-product-list]');
  if (!searchInput || !productList) return;

  const productCards = Array.from(productList.querySelectorAll('[data-product-card]'));
  if (!productCards.length) return;

  const MAX_TOKEN_SCORE = 25;
  const products = productCards.map((card, index) => buildProductModel(card, index));

  const handleQueryChange = () => {
    const query = searchInput.value || '';
    const tokens = tokenize(query);
    const scored = scoreProducts(tokens);
    applyOrdering(scored, tokens.length > 0);
  };

  function scoreProducts(tokens){
    return products.map(model => {
      if (!tokens.length) {
        return {
          model,
          score: 0,
          matchedTokens: 0,
          matchPercent: 0,
        };
      }

      let totalScore = 0;
      let matchedTokens = 0;

      tokens.forEach(token => {
        const tokenScore = computeTokenScore(model, token);
        if (tokenScore > 0) {
          matchedTokens += 1;
          totalScore += tokenScore;
        }
      });

      const matchPercent = totalScore > 0
        ? Math.min(100, Math.round((totalScore / (tokens.length * MAX_TOKEN_SCORE)) * 100))
        : 0;

      return {
        model,
        score: totalScore,
        matchedTokens,
        matchPercent,
      };
    });
  }

  function applyOrdering(results, hasQuery){
    const sorted = results.slice().sort((a, b) => {
      if (hasQuery) {
        if (b.score !== a.score) return b.score - a.score;
        if (b.matchedTokens !== a.matchedTokens) return b.matchedTokens - a.matchedTokens;
      }
      return a.model.originalIndex - b.model.originalIndex;
    });

    sorted.forEach((item, position) => {
      const { element } = item.model;

      if (hasQuery) {
        element.dataset.matchScore = String(item.score);
        element.dataset.matchPercent = String(item.matchPercent);
        element.dataset.matchRank = String(position + 1);
        element.dataset.matchState = item.score > 0 ? 'match' : 'miss';
      } else {
        delete element.dataset.matchScore;
        delete element.dataset.matchPercent;
        delete element.dataset.matchRank;
        delete element.dataset.matchState;
      }

      const indicator = element.querySelector('[data-match-indicator]');
      if (indicator) {
        if (hasQuery) {
          indicator.textContent = `${item.matchPercent}% match`;
          indicator.hidden = false;
          indicator.setAttribute('aria-hidden', 'false');
        } else {
          indicator.textContent = '';
          indicator.hidden = true;
          indicator.setAttribute('aria-hidden', 'true');
        }
      }

      productList.appendChild(element);
    });
  }

  function buildProductModel(card, index){
    const dataset = card.dataset || {};
    const name = pickFirst(
      dataset.name,
      dataset.title,
      queryText(card, '[data-field="name"]'),
      queryText(card, '.product-card__title'),
      queryText(card, '.card-title'),
      queryText(card, 'h3'),
      queryText(card, 'h2'),
      queryText(card, 'h4')
    );

    const ingredients = pickFirst(
      dataset.ingredients,
      dataset.contents,
      dataset.items,
      queryText(card, '[data-field="ingredients"]'),
      queryText(card, '.product-card__ingredients'),
      queryText(card, '.ingredients')
    );

    const tags = pickFirst(
      dataset.tags,
      dataset.category,
      dataset.categories,
      dataset.type,
      queryText(card, '[data-field="tags"]'),
      queryText(card, '.product-card__tags'),
      queryText(card, '.tags')
    );

    const description = pickFirst(
      dataset.description,
      dataset.summary,
      queryText(card, '[data-field="description"]'),
      queryText(card, '.product-card__description'),
      queryText(card, '.description'),
      queryText(card, 'p')
    );

    const extras = [
      dataset.keywords,
      dataset.searchKeywords,
      dataset.searchTerms,
      dataset.meta,
      dataset.allergens,
      dataset.notes
    ].filter(Boolean).join(' ');

    const nameTokenData = buildTokenData(name);
    const ingredientTokenData = buildTokenData(ingredients);
    const tagTokenData = buildTokenData(tags);
    const descriptionTokenData = buildTokenData(description);

    const model = {
      element: card,
      originalIndex: index,
      nameTokens: nameTokenData.tokens,
      ingredientTokens: ingredientTokenData.tokens,
      tagTokens: tagTokenData.tokens,
      descriptionTokens: descriptionTokenData.tokens,
      nameTokenCounts: nameTokenData.counts,
      ingredientTokenCounts: ingredientTokenData.counts,
      tagTokenCounts: tagTokenData.counts,
      descriptionTokenCounts: descriptionTokenData.counts,
      nameText: nameTokenData.text,
      ingredientText: ingredientTokenData.text,
      tagText: tagTokenData.text,
      descriptionText: descriptionTokenData.text,
      extraText: normalizeForMatch(extras),
      fallbackText: normalizeForMatch(card.textContent || '')
    };

    return model;
  }

  function computeTokenScore(model, token){
    let score = 0;

    score += fieldScore(
      token,
      model.nameTokens,
      model.nameTokenCounts,
      model.nameText,
      10,
      7,
      0
    );

    score += fieldScore(
      token,
      model.ingredientTokens,
      model.ingredientTokenCounts,
      model.ingredientText,
      6,
      4,
      2
    );

    score += fieldScore(
      token,
      model.tagTokens,
      model.tagTokenCounts,
      model.tagText,
      5,
      3,
      1
    );

    score += fieldScore(
      token,
      model.descriptionTokens,
      model.descriptionTokenCounts,
      model.descriptionText,
      4,
      2,
      1
    );

    if (model.extraText && model.extraText.includes(token)) {
      score += 2;
    }

    if (score === 0 && model.fallbackText.includes(token)) {
      score = 1;
    }

    return Math.min(MAX_TOKEN_SCORE, score);
  }

  function tokenize(value){
    const normalized = normalizeForMatch(value);
    return normalized ? normalized.split(' ') : [];
  }

  function buildTokenData(value){
    const text = normalizeForMatch(value);
    const tokens = tokenize(value);
    const tokenSet = new Set(tokens);
    const counts = new Map();

    tokens.forEach(token => {
      counts.set(token, (counts.get(token) || 0) + 1);
    });

    return {
      text,
      tokens: tokenSet,
      counts
    };
  }

  function fieldScore(token, tokenSet, tokenCounts, text, exactWeight, partialWeight, extraPerOccurrence){
    if (tokenSet.has(token)) {
      const occurrences = tokenCounts.get(token) || 1;
      return exactWeight + (occurrences - 1) * extraPerOccurrence;
    }

    if (text && text.includes(token)) {
      return partialWeight;
    }

    return 0;
  }

  function normalizeForMatch(value){
    if (!value) return '';
    let output = String(value).toLowerCase();
    if (output.normalize) {
      output = output.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    output = output.replace(/[^a-z0-9\s]/g, ' ');
    return output.replace(/\s+/g, ' ').trim();
  }

  function pickFirst(...values){
    for (const value of values) {
      if (value) return value;
    }
    return '';
  }

  function queryText(root, selector){
    if (!selector) return '';
    const node = root.querySelector(selector);
    return node ? node.textContent : '';
  }

  searchInput.addEventListener('input', handleQueryChange);
  searchInput.addEventListener('change', handleQueryChange);
  searchInput.addEventListener('search', handleQueryChange);

  handleQueryChange();
})();
