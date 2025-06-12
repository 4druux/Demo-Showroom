// app/admin/edit-product/[slug]/page.jsx
import React from "react";
import EditProduct from "@/layout/admin/product/EditProduct";

export const metadata = {
  title: "Edit Produk | Demo Showroom",
  description:
    "Halaman admin untuk merubah informasi produk di katalog showroom.",
};

export default function EditProductPage({ params }) {
  const { slug } = params;
  // Extract ID from the slug
  const productId = slug.substring(slug.lastIndexOf("-") + 1);

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <EditProduct productId={productId} />
    </div>
  );
}
