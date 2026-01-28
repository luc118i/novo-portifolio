import React from "react";

type Props = React.ComponentPropsWithoutRef<"section"> & {
  id: string;
  children: React.ReactNode;
};

export function Section({ id, className, children, ...rest }: Props) {
  return (
    <section id={id} className={`scroll-mt-28 ${className ?? ""}`} {...rest}>
      <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
    </section>
  );
}
