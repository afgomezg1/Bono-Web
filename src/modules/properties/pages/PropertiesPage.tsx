"use client";

import { useRouter } from "next/navigation";
import { useProperties } from "@/modules/properties/hooks/useProperties";
import PropertyCard from "@/modules/properties/ui/PropertyCard";
import { useState, useMemo } from "react";

export default function PropertiesPage() {
  const { properties, isLoading, error } = useProperties();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterGarage, setFilterGarage] = useState<
    "all" | "yes" | "no"
  >("all");
  const [sortPrice, setSortPrice] = useState<"none" | "asc" | "desc">("none");

  const parsePrice = (price: string) =>
    parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

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
      return matchesSearch && matchesGarage;
    });

    if (sortPrice !== "none") {
      result.sort((a, b) => {
        const diff = parsePrice(a.price) - parsePrice(b.price);
        return sortPrice === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [properties, search, filterGarage, sortPrice]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm text-zinc-500">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-red-700 dark:text-red-300">
            Error loading properties
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Properties
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {filtered.length} of {properties.length} properties
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name, city, or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
            <select
              value={filterGarage}
              onChange={(e) =>
                setFilterGarage(e.target.value as "all" | "yes" | "no")
              }
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="all">All (garage)</option>
              <option value="yes">With garage</option>
              <option value="no">Without garage</option>
            </select>
            <select
              value={sortPrice}
              onChange={(e) =>
                setSortPrice(e.target.value as "none" | "asc" | "desc")
              }
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="none">Sort by price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="h-16 w-16 text-zinc-300 dark:text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-zinc-700 dark:text-zinc-300">
              No properties found
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, index) => {
              const originalIndex = properties.indexOf(property);
              return (
                <PropertyCard
                  key={originalIndex}
                  property={property}
                  index={originalIndex}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
