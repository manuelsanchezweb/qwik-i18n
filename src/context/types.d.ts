export interface Translation {
  [key: string]: any;
}

export interface I18nContextValue {
  language: string;
  t: Translation;
}
