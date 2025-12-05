import { twMerge } from "tailwind-merge";
export default function Button({ as="a", href="#", variant="primary", className, children, ...rest }){
  const Comp = as;
  const base = variant === "primary" ? "btn-primary" : "btn-ghost";
  return <Comp href={href} className={twMerge(base, className)} {...rest}>{children}</Comp>;
}
