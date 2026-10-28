/**
 * Confirms the calculator result placeholders in index.html match what
 * calcUpdate() writes for the default inputs (Phoenix Metro, 3000 sqft,
 * 60 months). Runs the page's own script; does not reimplement pricing.
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
  'used-total',
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

function loadCalculator(html) {
  const elements = {};
  for (const id of RESULT_IDS) {
    elements[id] = element();
    elements[id].textContent = `__unset:${id}__`;
  }
  for (const id of ['city-select', 'sqft-slider', 'sqft-input', 'coming-soon-msg', 'active-results', 'btn-yes', 'btn-no', 'sub-lower-note']) {
    elements[id] = element();
  }
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
  return { elements, sandbox };
}

function roundMoney(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

test('static calculator placeholders match calcUpdate() for the default inputs', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const staticText = Object.fromEntries(RESULT_IDS.map((id) => [id, extractStaticText(html, id)]));
  const { elements } = loadCalculator(html);

  assert.equal(elements['active-results'].style.display, 'block', 'default city should show active results');

  for (const id of RESULT_IDS) {
    assert.equal(
      elements[id].textContent,
      staticText[id],
      `#${id} static placeholder ${JSON.stringify(staticText[id])} does not match calcUpdate() output ${JSON.stringify(elements[id].textContent)}`
    );
  }
});

test('used furniture is sqft x $12 and buy outright stays $20 per square foot', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const { elements, sandbox } = loadCalculator(html);

  const cases = [1000, 1500, 2500, 3000, 5000, 10000, 20000];
  for (const sqft of cases) {
    sandbox.syncSqft(sqft);
    const buy = sqft * 20;
    const rtoMonthly = Math.max((buy * 1.055) / 60, 349);
    const subMonthly = Math.max((buy * 1.046) / 60, 379);
    assert.equal(elements['buy-total'].textContent, roundMoney(buy));
    assert.equal(elements['rto-total'].textContent, 'Total: ' + roundMoney(rtoMonthly * 60));
    assert.equal(elements['sub-total'].textContent, 'Total: ' + roundMoney(subMonthly * 60));
    assert.equal(elements['used-total'].textContent, roundMoney(sqft * 12));
    assert.equal(elements['sqft-input'].value, sqft);
  }
});

test('12-month term, price floors, and the subscription comparison note', () => {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  assert.match(html, /onclick="setTerm\(12,this\)">12 mo/);
  assert.match(html, /class="toggle-btn active" aria-pressed="true" onclick="setTerm\(60,this\)">60 mo/);
  assert.match(html, /id="sub-lower-note"[^>]*> Subscription is lower because the furniture comes back at lease end\./);
  assert.equal(html.includes('Most Popular'), false);
  const usedStart = html.indexOf('<!-- Used furniture -->');
  const usedEnd = html.indexOf('</div>\n\n          <p style="font-size:0.75rem;text-align:center;color:#4B5563;margin-bottom:0.5rem;">');
  const card = html.slice(usedStart, usedEnd);
  assert.ok(usedStart > 0 && usedEnd > usedStart, 'used furniture card bounds');
  assert.match(card, /Typical price: \$12 per sq ft/);
  assert.match(card, /Typical one-time total/);
  assert.match(card, /Delivery and installation quoted separately/);
  assert.match(card, /Limited inventory\. Availability varies\./);
  assert.equal(/<a\b|<button\b/i.test(card), false);
  assert.equal(/calendly\.com|Schedule a Quick Call/.test(card), false);
  assert.equal(/warranty|quality guarantee/i.test(card), false);

  const { elements, sandbox } = loadCalculator(html);
  const button = element();
  const cases = {
    '1000:12': ['$20,000', '$1,758.33', 'Total: $21,100', '$1,743.33', 'Total: $20,920', '$12,000', ''],
    '1000:60': ['$20,000', '$351.67', 'Total: $21,100', '$379.00', 'Total: $22,740', '$12,000', 'none'],
    '3000:12': ['$60,000', '$5,275.00', 'Total: $63,300', '$5,230.00', 'Total: $62,760', '$36,000', ''],
    '3000:60': ['$60,000', '$1,055.00', 'Total: $63,300', '$1,046.00', 'Total: $62,760', '$36,000', ''],
    '10000:12': ['$200,000', '$17,583.33', 'Total: $211,000', '$17,433.33', 'Total: $209,200', '$120,000', ''],
    '10000:60': ['$200,000', '$3,516.67', 'Total: $211,000', '$3,486.67', 'Total: $209,200', '$120,000', ''],
  };

  for (const [key, expected] of Object.entries(cases)) {
    const [sqft, term] = key.split(':').map(Number);
    sandbox.syncSqft(sqft);
    sandbox.setTerm(term, button);
    assert.deepEqual(
      [
        elements['buy-total'].textContent,
        elements['rto-monthly'].textContent,
        elements['rto-total'].textContent,
        elements['sub-monthly'].textContent,
        elements['sub-total'].textContent,
        elements['used-total'].textContent,
        elements['sub-lower-note'].style.display,
      ],
      expected,
      key
    );
  }
});
