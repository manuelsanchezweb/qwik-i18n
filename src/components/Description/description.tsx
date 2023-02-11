import { component$, useContext } from "@builder.io/qwik";
import { i18nContext } from "~/context/i18n-ctx";

interface DescriptionProps {
  customClass: string;
}

export const Description = component$(({ customClass }: DescriptionProps) => {
  const context = useContext(i18nContext);

  return (
    <div class={`${customClass} shadow-neo`}>
      <h2>{context.t.translate("description")}</h2>
    </div>
  );
});
