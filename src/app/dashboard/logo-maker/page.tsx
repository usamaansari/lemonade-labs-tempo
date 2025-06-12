import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoMakerClient from "@/components/logo-maker-client";

export default async function LogoMaker() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample shapes for logo creation
  const shapes = [
    { id: 1, name: "Circle", icon: "⚪" },
    { id: 2, name: "Square", icon: "⬛" },
    { id: 3, name: "Triangle", icon: "🔺" },
    { id: 4, name: "Star", icon: "⭐" },
    { id: 5, name: "Heart", icon: "❤️" },
    { id: 6, name: "Diamond", icon: "♦️" },
  ];

  // Sample color palettes
  const colorPalettes = [
    {
      id: 1,
      name: "Ocean",
      colors: ["#1A73E8", "#4285F4", "#8AB4F8", "#C2E7FF"],
    },
    {
      id: 2,
      name: "Forest",
      colors: ["#0F9D58", "#34A853", "#81C995", "#CEEAD6"],
    },
    {
      id: 3,
      name: "Sunset",
      colors: ["#EA4335", "#FBBC04", "#F29900", "#F6AE2D"],
    },
    {
      id: 4,
      name: "Berry",
      colors: ["#9C27B0", "#BA68C8", "#CE93D8", "#E1BEE7"],
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-700">Logo Maker</h1>
              <p className="text-green-600">
                Create a professional logo for your business
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <LogoMakerClient shapes={shapes} colorPalettes={colorPalettes} />
        </div>
      </main>
    </>
  );
}
