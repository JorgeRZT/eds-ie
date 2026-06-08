/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroCoverParser from './parsers/hero-cover.js';
import tableSpecsParser from './parsers/table-specs.js';
import columnsTextimgParser from './parsers/columns-textimg.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/ie-brochures-cleanup.js';
import sectionsTransformer from './transformers/ie-brochures-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-cover': heroCoverParser,
  'table-specs': tableSpecsParser,
  'columns-textimg': columnsTextimgParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'executive-mba-brochure',
  description: 'IE Executive MBA brochure landing page with program information and application details',
  urls: [
    'https://iem-brochures.ie.edu/.executive.mba/',
  ],
  blocks: [
    {
      name: 'hero-cover',
      instances: [
        '.webpub-viewer__epub-container-spread-2 figure.spread-page-1',
      ],
    },
    {
      name: 'table-specs',
      instances: [
        '.webpub-viewer__epub-container-spread-1 figure.spread-page-2',
        '.webpub-viewer__epub-container-spread-1 figure.spread-page-3',
      ],
    },
    {
      name: 'columns-textimg',
      instances: [
        '.webpub-viewer__epub-container-spread-0 figure.spread-page-4',
        '.webpub-viewer__epub-container-spread-0 figure.spread-page-5',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1-cover',
      name: 'Cover / Hero',
      selector: '.webpub-viewer__epub-container-spread-2',
      style: 'dark',
      blocks: ['hero-cover'],
      defaultContent: [],
    },
    {
      id: 'section-2-el-programa',
      name: 'El Programa - Overview',
      selector: '.webpub-viewer__epub-container-spread-1',
      style: 'dark',
      blocks: ['table-specs'],
      defaultContent: [".webpub-viewer__epub-container-spread-1 figure.spread-page-2 div[id^='_idContainer']"],
    },
    {
      id: 'section-3-introduction',
      name: 'El Programa - Introduction Text',
      selector: '.webpub-viewer__epub-container-spread-0',
      style: null,
      blocks: ['columns-textimg'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
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
