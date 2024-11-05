type HtmlString = string;
type CssString = string;

export interface PageParts {
  body: HtmlString;
  stylesheets?: string[];
  styles?: CssString[];
  scripts?: string[];
  googleFontURL?: string;
  imports?: { [key: string]: any };
}
