/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: IE Brochures cleanup.
 * Removes non-authorable content from iem-brochures.ie.edu pages.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner (OneTrust) - found at #onetrust-consent-sdk (line 2)
    // Remove iframe used by OneTrust - found at iframe.ot-text-resize (line 266)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      'iframe.ot-text-resize',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable navigation and chrome elements:
    // - .webpub-topnav-v4: top navigation bar with chapters, search, share (line 271)
    // - .custom-brand: brand link wrapper (line 310)
    // - .webpub-pagination__vertical-container: pagination arrows/back-to-top (lines 314-325)
    // - .spread-background: spread background decoration divs (lines 501, 503, 874, 876, 910)
    // - video[class^="spread-bgVideo"]: background video element (line 880)
    // - .epub-view_panel: page toast/counter panel (line 915)
    WebImporter.DOMUtils.remove(element, [
      '.webpub-topnav-v4',
      '.custom-brand',
      '.webpub-pagination__vertical-container',
      '.spread-background',
      'video[class^="spread-bgVideo"]',
      '.epub-view_panel',
    ]);
  }
}
