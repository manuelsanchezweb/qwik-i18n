import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/Button/button";
import { Description } from "~/components/Description/description";
import { LanguageSelector } from "~/components/LanguageSelector/languageSelector";
import { Title } from "~/components/Title/title";

export default component$(() => {
  return (
    <div class="page-wrapper">
      <header>
        <div class="logo shadow-neo">LOGO</div>
        <LanguageSelector />
      </header>
      <main>
        <div class="text">
          <Title customClass="text__title" />
          <Description customClass="text__description" />
          <Button />
        </div>
      </main>
      <footer>Copyright 2023 - Manuel Sanchez - All Rights Reserved</footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "⭐️ QWik + i18n ",
  meta: [
    {
      name: "description",
      content:
        "Librería casera para poder utilizar con Qwik con handle para varios idiomas y pluralización.",
    },
  ],
};
