// app/admin/car-details/[slug]/page.jsx
import React from "react";
import CarDetails from "@/layout/admin/product/CarDetails";

export const metadata = {
  title: "Detail Mobil | Demo Showroom",
  description: "Halaman admin untuk melihat detail mobil yang dipilih.",
};

export default async function CarDetailspage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const productId = slug.substring(slug.lastIndexOf("-") + 1);

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <CarDetails productId={productId} />
    </div>
  );
}
