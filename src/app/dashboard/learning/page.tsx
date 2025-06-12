import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LearningModuleClient from "@/components/learning-module-client";

export default async function LearningModule() {
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
      <main className="w-full bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-orange-700">
                Learning Module
              </h1>
              <p className="text-orange-600">
                Learn entrepreneurship skills through interactive lessons and
                quizzes
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <LearningModuleClient />
        </div>
      </main>
    </>
  );
}
