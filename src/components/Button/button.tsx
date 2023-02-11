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
