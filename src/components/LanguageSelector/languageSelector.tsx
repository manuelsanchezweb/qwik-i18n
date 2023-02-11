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

  const changeLanguage = $((e: any) =>
    context.t.changeLanguage(e.target.value)
  );

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
