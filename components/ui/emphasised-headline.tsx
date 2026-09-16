import React from "react";

/**
 * A headline with one word set apart.
 *
 * Several pages shipped their headline as three JSX pieces — text, a styled
 * <span>, text — which made the sentence uneditable: moving it into the CMS
 * would have meant either losing the emphasis or asking an editor to write
 * markup. This keeps the treatment and takes a plain string.
 *
 * The match is case-insensitive and applies to the first occurrence only. A
 * headline that does not contain the word renders unchanged, which is what
 * makes rewriting it in the CMS safe.
 */
export function EmphasisedHeadline({
  text,
  word,
  className = "text-zinc-600 italic"
}: {
  text: string;
  word: string;
  className?: string;
}) {
  const at = text.toLowerCase().indexOf(word.toLowerCase());
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{text.slice(at, at + word.length)}</span>
      {text.slice(at + word.length)}
    </>
  );
}
