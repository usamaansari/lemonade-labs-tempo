import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WebsiteBuilderClient from "@/components/website-builder-client";

export default async function WebsiteBuilder() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample website templates
  const templates = [
    {
      id: 1,
      name: "Lemonade Stand",
      description: "Perfect for selling refreshing drinks",
      image:
        "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80",
      color: "yellow",
    },
    {
      id: 2,
      name: "Craft Store",
      description: "Showcase your handmade creations",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80",
      color: "blue",
    },
    {
      id: 3,
      name: "Pet Services",
      description: "For dog walking or pet sitting businesses",
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
      color: "green",
    },
    {
      id: 4,
      name: "Tutoring",
      description: "Help others learn and grow",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80",
      color: "purple",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-700">
                Website Builder
              </h1>
              <p className="text-blue-600">
                Create your own business website with our easy-to-use templates
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <WebsiteBuilderClient templates={templates} />
        </div>
      </main>
    </>
  );
}
