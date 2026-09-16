import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Drops the ISR cache for specific routes, called by the API after a CMS write.
 *
 * Every public page sits behind `revalidate = 3600` and there was no
 * `revalidatePath` anywhere in the codebase, so the honest answer to "I saved
 * it, why hasn't it changed?" was "wait up to an hour". That turns every
 * content phase into an editor experience of saving into a void.
 *
 * Auth is a shared secret in a header rather than a signed payload: the body
 * carries no authority — it only names paths to forget — so the worst a leaked
 * secret buys an attacker is making us re-render our own pages.
 */
export const runtime = "nodejs";
/** Never prerender or cache the endpoint that exists to invalidate caches. */
export const dynamic = "force-dynamic";

/** Paths that change whenever site-wide settings do. */
const SETTINGS_DEPENDENT_PATHS = [
  "/",
  "/about",
  "/services",
  "/how-we-work",
  "/team",
  "/work",
  "/contact"
];

function isSafePath(path: unknown): path is string {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//");
}

/**
 * Constant-time comparison of the shared secret.
 *
 * The practical risk here is low — network jitter swamps the timing signal and
 * the worst outcome is an unwanted cache purge — but a byte-by-byte `!==` on a
 * credential is the kind of thing a client's security reviewer flags, and this
 * costs nothing. Lengths are compared first because timingSafeEqual throws on a
 * length mismatch; leaking the secret's length is not worth guarding against.
 */
function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  // Unconfigured means "this deployment does not accept revalidation", not
  // "accept anything". Failing open here would leave a public cache-buster.
  if (!secret) {
    return NextResponse.json({ revalidated: false, reason: "not configured" }, { status: 503 });
  }

  if (!secretMatches(request.headers.get("x-revalidate-secret"), secret)) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  let body: { paths?: unknown; scope?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    // An empty body is a valid "refresh the settings-dependent pages" call.
  }

  const requested = Array.isArray(body.paths) ? body.paths.filter(isSafePath) : [];
  const paths = requested.length > 0 ? requested : SETTINGS_DEPENDENT_PATHS;

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths, at: Date.now() });
}
