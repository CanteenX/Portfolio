import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

/**
 * The default share card for the whole site.
 *
 * The root layout declared `twitter.card: "summary_large_image"` with no image
 * anywhere, so every share on LinkedIn or WhatsApp rendered as a bare grey box
 * while claiming to be a large-image card. LinkedIn is where agency referrals
 * actually travel, so this is the most-seen surface the site had and it was
 * empty.
 *
 * Generated rather than a static PNG so the wording tracks the brand constants
 * instead of drifting from them. Pages that set their own openGraph.images —
 * project and team detail routes — override this.
 */
export const alt = `${SITE_NAME} — high-performance web and mobile engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 14, height: 14, background: "#00FFA3" }} />
          <div
            style={{
              color: "#00FFA3",
              fontSize: 26,
              letterSpacing: "0.24em",
              textTransform: "uppercase"
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#ffffff", fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            High-performance web
          </div>
          <div style={{ color: "#71717a", fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            and mobile engineering.
          </div>
        </div>

        <div style={{ color: "#52525b", fontSize: 26, letterSpacing: "0.1em" }}>
          nventra.umaeng.co.in
        </div>
      </div>
    ),
    size
  );
}
