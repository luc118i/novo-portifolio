import { useEffect, useRef } from "react";
import Prism from "prismjs";

// linguagens que você usa
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup"; // html
import "prismjs/themes/prism-tomorrow.css"; // tema dark bonito

export function CodeBlock({
  code,
  language = "javascript",
}: {
  code: string;
  language?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    Prism.highlightElement(ref.current!);
  }, [code]);

  return (
    <pre
      style={{
        background: "#0A0F24",
        borderRadius: 12,
        padding: 20,
        overflowX: "auto",
      }}
    >
      <code ref={ref} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
