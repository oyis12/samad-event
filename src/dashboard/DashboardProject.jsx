import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Skeleton, Empty } from "antd";

const DashboardProject = () => {
  const { BASE_URL } = useApp();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    icon: "📚",
    href: "",
    color: "from-blue-500 to-cyan-500",
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/project`).then((r) =>
        r.json()
      );
      const projectsArray = Array.isArray(response)
        ? response
        : response?.data || [];
      setProjects(projectsArray);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!BASE_URL) return;
    fetchProjects();
  }, [BASE_URL]);

  const handleSaveProject = () => {
    const payload = {
      ...projectForm,
      id: editingProject?.id ?? editingProject?._id ?? Date.now(),
    };
    if (editingProject) {
      setProjects((p) =>
        p.map((x) =>
          (x.id ?? x._id) === (editingProject.id ?? editingProject._id)
            ? payload
            : x
        )
      );
    } else {
      setProjects((p) => [payload, ...p]);
    }
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm({
      name: "",
      description: "",
      icon: "📚",
      href: "",
      color: "from-blue-500 to-cyan-500",
    });
  };

  const handleEditProject = (prj) => {
    setEditingProject(prj);
    setShowProjectForm(true);
    setProjectForm({
      name: prj.name ?? "",
      description: prj.description ?? "",
      icon: prj.icon ?? "📚",
      href: prj.href ?? "",
      color: prj.color ?? "from-blue-500 to-cyan-500",
    });
  };

  const handleDeleteProject = (id) => {
    setProjects((p) => p.filter((x) => (x.id ?? x._id) !== id));
  };

  const openNewForm = () => {
    setEditingProject(null);
    setProjectForm({
      name: "",
      description: "",
      icon: "📚",
      href: "",
      color: "from-blue-500 to-cyan-500",
    });
    setShowProjectForm(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Projects Management
        </h2>
        <button
          onClick={openNewForm}
          className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
        >
          + Add New Project
        </button>
      </div>

      {showProjectForm && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-extrabold text-slate-900">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Project Name
              </label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, description: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                rows="3"
                placeholder="Enter project description"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={projectForm.icon}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, icon: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="📚"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  URL
                </label>
                <input
                  type="text"
                  value={projectForm.href}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, href: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Gradient Color
              </label>
              <select
                value={projectForm.color}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, color: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                <option value="from-green-500 to-emerald-500">
                  Green to Emerald
                </option>
                <option value="from-purple-500 to-pink-500">
                  Purple to Pink
                </option>
                <option value="from-orange-500 to-red-500">Orange to Red</option>
                <option value="from-indigo-500 to-purple-500">
                  Indigo to Purple
                </option>
                <option value="from-yellow-500 to-orange-500">
                  Yellow to Orange
                </option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveProject}
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
              >
                {editingProject ? "Update Project" : "Add Project"}
              </button>
              <button
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                  setProjectForm({
                    name: "",
                    description: "",
                    icon: "📚",
                    href: "",
                    color: "from-blue-500 to-cyan-500",
                  });
                }}
                className="rounded-lg border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))
        ) : projects.length === 0 ? (
          <div className="col-span-full">
            <Empty description="No Projects Found" />
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id ?? project.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-4xl">{project.icon}</div>
              <h3 className="mb-2 text-lg font-extrabold text-slate-900">
                {project.name}
              </h3>
              <p className="mb-4 text-sm text-slate-600">
                {project.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-100"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteProject(project.id ?? project._id)
                  }
                  className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-all hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardProject;
