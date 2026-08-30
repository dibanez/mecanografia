/**
 * Cookie banner wired to Google Consent Mode v2.
 *
 * The head of index.html denies every storage type before Tag Manager loads,
 * so nothing is written until the visitor accepts. This module remembers the
 * answer and lifts (or keeps) the denial on later visits.
 */

const STORAGE_KEY = 'mecanografia:consent';

/** Storage types Tag Manager may use once analytics is accepted. */
const OPTIONAL_STORAGE = [
  'analytics_storage',
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'personalization_storage',
];

function gtag() {
  window.dataLayer = window.dataLayer || [];
  // Consent Mode reads the arguments object itself, not an array.
  window.dataLayer.push(arguments);
}

function readChoice() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function writeChoice(choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage disabled: the banner simply asks again next time */
  }
}

function applyChoice(choice) {
  gtag('consent', 'update', Object.fromEntries(OPTIONAL_STORAGE.map((key) => [key, choice])));
  window.dataLayer.push({ event: 'consent_update', consent_state: choice });
}

function init() {
  const banner = document.querySelector('#consent-banner');
  if (!banner) return;

  const stored = readChoice();
  if (stored) applyChoice(stored);
  else banner.hidden = false;

  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-consent]');
    if (!button) return;
    const choice = button.dataset.consent;
    writeChoice(choice);
    applyChoice(choice);
    banner.hidden = true;
  });

  // Withdrawing consent has to be as easy as giving it.
  document.querySelector('#consent-settings')?.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('[data-consent]')?.focus();
  });
}

init();
