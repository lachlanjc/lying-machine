"use client";
import Infographic from "@/components/Infographic";
import { Theme } from "@/utils/theme";

export default function Page() {
  const colorsEarth = [
    { name: "Global View", hex: "#3498db" },
    { name: "Satellite Image", hex: "#f1c40f" },
    { name: "Map Legend", hex: "#2ecc71" },
    { name: "Earthly Horizon", hex: "#e74c3c" },
    { name: "Geographic Grid", hex: "#8e44ad" },
    { name: "Atmospheric Haze", hex: "#2c3e50" },
  ];
  const colorsFracking = [
    { name: "Rocky Terrain", hex: "#964b00" },
    { name: "Drilling Fluid", hex: "#4a86e8" },
    { name: "Fracture Point", hex: "#ffcc00" },
    { name: "Geological Map", hex: "#2c343b" },
    { name: "Hydraulic Pressure", hex: "#13809f" },
    { name: "Wellhead", hex: "#8b9467" },
  ];
  const theme: Theme = { colors: colorsFracking, font: "monospaced" };

  return (
    <main className="h-full px-4 py-4">
      <Infographic theme={theme} />
    </main>
  );
}
