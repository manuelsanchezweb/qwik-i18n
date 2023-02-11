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
