import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProgressTrackerClient from "@/components/progress-tracker-client";

export default async function ProgressTracker() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gradient-to-b from-indigo-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">
                Progress Tracker
              </h1>
              <p className="text-indigo-600">
                Track your entrepreneurship journey and achievements
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <ProgressTrackerClient />
        </div>
      </main>
    </>
  );
}
