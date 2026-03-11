"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProperties } from "@/modules/properties/hooks/useProperties";
import PropertyCard from "@/modules/properties/ui/PropertyCard";
import FeaturedCarousel from "@/modules/properties/ui/FeaturedCarousel";
import { useState, useMemo } from "react";

export default function PropertiesPage() {
  const { properties, isLoading, error } = useProperties();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterGarage, setFilterGarage] = useState<"all" | "yes" | "no">("all");
  const [sortPrice, setSortPrice] = useState<"none" | "asc" | "desc">("none");
  const [filterRooms, setFilterRooms] = useState<string>("all");
  const [filterBaths, setFilterBaths] = useState<string>("all");
  const [filterFloor, setFilterFloor] = useState<string>("all");

  const parsePrice = (price: string) =>
    parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

  const roomOptions = useMemo(() => {
    const set = new Set(properties.map((p) => p.rooms));
    return Array.from(set).sort((a, b) => a - b);
  }, [properties]);

  const bathOptions = useMemo(() => {
    const set = new Set(properties.map((p) => p.baths));
    return Array.from(set).sort((a, b) => a - b);
  }, [properties]);

  const floorOptions = useMemo(() => {
    const set = new Set(properties.map((p) => p.floor));
    return Array.from(set).sort((a, b) => a - b);
  }, [properties]);

  const filtered = useMemo(() => {
    const result = properties.filter((p) => {
      const matchesSearch =
        p.propertyName.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.fullName.toLowerCase().includes(search.toLowerCase());
      const matchesGarage =
        filterGarage === "all" ||
        (filterGarage === "yes" && p.garage) ||
        (filterGarage === "no" && !p.garage);
      const matchesRooms =
        filterRooms === "all" || p.rooms === parseInt(filterRooms);
      const matchesBaths =
        filterBaths === "all" || p.baths === parseInt(filterBaths);
      const matchesFloor =
        filterFloor === "all" || p.floor === parseInt(filterFloor);
      return matchesSearch && matchesGarage && matchesRooms && matchesBaths && matchesFloor;
    });

    if (sortPrice !== "none") {
      result.sort((a, b) => {
        const diff = parsePrice(a.price) - parsePrice(b.price);
        return sortPrice === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [properties, search, filterGarage, sortPrice, filterRooms, filterBaths, filterFloor]);

  const activeFilterCount = [filterGarage, filterRooms, filterBaths, filterFloor, sortPrice].filter(
    (v) => v !== "all" && v !== "none"
  ).length;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          <p className="text-sm font-medium text-stone-500">Discovering properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-red-700 dark:text-red-300">Error loading properties</h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectClasses =
    "rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/pexels-city.jpg"
            alt="Skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Luxe <span className="text-violet-400">Apartments</span>
          </h1>
          <p className="mt-2 max-w-xl text-lg text-stone-300">
            Find your perfect home among {properties.length} curated listings worldwide.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, city, or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border-0 bg-white/95 py-3.5 pl-12 pr-4 text-sm text-stone-900 shadow-lg placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-stone-800/95 dark:text-stone-100"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filters bar */}
      <div className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-stone-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </div>

          <select value={filterRooms} onChange={(e) => setFilterRooms(e.target.value)} className={selectClasses}>
            <option value="all">Rooms</option>
            {roomOptions.map((r) => (
              <option key={r} value={r}>{r} {r === 1 ? "room" : "rooms"}</option>
            ))}
          </select>

          <select value={filterBaths} onChange={(e) => setFilterBaths(e.target.value)} className={selectClasses}>
            <option value="all">Baths</option>
            {bathOptions.map((b) => (
              <option key={b} value={b}>{b} {b === 1 ? "bath" : "baths"}</option>
            ))}
          </select>

          <select value={filterFloor} onChange={(e) => setFilterFloor(e.target.value)} className={selectClasses}>
            <option value="all">Floor</option>
            {floorOptions.map((f) => (
              <option key={f} value={f}>Floor {f}</option>
            ))}
          </select>

          <select
            value={filterGarage}
            onChange={(e) => setFilterGarage(e.target.value as "all" | "yes" | "no")}
            className={selectClasses}
          >
            <option value="all">Garage</option>
            <option value="yes">With garage</option>
            <option value="no">Without garage</option>
          </select>

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value as "none" | "asc" | "desc")}
            className={selectClasses}
          >
            <option value="none">Sort by price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setFilterRooms("all");
                setFilterBaths("all");
                setFilterFloor("all");
                setFilterGarage("all");
                setSortPrice("none");
              }}
              className="shrink-0 text-xs font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Featured carousel */}
      {properties.length > 0 && <FeaturedCarousel properties={properties} />}

      {/* Results */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Showing <span className="font-semibold text-stone-900 dark:text-stone-100">{filtered.length}</span> of{" "}
            <span className="font-semibold text-stone-900 dark:text-stone-100">{properties.length}</span> properties
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Image src="/pexels-white-home.jpg" alt="No results" width={200} height={140} className="rounded-2xl object-cover opacity-60" />
            <h3 className="mt-6 text-lg font-medium text-stone-700 dark:text-stone-300">No properties found</h3>
            <p className="mt-1 text-sm text-stone-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => {
              const originalIndex = properties.indexOf(property);
              return (
                <PropertyCard key={originalIndex} property={property} index={originalIndex} />
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-stone-400 sm:px-6 lg:px-8">
          <p className="font-medium text-stone-600 dark:text-stone-300">Luxe Apartments</p>
          <p className="mt-1">Find your dream home, anywhere in the world.</p>
        </div>
      </footer>
    </div>
  );
}
