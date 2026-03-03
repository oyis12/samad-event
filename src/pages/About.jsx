import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              About Our Community
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              The Igala Wikimedia Community is a vibrant group of volunteers
              dedicated to documenting and preserving Igala culture, language,
              and knowledge on Wikimedia projects. We work together to create
              content that celebrates our heritage and makes it accessible to
              the world.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                  <svg
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Cultural Preservation
                  </h3>
                  <p className="mt-1 text-slate-600">
                    We document Igala traditions, history, and cultural
                    practices for future generations.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                  <svg
                    className="h-6 w-6 text-purple-600"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Knowledge Sharing
                  </h3>
                  <p className="mt-1 text-slate-600">
                    We create and improve Wikipedia articles, upload media to
                    Commons, and contribute to various Wikimedia projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Community Building
                  </h3>
                  <p className="mt-1 text-slate-600">
                    We organize events, workshops, and training sessions to grow
                    our community and empower contributors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="sticky top-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-extrabold text-white">
                    Our Mission
                  </div>
                  <p className="mt-2 text-white/90">
                    To preserve and share Igala culture, language, and knowledge
                    through open collaboration on Wikimedia projects.
                  </p>
                </div>
                <div className="h-px bg-white/20"></div>
                <div>
                  <div className="text-3xl font-extrabold text-white">
                    Our Vision
                  </div>
                  <p className="mt-2 text-white/90">
                    A world where Igala knowledge is freely accessible,
                    well-documented, and celebrated globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
