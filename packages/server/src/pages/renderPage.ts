// src/pages/renderPage.ts
import {
  PageParts,
  renderWithDefaults
} from "@calpoly/mustang/server";

const defaults = {
  stylesheets: [
    "/style/reset.css",
    "/style/token.css",
    "/style/page.css"
  ],
  styles: [],
  scripts: [
    `import { define } from "@calpoly/mustang";
    import { NavigationBarElement } from "/scripts/navbar.component.js";
    import { HistoryElement } from "/scripts/History/HistoryElement.component.js";
    import { HistoryCard } from "/scripts/History/HistoryCard.component.js";
    import { TableElement } from "/scripts/Table/TableElement.component.js";

    define({
      "nav-bar": NavigationBarElement,
      "history-element": HistoryElement,
      "history-card": HistoryCard,
      "table-element": TableElement,
    });
    NavigationBarElement.initializeOnce();
    `
  ],
  googleFontURL:
    "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
  }
};

export default function renderPage(page: PageParts) {
  return renderWithDefaults(page, defaults);
}