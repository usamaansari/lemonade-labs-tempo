import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PosterDesignerClient from "@/components/poster-designer-client";

export default async function PosterDesigner() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample poster templates
  const templates = [
    {
      id: 1,
      name: "Grand Opening",
      description: "Announce your new business",
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=500&q=80",
      color: "purple",
    },
    {
      id: 2,
      name: "Special Sale",
      description: "Promote your products on sale",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&q=80",
      color: "red",
    },
    {
      id: 3,
      name: "Event Announcement",
      description: "Invite people to your event",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80",
      color: "blue",
    },
    {
      id: 4,
      name: "Product Showcase",
      description: "Highlight your best products",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      color: "green",
    },
  ];

  // Sample stock images
  const stockImages = [
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=200&q=80",
    "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=200&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=200&q=80",
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-purple-700">
                Poster Designer
              </h1>
              <p className="text-purple-600">
                Create eye-catching posters for your business
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <PosterDesignerClient
            templates={templates}
            stockImages={stockImages}
          />
        </div>
      </main>
    </>
  );
}
