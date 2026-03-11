"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProperty } from "@/modules/properties/hooks/useProperty";
import { getPriceBadgeColor } from "@/modules/properties/ui/priceBadgeColor";

const HERO_IMAGES = [
  "/pexels-city.jpg",
  "/pexels-green-home.jpg",
  "/pexels-white-home.jpg",
];

interface PropertyDetailPageProps {
  propertyIndex: number;
}

export default function PropertyDetailPage({ propertyIndex }: PropertyDetailPageProps) {
  const { property, isLoading, error } = useProperty(propertyIndex);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          <p className="text-sm font-medium text-stone-500">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">Property not found</h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error || "The requested property does not exist."}</p>
          <button
            onClick={() => router.push("/properties")}
            className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Back to properties
          </button>
        </div>
      </div>
    );
  }

  const heroImage = HERO_IMAGES[propertyIndex % HERO_IMAGES.length];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero image */}
      <div className="relative h-72 sm:h-96">
        <Image src={heroImage} alt={property.propertyName} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />

        {/* Back button overlay */}
        <button
          onClick={() => router.push("/properties")}
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/30 sm:left-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white sm:text-4xl">{property.propertyName}</h1>
                <p className="mt-1 flex items-center gap-1.5 text-stone-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {property.address}, {property.city}
                </p>
              </div>
              <div className={`rounded-xl px-5 py-3 text-center shadow-lg ${getPriceBadgeColor(property.price)}`}>
                <p className="text-2xl font-bold text-white">{property.price}</p>
                <p className="text-xs text-white/80">per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <svg className="mx-auto h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">{property.rooms}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">{property.rooms === 1 ? "Room" : "Rooms"}</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <svg className="mx-auto h-6 w-6 text-blue-600" viewBox="0 0 640 640" fill="currentColor">
              <path d="M160 141.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9c-3.6 9.1-5.5 18.9-5.5 29.2c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0l104-104c9.4-9.4 9.4-24.6 0-33.9c-7.8-7.9-19.8-9.1-29-3.8c-14-12-32.1-19.2-52-19.2c-10.3 0-20.2 2-29.2 5.5l-14.9-15C213.4 72.1 193.7 64 173.3 64C130.6 64 96 98.6 96 141.3V320c-17.7 0-32 14.3-32 32s14.3 32 32 32v48c0 28.4 12.4 54 32 71.6V544c0 17.7 14.3 32 32 32s32-14.3 32-32v-16h256v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-40.4c19.6-17.6 32-43.1 32-71.6v-48c17.7 0 32-14.3 32-32s-14.3-32-32-32H160z" />
            </svg>
            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">{property.baths}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">{property.baths === 1 ? "Bathroom" : "Bathrooms"}</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <svg className="mx-auto h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" />
            </svg>
            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">{property.floor}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Floor</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <svg className={`mx-auto h-6 w-6 ${property.garage ? "text-emerald-600" : "text-stone-400"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-9V6.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V9M7.5 9h9" />
            </svg>
            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">{property.garage ? "Yes" : "No"}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Garage</p>
          </div>
        </div>

        {/* Owner / Contact + Map */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Owner / Contact</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  {property.fullName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{property.fullName}</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Property Owner</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Email</p>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{property.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Phone</p>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{property.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Location</h2>
            <div className="mt-4 overflow-hidden rounded-xl">
              <iframe
                title={`Map of ${property.propertyName}`}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01}%2C${property.latitute - 0.01}%2C${property.longitude + 0.01}%2C${property.latitute + 0.01}&layer=mapnik&marker=${property.latitute}%2C${property.longitude}`}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                <span className="font-medium text-stone-700 dark:text-stone-300">Full address:</span>{" "}
                {property.address}, {property.city}
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500">
                {property.latitute.toFixed(4)}, {property.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
