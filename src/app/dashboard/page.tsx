import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle, BarChart3, DollarSign } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
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
      <main className="w-full bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-primary">
              Kids Entrepreneur Dashboard
            </h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Welcome to your entrepreneurship journey! Explore the tools
                below to start building your business.
              </span>
            </div>
          </header>

  {/* User Profile Section */}
  <section className="bg-white rounded-xl p-6 border shadow-sm mt-8">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Website Builder Card */}
            <Card className="border-2 border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-xl">
                <CardTitle className="text-xl">Website Builder</CardTitle>
                <CardDescription className="text-blue-100">
                  Create your own business website
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" x2="21" y1="9" y2="9"></line>
                    <line x1="9" x2="9" y1="21" y2="9"></line>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Drag-and-drop interface with pre-designed templates for kid
                  businesses like lemonade stands and craft stores.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/website-builder" className="w-full">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Start Building
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Logo Maker Card */}
            <Card className="border-2 border-green-300 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-t-xl">
                <CardTitle className="text-xl">Logo Maker</CardTitle>
                <CardDescription className="text-green-100">
                  Design your business logo
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" x2="9.01" y1="9" y2="9"></line>
                    <line x1="15" x2="15.01" y1="9" y2="9"></line>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Simple tool with shape libraries, text options, and color
                  palettes designed for children to create logos.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/logo-maker" className="w-full">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Create Logo
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Poster Designer Card */}
            <Card className="border-2 border-purple-300 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-t-xl">
                <CardTitle className="text-xl">Poster Designer</CardTitle>
                <CardDescription className="text-purple-100">
                  Make eye-catching posters
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                  >
                    <path d="M12 3v12"></path>
                    <path d="m8 11 4 4 4-4"></path>
                    <path d="M8 5h8"></path>
                    <path d="M20 19h-8a2 2 0 0 1-2-2V5"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Canva-like interface with templates for promotional materials,
                  featuring kid-friendly stock images.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/poster-designer" className="w-full">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    Design Poster
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Learning Module Card */}
            <Card className="border-2 border-orange-300 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-t-xl">
                <CardTitle className="text-xl">Learning Module</CardTitle>
                <CardDescription className="text-orange-100">
                  Learn entrepreneurship basics
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange-500"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Interactive lessons about entrepreneurship basics integrated
                  throughout the creation process.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/learning" className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Start Learning
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Digital Piggy Bank Card */}
            <Card className="border-2 border-yellow-300 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-t-xl">
                <CardTitle className="text-xl">Digital Piggy Bank</CardTitle>
                <CardDescription className="text-yellow-100">
                  Manage your business finances
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                 
                  <DollarSign size={64} className="text-yellow-500" />

                </div>
                <p className="text-sm text-gray-600">
                 Quickbook like interface with templates for managing money,
                  featuring kid-friendly finances management.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/digital-piggy-bank" className="w-full">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                   Digital Piggy Bank
                  </Button>
                </Link>
              </CardFooter>
            </Card>


            {/* Progress Tracking Card */}
            <Card className="border-2 border-indigo-300 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-t-xl">
                <CardTitle className="text-xl">My Progress</CardTitle>
                <CardDescription className="text-indigo-100">
                  Track your entrepreneurship journey
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 size={64} className="text-indigo-500" />
                </div>
                <p className="text-sm text-gray-600">
                  View your completed projects, learning progress, and earned
                  badges all in one place.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/progress" className="w-full">
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                    View Progress
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </section>

        
        </div>
      </main>
    </>
  );
}
