import type { ApiPostBlock } from "@/lib/api";

/**
 * Renders a post's body from its blocks.
 *
 * Every branch produces text nodes. Nothing here interprets markup, so a post
 * containing a `<script>` renders the characters `<script>` — which is the only
 * safe contract for a field a marketing editor can type into and publish
 * without review.
 *
 * An unknown block type falls through to a paragraph rather than disappearing:
 * a type added to the server before this renderer knows about it should show
 * its text, not silently drop a section of the article.
 */
export function PostBody({ blocks }: { blocks: ApiPostBlock[] }) {
  if (blocks.length === 0) return null;

  return (
    <div className="mt-12 space-y-6 text-[17px] leading-relaxed text-zinc-300">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          return (
            <h2 key={key} className="text-2xl font-semibold tracking-tight text-white pt-6">
              {block.label || block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={key}
              className="border-l-2 border-mint/60 pl-6 text-xl italic text-zinc-200"
            >
              {block.text}
              {block.label && (
                <footer className="mt-2 text-sm not-italic text-zinc-500">— {block.label}</footer>
              )}
            </blockquote>
          );
        }

        if (block.type === "code") {
          return (
            <figure key={key}>
              {block.label && (
                <figcaption className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
                  {block.label}
                </figcaption>
              )}
              <pre className="overflow-x-auto rounded-xl border border-white/5 bg-zinc-950 p-5 text-sm text-zinc-300">
                <code>{block.text}</code>
              </pre>
            </figure>
          );
        }

        if (block.type === "list") {
          const items = block.text
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
          if (items.length === 0) return null;
          return (
            <ul key={key} className="list-disc pl-6 space-y-2">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className="whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
