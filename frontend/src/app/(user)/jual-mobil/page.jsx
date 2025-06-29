import React, { Suspense } from "react";
import SellCar from "@/layout/user/jual-mobil/SellCar";
import CarouselGlobal from "@/components/product-user/CarouselGlobal";
import SellBedge from "@/layout/user/jual-mobil/SellBedge";
import SellAccordion from "@/layout/user/jual-mobil/SellAccordion";
import DotLoader from "@/components/common/DotLoader";

export const metadata = {
  title: "Jual Mobil | Demo Showroom",
  description:
    "Jual mobil lama Anda dengan mudah, cepat, dan aman melalui Demo Showroom. Tanpa ribet, tanpa tipu-tipu.",
};

const SellCarPage = () => {
  return (
    <div className="min-h-screen">
      <CarouselGlobal
        imageUrl="/images/Carousel/placeholder-banner.webp"
        imageAlt="Jual Mobil Cepat dan Aman"
        title="Jual Mobil Cepat Laku & Aman"
        subtitle="Bebas Drama & Tipu-Tipu"
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <DotLoader dotSize="w-5 h-5" />
          </div>
        }
      >
        <SellCar />
      </Suspense>
      <div className="px-4 lg:px-0 space-y-8 lg:space-y-16">
        <SellBedge />
        <SellAccordion />
      </div>
    </div>
  );
};

export default SellCarPage;
