import React, { Suspense } from "react";
import BuyCar from "@/layout/user/beli/BuyCar";
import Testimoni from "@/components/product-user/Testimoni";
import BuyAccordion from "@/layout/user/beli/BuyAccordion";
import NotifyMeForm from "@/components/product-user/NotifyMeForm";
import DotLoader from "@/components/common/DotLoader";

export const metadata = {
  title: "Beli Mobil | Demo Showroom",
  description:
    "Jelajahi pilihan mobil terbaik yang tersedia di Demo Showroom dan temukan yang sesuai kebutuhan Anda.",
};

const CarShopPage = () => {
  return (
    <div className="container mx-auto">
      <div className="md:pt-5 lg:pt-10 border-t-2 border-gray-200">
        <div className="space-y-4 md:space-y-16 mt-4 md:mt-0">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen bg-gray-50">
                <DotLoader dotSize="w-5 h-5" />
              </div>
            }
          >
            <BuyCar />
          </Suspense>
          <Testimoni />
          <div
            id="notify-me-form-section"
            className="scroll-mt-20 md:scroll-mt-24"
          >
            <NotifyMeForm />
          </div>
          <BuyAccordion />
        </div>
      </div>
    </div>
  );
};

export default CarShopPage;
