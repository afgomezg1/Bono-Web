"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "@/modules/properties/types/property.type";
import { getPriceBadgeColor } from "@/modules/properties/ui/priceBadgeColor";

const CARD_IMAGES = [
  "/pexels-white-home.jpg",
  "/pexels-green-home.jpg",
  "/pexels-3.jpg",
  "/pexels-1.jpg",
  "/pexels-2.jpg",
  "/pexels-luis.jpg",
];

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const img = CARD_IMAGES[index % CARD_IMAGES.length];

  return (
    <Link href={`/properties/${index}`}>
      <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-900">
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={img}
            alt={property.propertyName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Price badge */}
          <div
            className={`absolute bottom-3 left-3 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-lg ${getPriceBadgeColor(property.price)}`}
          >
            {property.price}
            <span className="ml-1 text-[10px] font-normal opacity-80">/mo</span>
          </div>
          {/* Garage badge */}
          {property.garage && (
            <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-700 shadow dark:bg-stone-800/90 dark:text-stone-200">
              Garage
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-stone-900 line-clamp-1 group-hover:text-violet-600 dark:text-stone-100 dark:group-hover:text-violet-400">
            {property.propertyName}
          </h3>

          {/* Location */}
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="line-clamp-1">{property.address}, {property.city}</span>
          </div>

          {/* Stats */}
          <div className="mt-3 flex items-center gap-3 border-t border-stone-100 pt-3 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
            <div className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-violet-500" viewBox="0 0 512 512" fill="currentColor">
                <path d="M440 424V88h-88V13.005L88 58.522V424H16v32h86.9L352 490.358V120h56v336h88v-32Zm-120 29.642l-200-27.586V85.478L320 51Z" />
                <path d="M256 232h32v64h-32z" />
              </svg>
              <span>{property.rooms} {property.rooms === 1 ? "rm" : "rms"}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-sky-500" viewBox="0 0 640 640" fill="currentColor">
                <path d="M160 141.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9c-3.6 9.1-5.5 18.9-5.5 29.2c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0l104-104c9.4-9.4 9.4-24.6 0-33.9c-7.8-7.9-19.8-9.1-29-3.8c-14-12-32.1-19.2-52-19.2c-10.3 0-20.2 2-29.2 5.5l-14.9-15C213.4 72.1 193.7 64 173.3 64C130.6 64 96 98.6 96 141.3V320c-17.7 0-32 14.3-32 32s14.3 32 32 32v48c0 28.4 12.4 54 32 71.6V544c0 17.7 14.3 32 32 32s32-14.3 32-32v-16h256v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-40.4c19.6-17.6 32-43.1 32-71.6v-48c17.7 0 32-14.3 32-32s-14.3-32-32-32H160z" />
              </svg>
              <span>{property.baths} {property.baths === 1 ? "ba" : "ba"}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" />
              </svg>
              <span>Fl. {property.floor}</span>
            </div>
          </div>

          {/* Owner */}
          <div className="mt-3 flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              {property.fullName.split(" ").map((n) => n[0]).join("")}
            </div>
            <span>{property.fullName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
