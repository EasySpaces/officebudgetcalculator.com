/**
 * Confirms the calculator result placeholders in index.html match what
 * calcUpdate() writes for the default inputs (Phoenix Metro, 3000 sqft,
 * 24 months, needs space). Runs the page's own script; does not reimplement
 * pricing.
 *
 * Usage: node --test scripts/check-calc-placeholders.js
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const HTML_PATH = path.join(__dirname, '..', 'index.html');

const RESULT_IDS = [
  'buy-total',
  'rto-monthly',
  'rto-total',
  'sub-monthly',
  'sub-total',
  'space-city',
  'space-monthly',
  'total-monthly',
];

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function extractStaticText(html, id) {
  const match = html.match(new RegExp(`\\bid="${id}"[^>]*>([^<]*)`));
  assert.ok(match, `index.html is missing #${id}`);
  return decodeEntities(match[1]).trim();
}

function extractCalculatorScript(html) {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const calculator = scripts.map((match) => match[1]).find((source) => source.includes('function calcUpdate'));
  assert.ok(calculator, 'index.html is missing the calculator script');
  return calculator;
}

function element() {
  return {
    textContent: '',
    value: '',
    style: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
    },
    setAttribute() {},
    addEventListener() {},
    appendChild() {},
    closest() {
      return null;
    },
  };
}

test('static calculator placeholders match calcUpdate() for the default inputs', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const staticText = Object.fromEntries(RESULT_IDS.map((id) => [id, extractStaticText(html, id)]));

  const elements = {};
  for (const id of RESULT_IDS) {
    elements[id] = element();
    elements[id].textContent = `__unset:${id}__`;
  }
  for (const id of ['city-select', 'sqft-slider', 'sqft-input', 'coming-soon-msg', 'active-results', 'space-row', 'btn-yes', 'btn-no']) {
    elements[id] = element();
  }
  // First option in #city-select, which the browser selects by default.
  elements['city-select'].value = 'Phoenix Metro';

  const document = {
    getElementById(id) {
      if (!elements[id]) elements[id] = element();
      return elements[id];
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return element();
    },
    head: element(),
  };

  const sandbox = {
    document,
    sessionStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    IntersectionObserver: class {
      observe() {}
      unobserve() {}
    },
    console,
    URL,
    URLSearchParams,
  };
  sandbox.window = {
    document,
    location: { search: '' },
    scrollY: 0,
    addEventListener() {},
  };

  vm.createContext(sandbox);
  vm.runInContext(extractCalculatorScript(html), sandbox, { filename: 'index.html' });

  assert.equal(elements['active-results'].style.display, 'block', 'default city should show active results');
  assert.equal(elements['space-row'].style.display, 'block', 'default "needs space" should show the space row');

  for (const id of RESULT_IDS) {
    assert.equal(
      elements[id].textContent,
      staticText[id],
      `#${id} static placeholder ${JSON.stringify(staticText[id])} does not match calcUpdate() output ${JSON.stringify(elements[id].textContent)}`
    );
  }
});
