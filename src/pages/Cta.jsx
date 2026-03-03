import React from "react";

const Cta = () => {
  return (
    <section
      id="contribute"
      className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Join Our Community
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Whether you're interested in writing articles, taking photos,
            organizing events, or contributing in any other way, we welcome you
            to join our community.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
              href="#contact"
            >
              Get Started
            </a>
            <a
              className="rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
              href="#events"
            >
              View Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
