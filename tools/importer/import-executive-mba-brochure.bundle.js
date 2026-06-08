/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-executive-mba-brochure.js
  var import_executive_mba_brochure_exports = {};
  __export(import_executive_mba_brochure_exports, {
    default: () => import_executive_mba_brochure_default
  });

  // tools/importer/parsers/hero-cover.js
  function parse(element, { document }) {
    const headingEl = element.querySelector('p.Nuevos-estilos_H1, h1, [class*="H1"]');
    const descriptionEl = element.querySelector('p.Heading-Abridoras, p.Heading-Abridoras, [class*="Heading-Abridoras"]');
    const bgImage = element.querySelector('img, picture img, [class*="background"] img');
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    if (headingEl) {
      const h1 = document.createElement("h1");
      h1.textContent = headingEl.textContent.trim();
      cells.push([h1]);
    }
    if (descriptionEl) {
      const p = document.createElement("p");
      p.textContent = descriptionEl.textContent.trim();
      cells.push([p]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cover", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-specs.js
  function parse2(element, { document }) {
    const textFrame = element.querySelector(".Marco-de-texto-b-sico");
    const headingEl = textFrame ? textFrame.querySelector("p") : null;
    const topContainer = element.querySelector(':scope > div > div[id^="_idContainer"]');
    const pageImages = topContainer ? topContainer.querySelectorAll(':scope > div[id^="_idContainer"] > img, :scope > img') : [];
    let backgroundImg = null;
    if (topContainer) {
      backgroundImg = topContainer.querySelector(":scope > img");
    }
    const cells = [];
    if (headingEl) {
      const headingText = headingEl.textContent.trim();
      if (headingText) {
        cells.push([headingEl]);
      }
    }
    if (backgroundImg) {
      cells.push([backgroundImg]);
    }
    if (!backgroundImg) {
      const firstImg = element.querySelector("img[src]");
      if (firstImg) {
        cells.push([firstImg]);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "table-specs", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-textimg.js
  function parse3(element, { document }) {
    const textContainer = element.querySelector('[class*="Marco-de-texto"]');
    const textParagraphs = textContainer ? Array.from(textContainer.querySelectorAll("p")) : [];
    const animationImage = element.querySelector('._idGenAnimation img, [class*="_idGenAnimation"] img');
    const graphicFrame = element.querySelector('[class*="Marco-gr"]');
    const graphicImage = graphicFrame ? graphicFrame.querySelector("img") : null;
    const col1 = [];
    if (textParagraphs.length > 0) {
      textParagraphs.forEach((p) => col1.push(p));
    } else if (graphicImage) {
      col1.push(graphicImage);
    }
    const col2 = [];
    if (animationImage) {
      col2.push(animationImage);
    }
    const cells = [];
    if (col1.length > 0 || col2.length > 0) {
      cells.push([
        col1.length > 0 ? col1 : "",
        col2.length > 0 ? col2 : ""
      ]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-textimg", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/ie-brochures-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "iframe.ot-text-resize"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".webpub-topnav-v4",
        ".custom-brand",
        ".webpub-pagination__vertical-container",
        ".spread-background",
        'video[class^="spread-bgVideo"]',
        ".epub-view_panel"
      ]);
    }
  }

  // tools/importer/transformers/ie-brochures-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-executive-mba-brochure.js
  var parsers = {
    "hero-cover": parse,
    "table-specs": parse2,
    "columns-textimg": parse3
  };
  var PAGE_TEMPLATE = {
    name: "executive-mba-brochure",
    description: "IE Executive MBA brochure landing page with program information and application details",
    urls: [
      "https://iem-brochures.ie.edu/.executive.mba/"
    ],
    blocks: [
      {
        name: "hero-cover",
        instances: [
          ".webpub-viewer__epub-container-spread-2 figure.spread-page-1"
        ]
      },
      {
        name: "table-specs",
        instances: [
          ".webpub-viewer__epub-container-spread-1 figure.spread-page-2",
          ".webpub-viewer__epub-container-spread-1 figure.spread-page-3"
        ]
      },
      {
        name: "columns-textimg",
        instances: [
          ".webpub-viewer__epub-container-spread-0 figure.spread-page-4",
          ".webpub-viewer__epub-container-spread-0 figure.spread-page-5"
        ]
      }
    ],
    sections: [
      {
        id: "section-1-cover",
        name: "Cover / Hero",
        selector: ".webpub-viewer__epub-container-spread-2",
        style: "dark",
        blocks: ["hero-cover"],
        defaultContent: []
      },
      {
        id: "section-2-el-programa",
        name: "El Programa - Overview",
        selector: ".webpub-viewer__epub-container-spread-1",
        style: "dark",
        blocks: ["table-specs"],
        defaultContent: [".webpub-viewer__epub-container-spread-1 figure.spread-page-2 div[id^='_idContainer']"]
      },
      {
        id: "section-3-introduction",
        name: "El Programa - Introduction Text",
        selector: ".webpub-viewer__epub-container-spread-0",
        style: null,
        blocks: ["columns-textimg"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_executive_mba_brochure_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_executive_mba_brochure_exports);
})();
