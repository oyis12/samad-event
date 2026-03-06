import React from "react";

const DashboardSettings = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Settings</h2>
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-extrabold text-slate-900">
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Site Title
              </label>
              <input
                type="text"
                defaultValue="Igala Wikimedia Community"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Site Description
              </label>
              <textarea
                defaultValue="A community dedicated to preserving and sharing Igala culture, language, and knowledge through Wikimedia projects."
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                rows="3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
