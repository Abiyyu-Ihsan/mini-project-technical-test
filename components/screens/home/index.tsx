import LayoutDashboardView from "@components/layouts/LayoutMain";
import React from "react";
import SectionBannerScreen from "./SectionBannerScreen";
import SectionProductScreen from "./SectionProductScreen";

export default function HomeView() {
  return (
    <LayoutDashboardView>
      <SectionBannerScreen />
      <SectionProductScreen />
    </LayoutDashboardView>
  );
}
