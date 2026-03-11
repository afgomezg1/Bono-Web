"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/modules/properties/types/property.type";
import { getPriceBadgeColor } from "@/modules/properties/ui/priceBadgeColor";

const SLIDE_IMAGES = [
  "/pexels-green-home.jpg",
  "/pexels-white-home.jpg",
  "/pexels-green-home.jpg",
];

interface FeaturedCarouselProps {
  properties: Property[];
}

function pickFeatured(properties: Property[]): { property: Property; index: number }[] {
  const featuredIndices = [0, 2, 5, 7, 13];
  return featuredIndices
    .filter((i) => i < properties.length)
    .map((i) => ({ property: properties[i], index: i }));
}

export default function FeaturedCarousel({ properties }: FeaturedCarouselProps) {
  const featured = pickFeatured(properties);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (featured.length === 0) return null;

  const { property, index } = featured[current];

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={SLIDE_IMAGES[current % SLIDE_IMAGES.length]}
          alt=""
          fill
          className="object-cover transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2">
          <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <h2 className="text-lg font-semibold text-white">Featured Properties</h2>
        </div>

        <div className="relative">
          <Link href={`/properties/${index}`}>
            <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all hover:bg-white/15 sm:grid-cols-2">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${getPriceBadgeColor(property.price)}`}>
                      {property.price}
                    </span>
                    {property.garage && (
                      <span className="rounded-full bg-violet-500/30 px-2.5 py-0.5 text-xs font-medium text-violet-200">
                        Garage
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white">{property.propertyName}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-300">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {property.address}, {property.city}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-6 text-sm text-stone-200">
                  <span>{property.rooms} {property.rooms === 1 ? "room" : "rooms"}</span>
                  <span>{property.baths} {property.baths === 1 ? "bath" : "baths"}</span>
                  <span>Floor {property.floor}</span>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/30 text-sm font-bold text-white">
                    {property.fullName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-white">{property.fullName}</p>
                    <p className="text-xs text-stone-300">{property.email}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-stone-300/80">{property.phone}</p>
              </div>
            </div>
          </Link>

          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30 sm:-left-4"
            aria-label="Previous featured property"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30 sm:-right-4"
            aria-label="Next featured property"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-violet-400" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to featured property ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
