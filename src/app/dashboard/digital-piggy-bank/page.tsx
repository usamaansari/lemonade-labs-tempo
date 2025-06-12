import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DigitalPiggyBankClient from "@/components/digital-piggy-bank-client";

export default async function DigitalPiggyBank() {
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
      <main className="w-full bg-gradient-to-b from-yellow-50 to-yellow-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-700">
                Digital Piggy Bank
              </h1>
              <p className="text-yellow-600">
                Track your savings and learn financial management
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <DigitalPiggyBankClient />
        </div>
      </main>
    </>
  );
}
