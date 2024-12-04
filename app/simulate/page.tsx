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
      { name: "Electric Popstar", hex: "#ff69b4" },
      { name: "Glittering Gold Rush", hex: "#ffd700" },
      { name: "Retro Arcade Frenzy", hex: "#3366cc" },
      { name: "Dance Floor Disco", hex: "#ff0033" },
      { name: "Smash Hit Success", hex: "#33cc33" },
      { name: "Vibrant Mosiac", hex: "#ffcc00" },
    ],
    font: "cursive",
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
      <Infographic theme={themeLondonUnderground} />
    </main>
  );
}
