# Librería de Qwik sobre i18n con handle para varios idiomas (+ plural)

## Licencia

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Setup

- Crear una carpeta dentro de src llamada `locale`, y crea los archivos de traducciones dentro. Por ejemplo, crea `en.ts`, `de.ts` y `es.ts`. Una estructura podría ser la siguiente:

```javascript
// src/locale/es.ts
const es = {
  languages: {
    en: "Inglés",
    es: "Español",
    de: "Alemán",
  },
  settings: {
    languageChange: "Cambiar idioma",
    languageCurrent: "Idioma elegido",
  },
  addMessage: "Recibir un mensaje",
  messages: {
    one: "Tienes un mensaje",
    other: "Tienes {count} mensajes",
  },
  title: "Título en español",
  description: "Descripción increíble",
};

export default es;
```

```javascript
// src/locale/en.ts
const en = {
  languages: {
    en: "English",
    es: "Spanish",
    de: "German",
  },
  settings: {
    languageChange: "Choose language",
    languageCurrent: "Current language",
  },
  addMessage: "Add message",
  messages: {
    one: "You have one message",
    other: "You have {count} messages",
  },
  title: "Title in English",
  description: "Cool description",
};

export default en;
```

- Importa los archivos en el archivo `src/context/i18n-settings.tsx`.

```javascript
// Translation files
import de from ".,/locale/de.js";
import en from "../locale/en.js";
import es from "../locale/es.js";
```

- Selecciona en el mismo archivo los idiomas que quieres tener.

```javascript
const supportedLanguages = ["en", "es", "de"];
const defaultLanguage = "en";
```

```javascript
// The translations object
const translations: { [key in string]: Translation } = {
    en,
    es,
    de,
};
```

- Usa el método t.translate para un handle de las traducciones, como en el ejemplo dentro de `src/components/Title/title.tsx`.

```js
// src/components/Title/title.tsx
import { component$, useContext } from "@builder.io/qwik";
import { i18nContext } from "~/context/i18n-ctx";

interface TitleProps {
  customClass: string;
}

export const Title = component$(({ customClass }: TitleProps) => {
  const context = useContext(i18nContext);

  return (
    <div class={`${customClass} shadow-neo`}>
      <h1>{context.t.translate("title")}</h1>
    </div>
  );
});
```

- También es posible anidar objetos en caso de que quieras hacer una mejor estructura en tus traducciones. En `src/components/Title/title.tsx` tienes el ejemplo con las settings, y aquí en `src/components/LanguageSelector/languageSelector.tsx` tienes otro con los idiomas.

```js
import { $, component$, useContext } from "@builder.io/qwik";
import { i18nContext } from "~/context/i18n-ctx";
import { IconLanguage } from "../icons/IconLanguage";

export const LanguageSelector = component$(() => {
  const context = useContext(i18nContext);

  if (context === null) {
    throw new Error(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  }

  const changeLanguage = $((e: any) => context.changeLanguage(e.target.value));

  return (
    <label for="select" class="language-switcher">
      <IconLanguage />
      <select
        class="language-switcher-input"
        value={context.language}
        onChange$={changeLanguage}
        name="select"
        id="select"
      >
        <option value="en">{context.t.translate("languages.en")}</option>
        <option value="es">{context.t.translate("languages.es")}</option>
        <option value="de">{context.t.translate("languages.de")}</option>
      </select>
    </label>
  );
});
```

- Si quieres ver el handling del plural, mira el archivo de `src/components/Button/button.tsx`.

```js
import { component$, useContext, useSignal } from "@builder.io/qwik";
import { i18nContext } from "~/context/i18n-ctx";

export const Button = component$(() => {
  const count = useSignal(1);
  const context = useContext(i18nContext);

  return (
    <div class="text__description__outer">
      <button class="shadow-neo" onClick$={() => count.value++}>
        {context.t.translate("addMessage")}
      </button>
      <div class="text__description__inner">
        <p>{context.t.translate("messages", count.value)}</p>
        {/* This would directly render 5 */}
        {/* <p>{context.t.translate("messages", 5)}</p> */}
      </div>
    </div>
  );
});

export default Button;
```

## Autores

- [@manuelsanchezweb](https://www.github.com/manuelsanchezweb)

## Instalación

Es un proyecto hecho con Qwik Build, así que lo puedes instalar fácilmente con un `npm i` y `npm run dev`.
Para más dudas, échale un vistazo a nuestro querido `package.json`.
