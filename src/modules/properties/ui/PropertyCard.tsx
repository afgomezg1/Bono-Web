"use client";

import Link from "next/link";
import { Property } from "@/modules/properties/types/property.type";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <Link href={`/properties/${index}`}>
      <div className="group relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900">
        {/* Price badge */}
        <div className="absolute -top-3 right-4 rounded-full bg-emerald-600 px-4 py-1 text-sm font-bold text-white shadow-md">
          {property.price}
        </div>

        {/* Property name */}
        <h3 className="mt-2 text-lg font-semibold text-zinc-900 line-clamp-1 group-hover:text-emerald-600 dark:text-zinc-100">
          {property.propertyName}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <span>{property.city}</span>
        </div>

        {/* Address */}
        <p className="mt-1 text-xs text-zinc-400 line-clamp-1 dark:text-zinc-500">
          {property.address}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-4 border-t border-zinc-100 pt-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          {/* Rooms */}
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
            <span>
              {property.rooms} {property.rooms === 1 ? "room" : "rooms"}
            </span>
          </div>

          {/* Baths */}
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {property.baths} {property.baths === 1 ? "bath" : "baths"}
            </span>
          </div>

          {/* Floor */}
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15"
              />
            </svg>
            <span>Floor {property.floor}</span>
          </div>
        </div>

        {/* Garage badge */}
        <div className="mt-3 flex items-center gap-2">
          {property.garage ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-9V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V9M7.5 9h9"
                />
              </svg>
              Garage
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              No garage
            </span>
          )}
        </div>

        {/* Owner */}
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold dark:bg-emerald-900/40 dark:text-emerald-300">
            {property.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span>{property.fullName}</span>
        </div>
      </div>
    </Link>
  );
}
