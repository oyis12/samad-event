import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const StatCard = ({ label, value, icon, color }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}
    >
      {icon}
    </div>
    <div className="mt-3">
      <div className="text-sm font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const { BASE_URL } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    contributors: 0,
    articles: 0,
    mediaFiles: 0,
    events: 0,
  });

  useEffect(() => {
    if (!BASE_URL) return;
    fetch(`${BASE_URL}/event`)
      .then((r) => r.json())
      .then((d) => setEvents(Array.isArray(d) ? d : d?.data || []))
      .catch(() => {});
    fetch(`${BASE_URL}/project`)
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : d?.data || []))
      .catch(() => {});
    fetch(`${BASE_URL}/stats`)
      .then((r) => r.json())
      .then((d) => setStats(d || stats))
      .catch(() => {});
  }, []);

  const participantsFPI = "/logo.jfif";
  const imageMap = {};

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Events"
          value={events.length}
          icon="📅"
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          label="Total Projects"
          value={projects.length}
          icon="🚀"
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          label="Active Contributors"
          value={stats.contributors}
          icon="👥"
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          label="Wikipedia Articles"
          value={stats.articles}
          icon="📚"
          color="from-orange-500 to-red-500"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-extrabold text-slate-900">
            Recent Events
          </h3>
          <div className="space-y-3">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id ?? event._id}
                className="flex items-center gap-3 rounded-lg border border-slate-100 p-3"
              >
                <img
                  src={
                    event.imageSrc ||
                    imageMap[event.imageKey] ||
                    participantsFPI
                  }
                  alt={event.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900 line-clamp-1">
                    {event.name}
                  </div>
                  <div className="text-xs text-slate-500">Event</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-extrabold text-slate-900">
            Recent Projects
          </h3>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id ?? project._id}
                className="flex items-center gap-3 rounded-lg border border-slate-100 p-3"
              >
                <div className="text-2xl">{project.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">
                    {project.name}
                  </div>
                  <div className="text-xs text-slate-500">Project</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
