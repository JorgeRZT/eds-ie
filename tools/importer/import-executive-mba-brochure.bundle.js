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
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

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

  // tools/importer/parsers/highlight-text.js
  function parse4(element, { document }) {
    const textContainer = element.querySelector('[class*="Marco-de-texto"]');
    const paragraphs = textContainer ? Array.from(textContainer.querySelectorAll("p")) : Array.from(element.querySelectorAll("p"));
    const content = paragraphs.filter((p) => p.textContent.trim().length > 0);
    if (content.length === 0) {
      element.remove();
      return;
    }
    const cells = content.map((p) => [p]);
    const block = WebImporter.Blocks.createBlock(document, { name: "highlight-text", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/ranking.js
  function parse5(element, { document }) {
    const rankingImg = element.querySelector('img[src*="BusinessSchool_Rankings"], img[src*="Rankings"]');
    const cells = [];
    if (rankingImg) {
      cells.push([rankingImg]);
    }
    if (cells.length === 0) {
      element.remove();
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "ranking", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/feature-textimg.js
  function parse6(element, { document }) {
    const textContainer = element.querySelector('[class*="Marco-de-texto"]');
    const paragraphs = (textContainer ? Array.from(textContainer.querySelectorAll("p")) : Array.from(element.querySelectorAll("p"))).filter((p) => p.textContent.trim().length > 0);
    const col1 = [];
    paragraphs.forEach((p, i) => {
      const text = p.textContent.trim();
      const isTitle = i === 0 && text.length < 40 && !/[.!?]$/.test(text);
      if (isTitle) {
        const h = document.createElement("h2");
        h.textContent = text;
        col1.push(h);
      } else {
        col1.push(p);
      }
    });
    const photo = Array.from(element.querySelectorAll("img")).find((img) => !/Rankings/i.test(img.getAttribute("src") || ""));
    const col2 = photo ? [photo] : "";
    const cells = [[col1.length ? col1 : "", col2]];
    const block = WebImporter.Blocks.createBlock(document, { name: "feature-textimg", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion.js
  function parse7(element, { document }) {
    const heading = "\xBFA qui\xE9n va dirigido el Executive MBA?";
    const titleSet = /* @__PURE__ */ new Set([
      heading,
      "L\xEDderes decididos a impulsar el cambio",
      "L\xEDderes que se anticipen a las tendencias",
      "Aspirantes a la alta direcci\xF3n C-Suite",
      "L\xEDderes dispuestos a ir un paso m\xE1s all\xE1",
      "L\xEDderes con una gran red de contactos",
      "L\xEDderes capaces de reinventarse"
    ]);
    const allParagraphs = Array.from(element.querySelectorAll("p")).map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
    const titles = [];
    const seenTitles = /* @__PURE__ */ new Set();
    allParagraphs.forEach((t) => {
      if (titleSet.has(t) && t !== heading && !seenTitles.has(t)) {
        seenTitles.add(t);
        titles.push(t);
      }
    });
    const descriptions = [];
    const seenDesc = /* @__PURE__ */ new Set();
    allParagraphs.forEach((t) => {
      if (!titleSet.has(t) && !seenDesc.has(t)) {
        seenDesc.add(t);
        descriptions.push(t);
      }
    });
    if (titles.length === 0) {
      element.remove();
      return;
    }
    const cells = [[heading]];
    titles.forEach((title, i) => {
      cells.push([title, descriptions[i] || ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/profile-stats.js
  function parse8(element, { document }) {
    const title = "Contactos para toda la vida";
    const paragraphs = Array.from(element.querySelectorAll("p")).map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
    const isNumber = (t) => /^[+\-]?\d/.test(t);
    const stats = [];
    paragraphs.forEach((t, i) => {
      if (isNumber(t)) {
        const label = i > 0 ? paragraphs[i - 1] : "";
        if (label && label !== title) stats.push([t, label]);
      }
    });
    const imgs = Array.from(element.querySelectorAll("img"));
    const portrait = imgs.find((img) => /emba/i.test(img.getAttribute("src") || "")) || imgs.find((img) => /\.webp$/i.test(img.getAttribute("src") || "")) || imgs[0];
    if (stats.length === 0) {
      element.remove();
      return;
    }
    const cells = [];
    cells.push([title]);
    cells.push([portrait ? [portrait] : ""]);
    stats.forEach((s) => cells.push(s));
    const block = WebImporter.Blocks.createBlock(document, { name: "profile-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/logo-marquee.js
  function parse9(element, { document }) {
    const eyebrow = "Professional backgrounds";
    const note = "Descubre todos los caminos que puede abrirte el Executive MBA";
    const ctaLabel = "Descubre m\xE1s";
    const sectors = [
      "Banca/Seguros/Servicios financieros",
      "Tecnolog\xEDa/Comunicaciones",
      "Servicios p\xFAblicos de energ\xEDa",
      "Productos de consumo y retail",
      "Transporte y log\xEDstica",
      "Salud/Farmacia/Biotecnolog\xEDa",
      "Sector inmobiliario y de la construcci\xF3n",
      "Consultor\xEDa"
    ];
    const pageText = Array.from(element.querySelectorAll("p")).map((p) => p.textContent.replace(/\s+/g, " ").trim());
    const present = sectors.filter((s) => pageText.some((t) => t === s));
    const items = present.length >= 4 ? present : sectors;
    const ul = document.createElement("ul");
    items.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.append(li);
    });
    const eyebrowP = document.createElement("p");
    eyebrowP.textContent = eyebrow;
    const noteP = document.createElement("p");
    noteP.textContent = note;
    const cta = document.createElement("a");
    cta.href = "#";
    cta.textContent = ctaLabel;
    const cells = [
      [eyebrowP],
      [ul],
      [noteP],
      [cta]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "logo-marquee", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/alumni-story.js
  function parse10(element, { document }) {
    const title = "Marcando la diferencia";
    const intro = "Descubre la historia de Carmen, una destacada alumna del Executive MBA que ha trazado un camino inspirador en el mundo empresarial.";
    const scope = element.closest("[data-section]") || element.parentElement || element;
    const mediaEl = scope.querySelector('a[href$=".mp4"], source[src$=".mp4"], video');
    let mediaCell = "";
    if (mediaEl) {
      let src = mediaEl.getAttribute("href") || mediaEl.getAttribute("src") || "";
      src = src.replace(/^.*\/(?=[^/]+\.mp4)/, "https://iem-brochures.ie.edu/");
      const a = document.createElement("a");
      a.href = src;
      a.textContent = src;
      mediaCell = [a];
    }
    const captionP = document.createElement("p");
    captionP.innerHTML = "<strong>Carmen Carre\xF1o.</strong> Promoci\xF3n de 2021";
    const introP = document.createElement("p");
    introP.textContent = intro;
    const groups = /* @__PURE__ */ new Map();
    Array.from(element.querySelectorAll("p")).forEach((p) => {
      const text = p.textContent.replace(/\s+/g, " ").trim();
      if (!text) return;
      const parent = p.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(text);
    });
    const isPeriod = (t) => /(\d{4}|actualidad|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.test(t);
    const steps = [];
    const seen = /* @__PURE__ */ new Set();
    groups.forEach((lines) => {
      if (lines.length >= 2 && isPeriod(lines[0]) && lines[0] !== intro) {
        const key = lines.join("|");
        if (!seen.has(key)) {
          seen.add(key);
          steps.push(lines);
        }
      }
    });
    const cells = [];
    cells.push([title, captionP]);
    cells.push([mediaCell, introP]);
    steps.forEach((lines) => {
      const periodP = document.createElement("p");
      periodP.textContent = lines[0];
      const frag = [periodP];
      lines.slice(1).forEach((line) => {
        const p = document.createElement("p");
        p.textContent = line;
        frag.push(p);
      });
      cells.push(["", frag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "alumni-story", cells });
    Array.from(scope.querySelectorAll("figure")).forEach((f) => {
      if (f !== element) f.remove();
    });
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
    "columns-textimg": parse3,
    "highlight-text": parse4,
    ranking: parse5,
    "feature-textimg": parse6,
    accordion: parse7,
    "profile-stats": parse8,
    "logo-marquee": parse9,
    "alumni-story": parse10
  };
  var HOLDER_ID = "excat-captured";
  var LAST_PAGE = 13;
  var SECTION_PAGES = {
    "section-1-cover": [1],
    "section-2-el-programa": [2, 3],
    "section-3-introduction": [4],
    "section-4-coach-ranking": [6, 7],
    "section-5-opcion-ideal": [8, 9],
    "section-6-contactos": [10, 11],
    "section-7-alumni": [12, 13]
  };
  var sectionSel = (id) => `#${HOLDER_ID} [data-section="${id}"]`;
  var PAGE_TEMPLATE = {
    name: "executive-mba-brochure",
    description: "IE Executive MBA brochure landing page with program information and application details",
    urls: [
      "https://iem-brochures.ie.edu/.executive.mba/"
    ],
    blocks: [
      { name: "hero-cover", instances: [`#${HOLDER_ID} figure.spread-page-1`] },
      {
        name: "table-specs",
        instances: [
          `#${HOLDER_ID} figure.spread-page-2`,
          `#${HOLDER_ID} figure.spread-page-3`
        ]
      },
      { name: "columns-textimg", instances: [`#${HOLDER_ID} figure.spread-page-4`] },
      { name: "highlight-text", instances: [`#${HOLDER_ID} figure.spread-page-6`] },
      { name: "ranking", instances: [`#${HOLDER_ID} figure.spread-page-7`] },
      { name: "feature-textimg", instances: [`#${HOLDER_ID} figure.spread-page-8`] },
      { name: "accordion", instances: [`#${HOLDER_ID} figure.spread-page-9`] },
      { name: "profile-stats", instances: [`#${HOLDER_ID} figure.spread-page-10`] },
      { name: "logo-marquee", instances: [`#${HOLDER_ID} figure.spread-page-11`] },
      // alumni-story targets the timeline figure (page 13) and reads the video
      // from its sibling (page 12) within the same section wrapper.
      { name: "alumni-story", instances: [`#${HOLDER_ID} figure.spread-page-13`] }
    ],
    sections: [
      {
        id: "section-1-cover",
        name: "Cover / Hero",
        selector: sectionSel("section-1-cover"),
        style: "dark",
        blocks: ["hero-cover"],
        defaultContent: []
      },
      {
        id: "section-2-el-programa",
        name: "El Programa - Overview",
        selector: sectionSel("section-2-el-programa"),
        style: "dark",
        blocks: ["table-specs"],
        defaultContent: []
      },
      {
        id: "section-3-introduction",
        name: "El Programa - Introduction Text",
        selector: sectionSel("section-3-introduction"),
        style: null,
        blocks: ["columns-textimg"],
        defaultContent: []
      },
      {
        id: "section-4-coach-ranking",
        name: "Coach statement + ranking",
        selector: sectionSel("section-4-coach-ranking"),
        style: null,
        blocks: ["highlight-text", "ranking"],
        defaultContent: []
      },
      {
        id: "section-5-opcion-ideal",
        name: "La opci\xF3n ideal + perfil",
        selector: sectionSel("section-5-opcion-ideal"),
        style: null,
        blocks: ["feature-textimg", "accordion"],
        defaultContent: []
      },
      {
        id: "section-6-contactos",
        name: "Contactos para toda la vida",
        selector: sectionSel("section-6-contactos"),
        style: null,
        blocks: ["profile-stats", "logo-marquee"],
        defaultContent: []
      },
      {
        id: "section-7-alumni",
        name: "Marcando la diferencia",
        selector: sectionSel("section-7-alumni"),
        style: null,
        blocks: ["alumni-story"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
  function captureBook(document) {
    return __async(this, null, function* () {
      var _a;
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      (_a = document.getElementById(HOLDER_ID)) == null ? void 0 : _a.remove();
      const holder = document.createElement("div");
      holder.id = HOLDER_ID;
      const wrappers = {};
      Object.keys(SECTION_PAGES).forEach((id) => {
        const w = document.createElement("div");
        w.setAttribute("data-section", id);
        holder.appendChild(w);
        wrappers[id] = w;
      });
      const pageToSection = {};
      Object.entries(SECTION_PAGES).forEach(([id, pages]) => {
        pages.forEach((p) => {
          pageToSection[p] = id;
        });
      });
      const captured = {};
      for (let pageNum = 1; pageNum <= LAST_PAGE; pageNum += 1) {
        const sectionId = pageToSection[pageNum];
        if (!sectionId) continue;
        window.location.hash = `#page=${pageNum}`;
        yield wait(2200);
        const figs = [...document.querySelectorAll(`figure.spread-page-${pageNum}`)];
        let best = null;
        let bestLen = -1;
        figs.forEach((f) => {
          const len = (f.textContent || "").length + f.querySelectorAll("img").length;
          if (len > bestLen) {
            bestLen = len;
            best = f;
          }
        });
        if (best && !captured[pageNum]) {
          captured[pageNum] = true;
          wrappers[sectionId].appendChild(best.cloneNode(true));
        }
      }
      [...document.body.children].forEach((child) => {
        if (child === holder) return;
        const tag = child.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" || tag === "NOSCRIPT") return;
        child.remove();
      });
      document.body.appendChild(holder);
      console.log(`Captured ${Object.keys(captured).length} flipbook pages into #${HOLDER_ID}`);
    });
  }
  var import_executive_mba_brochure_default = {
    onLoad: (_0) => __async(void 0, [_0], function* ({ document }) {
      yield captureBook(document);
    }),
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
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "").replace(/\.executive\.mba$/, "executivemba")
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
