import React, { Suspense } from "react";
import AllProducts from "@/layout/admin/product/AllProduct";
import DotLoader from "@/components/common/DotLoader";

export const metadata = {
  title: "Katalog Produk | Demo Showroom",
  description:
    "Halaman untuk melihat dan mengelola semua produk yang tersedia di showroom.",
};

export default function AllProductsPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <DotLoader dotSize="w-5 h-5" />
          </div>
        }
      >
        <AllProducts />
      </Suspense>
    </div>
  );
}
