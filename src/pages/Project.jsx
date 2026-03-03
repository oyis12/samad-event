import React, { useState, useEffect } from "react";
import axios from "axios";

import { useApp } from "../context/AppContext";

const Project = () => {
  const { BASE_URL } = useApp();

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/project`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [BASE_URL]);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Our Wikimedia Projects
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We contribute to various Wikimedia projects to document and preserve
            Igala knowledge.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            return (
              <a
                key={project.id}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Project;
