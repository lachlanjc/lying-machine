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
  const themeFracking: Theme = { colors: colorsFracking, font: "monospaced" };
  const themeCharli: Theme = {
    colors: [
      { name: "Charli's Sunset", hex: "#ff9900" },
      { name: "Sassy Pink", hex: "#ff69b4" },
      { name: "Purple Reign", hex: "#7a288a" },
      { name: "Electric Blue", hex: "#00bfff" },
      { name: "Glamour Gold", hex: "#ffd700" },
      { name: "Vibrant Coral", hex: "#ff99cc" },
    ],
    font: "cursive",
    pattern:
      '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10-17h20v20H20V20zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" fill="#000" fill-rule="evenodd"/></svg>',
  };

  const themeLondonUnderground: Theme = {
    colors: [
      { name: "Gothic Arch", hex: "#333333" },
      { name: "Vintage Leather", hex: "#96477a" },
      { name: "Steam Powered", hex: "#a8d7f5" },
      { name: "London Fog", hex: "#7d9599" },
      { name: "Carriage Wood", hex: "#c2b280" },
      { name: "Neon Sign", hex: "#f7dc6f" },
    ],
    font: "serif",
  };

  return (
    <main className="gridded h-full">
      <Infographic theme={themeCharli} />
    </main>
  );
}
