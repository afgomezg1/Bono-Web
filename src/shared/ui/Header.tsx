import Image from "next/image";

interface HeaderProps {
  totalCount: number;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ totalCount, search, onSearchChange }: HeaderProps) {
  return (
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
          Camilo De<span className="text-violet-400">luxe Apartments</span>
        </h1>
        <p className="mt-2 max-w-xl text-lg text-stone-300">
          Find your perfect home among {totalCount} curated listings worldwide.
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border-0 bg-white/95 py-3.5 pl-12 pr-4 text-sm text-stone-900 shadow-lg placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-stone-800/95 dark:text-stone-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
