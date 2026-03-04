import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { Button, Skeleton } from "antd";

const DashboardProject = () => {
  const { BASE_URL } = useApp();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/project`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <Button type="primary">Add Project</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? // 👇 Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            ))
          : projects.map((project) => (
              <a
                key={project._id || project.id}
                href={project.href}
                target={
                  project.href?.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  project.href?.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 transition-opacity group-hover:opacity-5`}
                ></div>

                <div className="relative">
                  <div className="mb-4 text-4xl">{project.icon}</div>

                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                    Learn more
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
};

export default DashboardProject;