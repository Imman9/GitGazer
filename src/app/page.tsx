"use client"; // ✅ Needed because we are using useSession & useRouter

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthButton from "@/components/AuthButton";

const features = [
  {
    title: "Github OAuth",
    description:
      "Connect easily and securely with your GitHub account using OAuth for seamless access to your developer analytics.",
    icon: "githubAuth.jpg",
  },
  {
    title: "Commit Insights",
    description:
      "Receive tailored recommendations to enhance your productivity and code quality based on your unique coding patterns.",
    icon: "insights.jpg",
  },
  {
    title: "Gamified Experience",
    description:
      "Boost your coding motivation with our gamified experience, turning your development journey into an engaging adventure.",
    icon: "gamified.jpg",
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  //  Redirect authenticated users to /dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <img src="git.png" alt="" className="h-17" />
        <AuthButton />
      </header>
      <main className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-50">
        <div className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Welcome to GitGazer
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Developer Analytics Reimagined
          </p>
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition">
            Get Started
          </button>
        </div>
      </main>

      {/* Features */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What GitGazer Offers
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Explore the powerful features designed to enhance your coding
              experience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/30 hover:border-indigo-400 transition"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg border border-gray-600">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="bg-gray-900 text-white py-6 text-center">
          <p>&copy; 2024 GitGazer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
