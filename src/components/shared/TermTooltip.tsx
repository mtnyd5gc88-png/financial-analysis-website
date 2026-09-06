"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FORMULA_TERMS, resolveTerm } from "@/data/terminology";

interface Props {
  // Key into the terminology registry, e.g. "TTM".
  termKey: string;
  // What to render as the trigger text. Defaults to the term itself.
  children?: React.ReactNode;
}

// A small inline explainer for one abbreviation.
// Opens on hover, on keyboard focus, and on tap — so it works on touch devices
// where there is no hover state. Escape closes it.
export default function TermTooltip({ termKey, children }: Props) {
  const resolved = resolveTerm(termKey);
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Unknown term: render the text plainly rather than a broken control.
  if (!resolved) return <>{children ?? termKey}</>;

  return (
    <span
      ref={wrapRef}
      className="relative inline-flex items-baseline gap-0.5 whitespace-nowrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children ?? resolved.term}
      <button
        type="button"
        aria-label={`What does ${resolved.term} mean?`}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        // Opens, never toggles. A tap fires focus (which opens) and then click,
        // so toggling here would close it again immediately on touch devices.
        // Closing is handled by tapping outside, blur, or Escape.
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="ml-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center self-center rounded-full border border-gray-300 text-[9px] font-semibold leading-none text-gray-500 hover:border-blue-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        i
      </button>

      {open && (
        <span
          role="tooltip"
          id={id}
          className="absolute bottom-full left-0 z-30 mb-1.5 w-64 whitespace-normal rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-xs font-normal leading-relaxed text-gray-600 shadow-lg"
        >
          <span className="block font-semibold text-gray-900">
            {resolved.expansion}
          </span>
          <span className="mt-0.5 block">{resolved.body}</span>
        </span>
      )}
    </span>
  );
}

// Renders a formula string, turning the abbreviations inside it into tooltips.
// Only the tokens in FORMULA_TERMS are matched, longest-first, so "EBITDA" is
// never split into "EBIT" + "DA".
export function FormulaWithTerms({ formula }: { formula: string }) {
  const pattern = new RegExp(`(${FORMULA_TERMS.join("|")})`, "g");
  const parts = formula.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        (FORMULA_TERMS as readonly string[]).includes(part) ? (
          <TermTooltip key={i} termKey={part} />
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// Renders a basis string such as "TTM, diluted", explaining TTM inline.
export function BasisWithTerms({ basis }: { basis: string }) {
  const parts = basis.split(/(TTM)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "TTM" ? (
          <TermTooltip key={i} termKey="TTM" />
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
