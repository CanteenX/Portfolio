import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiSocketdotio,
  SiGooglemaps,
  SiGooglegemini,
  SiLivekit,
  SiGotomeeting,
  SiWhatsapp,
  SiFlutter,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiGraphql,
  SiPrisma,
  SiStripe,
  SiTwilio,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

/**
 * Brand glyphs a TechStack master row may name.
 *
 * Case studies used to import these directly, which is why each page carried
 * its own icon list and why a stack entry could not be edited without a deploy.
 * A registry keyed by name lets the CMS hold `"SiReact"` and the site resolve
 * it, with the uploaded image and then a generic glyph as fallbacks — so an
 * unrecognised name degrades to the old behaviour rather than crashing.
 *
 * Add to this map when a new technology appears; the admin dropdown reads the
 * same list of keys.
 */
export const TECH_ICONS: Record<string, IconType> = {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiSocketdotio,
  SiGooglemaps,
  SiGooglegemini,
  SiLivekit,
  SiGotomeeting,
  SiWhatsapp,
  SiFlutter,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiGraphql,
  SiPrisma,
  SiStripe,
  SiTwilio,
  FaAws,
};

export const TECH_ICON_NAMES = Object.keys(TECH_ICONS);
