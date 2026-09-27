import { Html } from "@elysiajs/html";

type ButtonProps =
  | {
      href: string;
      type?: never;
      value?: never;
      onclick?: string;
      variant: "primary" | "secondary" | "destructive";
      children: JSX.Element | JSX.Element[] | string;
    }
  | {
      href?: never;
      type?: "button" | "submit" | "reset";
      value?: string;
      onclick?: string;
      variant: "primary" | "secondary" | "destructive";
      children: JSX.Element | JSX.Element[] | string;
    };

export const Button = (props: ButtonProps) => {
  const buttonVariant = {
    primary:
      "flex h-10 items-center border border-accent bg-accent px-4 font-mono text-xs text-ink transition-colors hover:bg-paper",

    secondary:
      "flex h-10 items-center border border-paper/20 px-4 font-mono text-xs text-paper transition-colors hover:border-accent hover:bg-accent hover:text-ink",

    destructive:
      "flex h-10 items-center border border-red-500/30 px-4 font-mono text-xs text-red-400 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white",
  };

  if (props.href) {
    return (
      <a
        href={props.href}
        onclick={props.onclick}
        class={buttonVariant[props.variant]}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      value={props.value}
      onclick={props.onclick}
      class={buttonVariant[props.variant]}
    >
      {props.children}
    </button>
  );
};
