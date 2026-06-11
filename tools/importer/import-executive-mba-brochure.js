/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroCoverParser from './parsers/hero-cover.js';
import tableSpecsParser from './parsers/table-specs.js';
import columnsTextimgParser from './parsers/columns-textimg.js';
import highlightTextParser from './parsers/highlight-text.js';
import rankingParser from './parsers/ranking.js';
import featureTextimgParser from './parsers/feature-textimg.js';
import accordionParser from './parsers/accordion.js';
import profileStatsParser from './parsers/profile-stats.js';
import logoMarqueeParser from './parsers/logo-marquee.js';
import alumniStoryParser from './parsers/alumni-story.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/ie-brochures-cleanup.js';
import sectionsTransformer from './transformers/ie-brochures-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-cover': heroCoverParser,
  'table-specs': tableSpecsParser,
  'columns-textimg': columnsTextimgParser,
  'highlight-text': highlightTextParser,
  ranking: rankingParser,
  'feature-textimg': featureTextimgParser,
  accordion: accordionParser,
  'profile-stats': profileStatsParser,
  'logo-marquee': logoMarqueeParser,
  'alumni-story': alumniStoryParser,
};

// The flipbook virtualizes pages (only a few spreads live in the DOM at a time),
// so onLoad walks the book and clones each page's figure into a stable holder,
// grouped into section wrappers. All selectors below target that holder.
const HOLDER_ID = 'excat-captured';
const LAST_PAGE = 13;

// Which pages belong to each authored section, in order.
const SECTION_PAGES = {
  'section-1-cover': [1],
  'section-2-el-programa': [2, 3],
  'section-3-introduction': [4],
  'section-4-coach-ranking': [6, 7],
  'section-5-opcion-ideal': [8, 9],
  'section-6-contactos': [10, 11],
  'section-7-alumni': [12, 13],
};

const sectionSel = (id) => `#${HOLDER_ID} [data-section="${id}"]`;

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'executive-mba-brochure',
  description: 'IE Executive MBA brochure landing page with program information and application details',
  urls: [
    'https://iem-brochures.ie.edu/.executive.mba/',
  ],
  blocks: [
    { name: 'hero-cover', instances: [`#${HOLDER_ID} figure.spread-page-1`] },
    {
      name: 'table-specs',
      instances: [
        `#${HOLDER_ID} figure.spread-page-2`,
        `#${HOLDER_ID} figure.spread-page-3`,
      ],
    },
    { name: 'columns-textimg', instances: [`#${HOLDER_ID} figure.spread-page-4`] },
    { name: 'highlight-text', instances: [`#${HOLDER_ID} figure.spread-page-6`] },
    { name: 'ranking', instances: [`#${HOLDER_ID} figure.spread-page-7`] },
    { name: 'feature-textimg', instances: [`#${HOLDER_ID} figure.spread-page-8`] },
    { name: 'accordion', instances: [`#${HOLDER_ID} figure.spread-page-9`] },
    { name: 'profile-stats', instances: [`#${HOLDER_ID} figure.spread-page-10`] },
    { name: 'logo-marquee', instances: [`#${HOLDER_ID} figure.spread-page-11`] },
    // alumni-story targets the timeline figure (page 13) and reads the video
    // from its sibling (page 12) within the same section wrapper.
    { name: 'alumni-story', instances: [`#${HOLDER_ID} figure.spread-page-13`] },
  ],
  sections: [
    {
      id: 'section-1-cover', name: 'Cover / Hero', selector: sectionSel('section-1-cover'), style: 'dark', blocks: ['hero-cover'], defaultContent: [],
    },
    {
      id: 'section-2-el-programa', name: 'El Programa - Overview', selector: sectionSel('section-2-el-programa'), style: 'dark', blocks: ['table-specs'], defaultContent: [],
    },
    {
      id: 'section-3-introduction', name: 'El Programa - Introduction Text', selector: sectionSel('section-3-introduction'), style: null, blocks: ['columns-textimg'], defaultContent: [],
    },
    {
      id: 'section-4-coach-ranking', name: 'Coach statement + ranking', selector: sectionSel('section-4-coach-ranking'), style: null, blocks: ['highlight-text', 'ranking'], defaultContent: [],
    },
    {
      id: 'section-5-opcion-ideal', name: 'La opción ideal + perfil', selector: sectionSel('section-5-opcion-ideal'), style: null, blocks: ['feature-textimg', 'accordion'], defaultContent: [],
    },
    {
      id: 'section-6-contactos', name: 'Contactos para toda la vida', selector: sectionSel('section-6-contactos'), style: null, blocks: ['profile-stats', 'logo-marquee'], defaultContent: [],
    },
    {
      id: 'section-7-alumni', name: 'Marcando la diferencia', selector: sectionSel('section-7-alumni'), style: null, blocks: ['alumni-story'], defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

/**
 * Walk the virtualized flipbook, clone the richest figure for each page, group
 * the clones into section wrappers, then strip the original flipbook DOM so the
 * holder is the only authored content left in <body>.
 */
async function captureBook(document) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  document.getElementById(HOLDER_ID)?.remove();
  const holder = document.createElement('div');
  holder.id = HOLDER_ID;

  // Pre-create section wrappers in order.
  const wrappers = {};
  Object.keys(SECTION_PAGES).forEach((id) => {
    const w = document.createElement('div');
    w.setAttribute('data-section', id);
    holder.appendChild(w);
    wrappers[id] = w;
  });

  const pageToSection = {};
  Object.entries(SECTION_PAGES).forEach(([id, pages]) => {
    pages.forEach((p) => { pageToSection[p] = id; });
  });

  const captured = {};
  for (let pageNum = 1; pageNum <= LAST_PAGE; pageNum += 1) {
    const sectionId = pageToSection[pageNum];
    if (!sectionId) continue; // page intentionally skipped (e.g. 5)
    window.location.hash = `#page=${pageNum}`;
    // eslint-disable-next-line no-await-in-loop
    await wait(2200);
    const figs = [...document.querySelectorAll(`figure.spread-page-${pageNum}`)];
    let best = null;
    let bestLen = -1;
    figs.forEach((f) => {
      const len = (f.textContent || '').length + f.querySelectorAll('img').length;
      if (len > bestLen) { bestLen = len; best = f; }
    });
    if (best && !captured[pageNum]) {
      captured[pageNum] = true;
      wrappers[sectionId].appendChild(best.cloneNode(true));
    }
  }

  // Remove the original flipbook DOM; keep only the holder + scripts/styles.
  [...document.body.children].forEach((child) => {
    if (child === holder) return;
    const tag = child.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK' || tag === 'NOSCRIPT') return;
    child.remove();
  });
  document.body.appendChild(holder);

  console.log(`Captured ${Object.keys(captured).length} flipbook pages into #${HOLDER_ID}`);
}

export default {
  onLoad: async ({ document }) => {
    await captureBook(document);
  },

  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // Normalize to the authored content path (matches the already-migrated
    // /content/executivemba page; '.executive.mba/' -> 'executivemba').
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname
        .replace(/\/$/, '')
        .replace(/\.html$/, '')
        .replace(/\.executive\.mba$/, 'executivemba'),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
