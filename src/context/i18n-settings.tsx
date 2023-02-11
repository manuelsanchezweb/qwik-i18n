import de from "../locale/de.js";
import en from "../locale/en.js";
import es from "../locale/es.js";

import { Translation } from "./types.js";

export const supportedLanguages = ["en", "es", "de"];

export const defaultLanguage = "";

export const translations: { [key in string]: Translation } = {
  en,
  es,
  de,
};
