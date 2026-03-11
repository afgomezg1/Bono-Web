export function getPriceBadgeColor(price: string): string {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

  if (numericPrice < 1500) {
    return "bg-emerald-500";
  } else if (numericPrice < 2500) {
    return "bg-teal-500";
  } else if (numericPrice < 3500) {
    return "bg-amber-500";
  } else if (numericPrice < 4500) {
    return "bg-orange-500";
  } else {
    return "bg-rose-500";
  }
}
