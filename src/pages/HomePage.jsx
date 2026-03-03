import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Skeleton } from "antd";

// Events on the homepage are loaded from the backend API (no hard-coded defaults).
const defaultEvents = [];

const defaultStats = {
  contributors: "0",
  articles: "0",
  mediaFiles: "0",
  events: "0",
};

const defaultProjects = [];

function HomePage() {
  const [events, setEvents] = useState(defaultEvents);
  const [stats, setStats] = useState(defaultStats);
  const [projects, setProjects] = useState(defaultProjects);
  const { BASE_URL } = useApp();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [eventsRes, statsRes, projectsRes] = await Promise.all([
          fetch(`${BASE_URL}/event`),
          fetch(`${BASE_URL}/stats`),
          fetch(`${BASE_URL}/project`),
        ]);

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (Array.isArray(eventsData)) setEvents(eventsData);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData && typeof statsData === "object") {
            setStats({ ...defaultStats, ...statsData });
          }
        }

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          if (Array.isArray(projectsData)) setProjects(projectsData);
        }
      } catch (e) {
        console.error("Failed to load content from API", e);
      } finally {
        setLoading(false); // ✅ stop loading (runs even if error happens)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        <div className="relative container-page py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 flex items-center justify-center">
              <span className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                </span>
                Preserving Igala Culture & Language
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Welcome to the{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Igala Wikimedia
              </span>{" "}
              Community
            </h1>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
              We are a community dedicated to preserving and sharing Igala
              culture, language, and knowledge through Wikimedia projects. Join
              us in documenting the rich heritage of the Igala people.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-2xl shadow-white/10 transition-all hover:scale-105 hover:shadow-white/20"
                href="#contribute"
              >
                <span className="relative z-10">Get Involved</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </a>
              <a
                className="rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
                href="/events"
              >
                Explore Events
              </a>
            </div>

            {/* Community Stats */}
            <dl className="mt-20 grid grid-cols-2 gap-6 text-left sm:grid-cols-4">
              <Stat
                label="Active Contributors"
                value={stats.contributors}
                icon={
                  <svg
                    className="h-6 w-6 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                }
              />
              <Stat
                label="Wikipedia Articles"
                value={stats.articles}
                icon={
                  <svg
                    className="h-6 w-6 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                }
              />
              <Stat
                label="Media Files"
                value={stats.mediaFiles}
                icon={
                  <svg
                    className="h-6 w-6 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
              <Stat
                label="Community Events"
                value={stats.events}
                icon={
                  <svg
                    className="h-6 w-6 text-white/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start gap-4">
        {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
        <div className="flex-1">
          <div className="text-2xl font-extrabold tracking-tight text-white">
            {value}
          </div>
          <div className="mt-1.5 text-xs font-semibold text-white/70 leading-relaxed">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
