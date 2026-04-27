"use client";

import { useSiteSettings } from "@/lib/hooks/use-cms-content";
import { useEffect } from "react";

export function MetaManager() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (!settings?.seoDefaults) return;

    const seo = settings.seoDefaults;
    if (seo.title) document.title = seo.title;
    
    // Update description meta tag
    if (seo.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', seo.description);
    }
  }, [settings]);

  return null;
}
