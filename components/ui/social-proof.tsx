"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { resolveImageUrl, type ApiClientLogo, type ApiMetric, type ApiTestimonial } from "@/lib/api";

/**
 * All three sections return `null` when they have no rows.
 *
 * That is the whole design. There is no fallback content and no "coming soon"
 * state, because the alternative — a testimonial attributed to a named person
 * at a named company, invented to fill a grid — is a false claim on a page
 * that asks people for money. An absent section costs nothing; a fabricated
 * one is a liability. The machinery exists so publishing real proof is a paste
 * into the admin panel rather than a deploy.
 */

export function MetricsStrip({ metrics }: { metrics: ApiMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <section className="px-6 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric._id} delay={i * 0.05} direction="up">
              <div className="bg-black px-6 py-10 h-full">
                <div className="font-mono text-4xl md:text-5xl font-light text-mint tracking-tight">
                  {metric.value}
                </div>
                <div className="mt-3 text-sm font-medium tracking-tight text-white">{metric.label}</div>
                {metric.description && (
                  <p className="mt-2 text-xs text-zinc-500 leading-relaxed font-light">{metric.description}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientLogoWall({ logos }: { logos: ApiClientLogo[] }) {
  if (logos.length === 0) return null;

  return (
    <section className="px-6 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-mono-tag text-mint mb-10">Trusted_by //</div>
        </ScrollReveal>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-10">
          {logos.map((logo, i) => {
            // A name is always rendered; the image is an enhancement. A logo row
            // with a broken upload should still say who the client is.
            const content = logo.logo ? (
              <img
                src={resolveImageUrl(logo.logo)}
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300"
              />
            ) : (
              <span className="text-lg font-medium tracking-tight text-zinc-500 hover:text-zinc-300 transition-colors">
                {logo.name}
              </span>
            );

            return (
              <ScrollReveal key={logo._id} delay={i * 0.04} direction="up">
                {logo.websiteUrl ? (
                  <a href={logo.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
                    {content}
                  </a>
                ) : (
                  content
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ testimonials }: { testimonials: ApiTestimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="px-6 py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-mono-tag text-mint mb-4">Client_words //</div>
          <h2 className="mb-14">
            What they <span className="text-white italic">say.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 0.05} direction="up">
              <figure className="h-full flex flex-col gap-6 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors duration-300">
                {/* Rendered only when a rating was actually given, so a
                    testimonial without one shows nothing rather than zero stars. */}
                {typeof item.rating === "number" && (
                  <div className="flex gap-1" aria-label={`${item.rating} out of 5`}>
                    {Array.from({ length: 5 }, (_, idx) => (
                      <span
                        key={idx}
                        aria-hidden
                        className={idx < item.rating! ? "text-mint" : "text-zinc-700"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}

                <blockquote className="text-zinc-300 leading-relaxed font-light flex-1">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-4 pt-2">
                  {item.avatar && (
                    <img
                      src={resolveImageUrl(item.avatar)}
                      alt=""
                      className="size-10 rounded-full object-cover bg-white/5"
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium tracking-tight text-white">{item.authorName}</div>
                    {(item.authorRole || item.authorCompany) && (
                      <div className="text-xs text-zinc-500 font-light">
                        {[item.authorRole, item.authorCompany].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
