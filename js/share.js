/**
 * Sharing on social networks: the project itself and personal results.
 *
 * Uses the native share sheet when the browser has one (mostly phones) and
 * falls back to a dialog with one link per network plus copy to clipboard.
 */

const enc = encodeURIComponent;

/** Canonical page URL, without the hash route of the current view. */
export function shareUrl() {
  return `${location.origin}${location.pathname}`;
}

/**
 * Networks offered in the fallback dialog. Facebook and LinkedIn only accept
 * a URL, so the sentence is lost there; the rest carry the whole message.
 */
const TARGETS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: (text, url) => `https://wa.me/?text=${enc(`${text} ${url}`)}`,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    href: (text, url) => `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`,
  },
  {
    id: 'x',
    name: 'X',
    href: (text, url) => `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`,
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    href: (text, url) => `https://bsky.app/intent/compose?text=${enc(`${text} ${url}`)}`,
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    href: (text, url) => `https://mastodonshare.com/?text=${enc(`${text} ${url}`)}`,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    href: (text, url) => `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: (text, url) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
  },
  {
    id: 'email',
    name: 'Correo',
    href: (text, url) => `mailto:?subject=${enc('Mecanografía')}&body=${enc(`${text}\n\n${url}`)}`,
  },
];

function dialogEl() {
  return document.querySelector('#share-dialog');
}

async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function openDialog(title, text, url) {
  const dialog = dialogEl();
  if (!dialog) return;

  dialog.querySelector('#share-title').textContent = title;
  dialog.querySelector('#share-preview').textContent = `${text} ${url}`;
  dialog.querySelector('#share-targets').innerHTML = TARGETS.map(
    (target) =>
      `<a class="share__target" href="${target.href(text, url)}" target="_blank" rel="noopener noreferrer">${target.name}</a>`,
  ).join('');

  const copyButton = dialog.querySelector('#share-copy');
  copyButton.textContent = 'Copiar texto y enlace';
  copyButton.onclick = async () => {
    copyButton.textContent = (await copyToClipboard(`${text} ${url}`))
      ? '¡Copiado!'
      : 'No se pudo copiar';
  };

  dialog.showModal();
}

/**
 * Shares `text` pointing at `url`. Returns once the native sheet closes or the
 * fallback dialog is open. Must be called from a user gesture.
 */
export async function openShare({ title = 'Compartir', text, url = shareUrl() }) {
  window.dataLayer?.push({ event: 'share', share_kind: title });

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Mecanografía', text, url });
      return;
    } catch (error) {
      // The visitor dismissed the sheet: leave them alone.
      if (error?.name === 'AbortError') return;
    }
  }
  openDialog(title, text, url);
}

export function initShare() {
  const dialog = dialogEl();
  dialog?.querySelector('#share-close')?.addEventListener('click', () => dialog.close());
  // Any network opens in a new tab, so the dialog has done its job.
  dialog?.querySelector('#share-targets')?.addEventListener('click', (event) => {
    if (event.target.closest('.share__target')) dialog.close();
  });
}
