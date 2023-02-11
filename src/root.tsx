import {
  $,
  component$,
  useClientEffect$,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { i18nContext } from "./context/i18n-ctx";
import {
  defaultLanguage,
  supportedLanguages,
  translations,
} from "./context/i18n-settings";
import type { I18nContextValue } from "./context/types";

import "./global.css";

export default component$(() => {
  const i18nStore = useStore<I18nContextValue>({
    language: defaultLanguage,
    t: {},
  });

  const getUserLanguage = $(() => {
    const browserLang = navigator.language.split("-")[0];
    const storedLang = localStorage.getItem("language");

    if (storedLang && supportedLanguages.includes(storedLang)) {
      i18nStore.language = storedLang;
    } else if (supportedLanguages.includes(browserLang)) {
      i18nStore.language = browserLang;
    } else {
      i18nStore.language = defaultLanguage;
    }
  });

  const initI18nStore = () => {
    useClientEffect$(() => {
      // Vamos a actualizar tanto la variable como el método de changeLanguage
      // en cuanto tengamos disponible el cliente / navegador / localStorage.
      // STEP 1: Actualizar la primera variable - el idioma favorito del usuario.
      getUserLanguage();

      // STEP 2: Actualizamos el método que habíamos dejado vació arriba
      i18nStore.t = {
        changeLanguage: $((lang: string) => {
          if (supportedLanguages.includes(lang)) {
            i18nStore.language = lang;
            localStorage.setItem("language", lang);
          }
        }),
        translate: $((key: string | number, count?: number) => {
          const keys = key.toString().split(".");
          let value: any = translations[i18nStore.language];
          for (let i = 0; i < keys.length; i++) {
            if (value && Object.prototype.hasOwnProperty.call(value, keys[i])) {
              value = value[keys[i]];
            } else {
              return "";
            }
          }
          if (
            typeof count === "number" &&
            Object.prototype.hasOwnProperty.call(
              value,
              count === 1 ? "one" : "other"
            )
          ) {
            value = value[count === 1 ? "one" : "other"];
          } else if (Object.prototype.hasOwnProperty.call(value, "one")) {
            value = value["one"];
          }
          if (typeof value === "string" && count) {
            return value.replace("{count}", count.toString());
          }
          return value;
        }),
      };
    });

    useTask$(({ track }) => {
      // Use track to rerun this function when store's `value` property changes.
      track(() => i18nStore.language);
      // STEP 3: Actualizamos el archivo de las traducciones siempre que cambiemos el idioma
      i18nStore.t = {
        changeLanguage: $((lang: string) => {
          if (supportedLanguages.includes(lang)) {
            i18nStore.language = lang;
            localStorage.setItem("language", lang);
          }
        }),

        translate: $((key: string | number, count?: number) => {
          const keys = key.toString().split(".");
          let value: any = translations[i18nStore.language];
          for (let i = 0; i < keys.length; i++) {
            if (value && Object.prototype.hasOwnProperty.call(value, keys[i])) {
              value = value[keys[i]];
            } else {
              return "";
            }
          }
          if (
            typeof count === "number" &&
            Object.prototype.hasOwnProperty.call(
              value,
              count === 1 ? "one" : "other"
            )
          ) {
            value = value[count === 1 ? "one" : "other"];
          } else if (Object.prototype.hasOwnProperty.call(value, "one")) {
            value = value["one"];
          }
          if (typeof value === "string" && count) {
            return value.replace("{count}", count.toString());
          }
          return value;
        }),
      };

      // Return cleanup function in case `value` property changes before time is up.
      // El hook también proporciona una función de limpieza que se ejecutaría en caso de que la propiedad "value" cambie antes de que la tarea se complete. Sin embargo, en este caso, la función de limpieza está vacía.
      return () => {
        i18nStore.t = { changeLanguage: $(() => ""), translate: $(() => "") };
      };
    });
  };

  initI18nStore();
  useContextProvider(i18nContext, i18nStore);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
