import { useState, useEffect } from 'react'
import { useApp } from "./context/AppContext";
import { Skeleton } from "antd";
// Import images from assets folder
// import flyerKSP from './assets/Flyer_for_outreach_program_in_Kogi_State_Polytechnic_Lokoja.jpg'
// import outreachFPI from './assets/Igala_Wikidedia_Outreach_in_Fpi.jpg'
// import outreachKSP1 from './assets/Igala_Wikipedia_outreach_at_Kogi_State_Polytechnic_01.jpg'
// import outreachKSP2 from './assets/Igala_Wikipedia_Outreach_at_KSP_Lokoja_01.jpg'
// import outreachKSP3 from './assets/Igala_Wikipedia_Outreach_at_KSP_Lokoja_02.jpg'
// import participantsFPI from './assets/Participants_at_FPI_outreach.jpg'
// import outreachFederalPoly from './assets/Wikipedia_Outreach_in_Federal_Polytech_Idah.jpg'
// import trainingFPI from './assets/Wikipedia_Training_session_at_FPI.jpg'
// import trainingKSP from './assets/Igala_Wikipedia_Outreach_at_KSP_Lokoja_01.jpg'

// Shared image map so we can store simple keys in localStorage
// const imageMap = {
//   flyerKSP,
//   outreachFPI,
//   outreachKSP1,
//   outreachKSP2,
//   outreachKSP3,
//   participantsFPI,
//   outreachFederalPoly,
//   trainingFPI,
//   trainingKSP,
// }


// Events on the homepage are loaded from the backend API (no hard-coded defaults).
const defaultEvents = []

const defaultStats = {
  contributors: '0',
  articles: '0',
  mediaFiles: '0',
  events: '0',
}

const defaultProjects = []

function HomePage() {
  const [events, setEvents] = useState(defaultEvents)
  const [stats, setStats] = useState(defaultStats)
  const [projects, setProjects] = useState(defaultProjects)
const {BASE_URL} = useApp()
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
      {/* Header with Sticky Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="container-page">
          <nav className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/logo.jfif"
                  alt="Igala Wikimedia Community logo"
                  className="h-12 w-auto rounded-xl object-contain shadow-lg ring-2 ring-indigo-100"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Igala Wikimedia
                </span>
                <span className="text-xs font-medium text-slate-500">Community</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Events', href: '#events' },
                { label: 'Contribute', href: '#contribute' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <a
                className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md sm:inline-flex"
                href="#projects"
              >
                Our Projects
              </a>
              <a
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105"
                href="#contribute"
              >
                Join Us
              </a>
            </div>
          </nav>
        </div>
      </header>

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
              Welcome to the{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Igala Wikimedia
              </span>{' '}
              Community
            </h1>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
              We are a community dedicated to preserving and sharing Igala culture, language, and
              knowledge through Wikimedia projects. Join us in documenting the rich heritage of the
              Igala people.
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
                  <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <svg className="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <main>
        {/* Events Section */}
        <section id="events" className="py-20 sm:py-28">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Events and Activities
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Discover the vibrant activities and events happening in the Igala Wikimedia Community.
                Join us in celebrating and preserving our rich cultural heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <DemoCard
                  key={event.id ?? event.name}
                  id={event.id ?? index + 1}
                  name={event.name}
                  image={event.imageSrc || event.image || 'https://placehold.co/600x400/f1f5f9/64748b?text=Event'}
                  description={event.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  About Our Community
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  The Igala Wikimedia Community is a vibrant group of volunteers dedicated to
                  documenting and preserving Igala culture, language, and knowledge on Wikimedia
                  projects. We work together to create content that celebrates our heritage and
                  makes it accessible to the world.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Cultural Preservation</h3>
                      <p className="mt-1 text-slate-600">
                        We document Igala traditions, history, and cultural practices for future generations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Knowledge Sharing</h3>
                      <p className="mt-1 text-slate-600">
                        We create and improve Wikipedia articles, upload media to Commons, and contribute to various Wikimedia projects.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                      <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Community Building</h3>
                      <p className="mt-1 text-slate-600">
                        We organize events, workshops, and training sessions to grow our community and empower contributors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="sticky top-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div>
                      <div className="text-3xl font-extrabold text-white">Our Mission</div>
                      <p className="mt-2 text-white/90">
                        To preserve and share Igala culture, language, and knowledge through open collaboration on Wikimedia projects.
                      </p>
                    </div>
                    <div className="h-px bg-white/20"></div>
                    <div>
                      <div className="text-3xl font-extrabold text-white">Our Vision</div>
                      <p className="mt-2 text-white/90">
                        A world where Igala knowledge is freely accessible, well-documented, and celebrated globally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 sm:py-28">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Our Wikimedia Projects
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We contribute to various Wikimedia projects to document and preserve Igala knowledge.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contribute" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 sm:py-28">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Join Our Community
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                Whether you're interested in writing articles, taking photos, organizing events, or
                contributing in any other way, we welcome you to join our community.
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
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="container-page py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.jfif"
                  alt="Igala Wikimedia Community logo"
                  className="h-10 w-auto rounded-lg object-contain ring-2 ring-slate-100"
                />
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  Igala Wikimedia
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600 mb-4">
                A community dedicated to preserving and sharing Igala culture, language, and
                knowledge through Wikimedia projects.
              </p>
              <div className="flex gap-3">
                {[
                  { href: 'https://meta.wikimedia.org', label: 'Wikimedia Meta', icon: 'W' },
                  { href: 'https://twitter.com', label: 'Twitter', icon: 'T' },
                  { href: 'https://facebook.com', label: 'Facebook', icon: 'F' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    aria-label={social.label}
                  >
                    <span className="text-xs font-semibold">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Community Links */}
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 mb-4">Community</h3>
              <ul className="space-y-3">
                {['About Us', 'Our Projects', 'Contribute', 'Events', 'Members'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wikimedia Projects */}
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 mb-4">Wikimedia Projects</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Igala Wikipedia', href: 'https://ig.wikipedia.org' },
                  { name: 'Wikimedia Commons', href: 'https://commons.wikimedia.org' },
                  { name: 'Wikidata', href: 'https://wikidata.org' },
                  { name: 'Wiktionary', href: 'https://wiktionary.org' },
                  { name: 'Wikisource', href: 'https://wikisource.org' },
                ].map((project) => (
                  <li key={project.name}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Documentation', href: '#docs' },
                  { name: 'Guidelines', href: '#guidelines' },
                  { name: 'Contact Us', href: '#contact' },
                  { name: 'Privacy Policy', href: '#privacy' },
                  { name: 'Terms of Use', href: 'https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use' },
                ].map((resource) => (
                  <li key={resource.name}>
                    <a
                      href={resource.href}
                      target={resource.href.startsWith('http') ? '_blank' : undefined}
                      rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-xs text-slate-500">
                <p className="mt-1">
                  © {new Date().getFullYear()} Igala Wikimedia Community. Powered by{' '}
                  <a
                    href="https://wikimedia.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Wikimedia Foundation
                  </a>
                  .
                </p>
              </div>
              <div className="text-xs text-slate-500">
                <a
                  href="https://meta.wikimedia.org/wiki/Wikimedia_User_Groups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-700 hover:text-slate-900"
                >
                  Recognized User Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Stat({ label, value, icon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start gap-4">
        {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
        <div className="flex-1">
          <div className="text-2xl font-extrabold tracking-tight text-white">{value}</div>
          <div className="mt-1.5 text-xs font-semibold text-white/70 leading-relaxed">{label}</div>
        </div>
      </div>
    </div>
  )
}

function DemoCard({ id, name, image, description, index, loading }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      
      {loading ? (
        <>
          {/* Image Skeleton */}
          <div className="aspect-[16/10]">
            <Skeleton.Image
              active
              style={{ width: "100%", height: "100%" }}
              className="!w-full !h-full"
            />
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            <Skeleton
              active
              title={{ width: "80%" }}
              paragraph={{ rows: 2 }}
            />

            <div className="mt-4">
              <Skeleton.Button active size="small" />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Image */}
          <div className="aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100 pointer-events-none"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
              {name}
            </h3>

            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {description ||
                "Community event showcasing Igala culture and Wikimedia contributions."}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <a
                href={id ? `/events/${id}` : "/events"}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
              >
                View
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <a
      href={project.href}
      target={project.href.startsWith('http') ? '_blank' : undefined}
      rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 transition-opacity group-hover:opacity-5`}></div>
      <div className="relative">
        <div className="mb-4 text-4xl">{project.icon}</div>
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
        <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
          Learn more
          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  )
}

export default HomePage
