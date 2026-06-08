/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: IE Brochures sections.
 * Adds section breaks (<hr>) and Section Metadata blocks based on template sections.
 * Runs in afterTransform only.
 *
 * Template sections (from page-templates.json):
 *   1. section-1-cover: .webpub-viewer__epub-container-spread-2 (style: "dark")
 *   2. section-2-el-programa: .webpub-viewer__epub-container-spread-1 (style: "dark")
 *   3. section-3-introduction: .webpub-viewer__epub-container-spread-0 (style: null)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const sections = template.sections;

    // Process in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> before non-first sections to create section breaks
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
