import { createContext } from "@builder.io/qwik";
import type { I18nContextValue } from "./types";

export const i18nContext = createContext<I18nContextValue>("language");
