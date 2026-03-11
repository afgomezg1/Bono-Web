import PropertyDetailPage from "@/modules/properties/pages/PropertyDetailPage";

export default async function PropertyDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailPage propertyIndex={parseInt(id, 10)} />;
}
