"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/lib/hooks/use-cms-content";

export function ThemeEngine() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (!settings?.theme) return;

    const theme = settings.theme;
    const root = document.documentElement;

    // Mapping dynamic colors to CSS variables
    const colorMap: Record<string, string> = {
      "--bg-primary": theme.bgPrimary,
      "--bg-secondary": theme.bgSecondary,
      "--bg-card": theme.bgCard,
      "--bg-card-hover": theme.bgCardHover,
      "--accent": theme.accent,
      "--accent-dim": theme.accentDim,
      "--accent-muted": theme.accentMuted,
      "--text-primary": theme.textPrimary,
      "--text-secondary": theme.textSecondary,
      "--text-muted": theme.textMuted,
      "--border": theme.border,
      "--border-hover": theme.borderHover,
    };

    Object.entries(colorMap).forEach(([variable, value]) => {
      if (value) {
        root.style.setProperty(variable, value);
      }
    });

    // Also update Tailwind's primary color if possible, 
    // but for now, we rely on these CSS variables in globals.css
  }, [settings]);

  return null; // This is a logic-only component
}
