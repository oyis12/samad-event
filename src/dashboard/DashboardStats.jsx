import React from "react";
import { useApp } from "../context/AppContext";

const DashboardStats = () => {
  const { BASE_URL } = useApp();
  const [stats, setStats] = React.useState({
    contributors: 0,
    articles: 0,
    mediaFiles: 0,
    events: 0,
  });

  React.useEffect(() => {
    if (!BASE_URL) return;
    fetch(`${BASE_URL}/stats`)
      .then((r) => r.json())
      .then((d) =>
        setStats(
          d || {
            contributors: 0,
            articles: 0,
            mediaFiles: 0,
            events: 0,
          }
        )
      )
      .catch(() => {});
  }, [BASE_URL]);

  const updateStat = (field, value) => {
    const updated = { ...stats, [field]: value };
    setStats(updated);
    if (!BASE_URL) return;
    fetch(`${BASE_URL}/stats`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch((err) => console.error("Failed to update stats", err));
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";
  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div>
      <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
        Statistics Management
      </h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Active Contributors</label>
            <input
              type="text"
              value={stats.contributors}
              onChange={(e) => updateStat("contributors", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Wikipedia Articles</label>
            <input
              type="text"
              value={stats.articles}
              onChange={(e) => updateStat("articles", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Media Files</label>
            <input
              type="text"
              value={stats.mediaFiles}
              onChange={(e) => updateStat("mediaFiles", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Community Events</label>
            <input
              type="text"
              value={stats.events}
              onChange={(e) => updateStat("events", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
