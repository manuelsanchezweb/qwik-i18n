import { createContext } from "@builder.io/qwik";
import { I18nContextValue } from "./types";

export const i18nContext = createContext<I18nContextValue>("language");
