import { useState, useEffect } from 'react'
// import flyerKSP from './assets/Flyer_for_outreach_program_in_Kogi_State_Polytechnic_Lokoja.jpg'
// import outreachFPI from './assets/Igala_Wikidedia_Outreach_in_Fpi.jpg'
// import outreachKSP1 from './assets/Igala_Wikipedia_outreach_at_Kogi_State_Polytechnic_01.jpg'
// import outreachKSP2 from './assets/Igala_Wikipedia_Outreach_at_KSP_Lokoja_01.jpg'
// import outreachKSP3 from './assets/Igala_Wikipedia_Outreach_at_KSP_Lokoja_02.jpg'
// import participantsFPI from './assets/Participants_at_FPI_outreach.jpg'
// import outreachFederalPoly from './assets/Wikipedia_Outreach_in_Federal_Polytech_Idah.jpg'
// import trainingFPI from './assets/Wikipedia_Training_session_at_FPI.jpg'
// import trainingKSP from './assets/Igala_Wikipedia_Outreach_at_KSP_Lokoja_01.jpg'

// // Shared image map and keys so we can store simple values and show fallbacks
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

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// imageMap kept for backward compatibility when displaying older events that have imageKey
function AdminPage({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    if (onLogout) {
      onLogout()
    } else {
      window.location.href = '/admin/login'
    }
  }

  const [activeTab, setActiveTab] = useState('dashboard')
  // Events are fully managed via the backend API
  const [events, setEvents] = useState([])

  const [projects, setProjects] = useState([])

  const [stats, setStats] = useState({
    contributors: '0',
    articles: '0',
    mediaFiles: '0',
    events: '0',
  })

  const [editingEvent, setEditingEvent] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)

  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    imageSrc: '',
    // Optional extra images for the gallery on the detail page
    galleryImages: [],
  })

  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    icon: '📚',
    href: '',
    color: 'from-blue-500 to-cyan-500',
  })

  // Load content from backend (events, projects, stats) when the admin loads
  useEffect(() => {
    ;(async () => {
      try {
        const [eventsRes, projectsRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/events`),
          fetch(`${API_BASE}/projects`),
          fetch(`${API_BASE}/stats`),
        ])

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json()
          if (Array.isArray(eventsData)) setEvents(eventsData)
        }

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json()
          if (Array.isArray(projectsData)) setProjects(projectsData)
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          if (statsData && typeof statsData === 'object') setStats(statsData)
        }
      } catch (err) {
        console.error('Failed to fetch data from API', err)
      }
    })()
  }, [])

  const handleAddEvent = async () => {
    let updated
    if (editingEvent) {
      try {
        const res = await fetch(`${API_BASE}/events/${editingEvent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventForm),
        })
        if (!res.ok) throw new Error('Failed to update event')
        const saved = await res.json()
        updated = events.map((e) => (e.id === editingEvent.id ? saved : e))
        setEditingEvent(null)
      } catch (err) {
        console.error('Failed to update event', err)
        return
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventForm),
        })
        if (!res.ok) throw new Error('Failed to create event')
        const saved = await res.json()
        updated = [...events, saved]
      } catch (err) {
        console.error('Failed to create event', err)
        return
      }
    }
    setEvents(updated)
    setEventForm({ name: '', description: '', imageSrc: '', galleryImages: [] })
    setShowEventForm(false)
  }

  const handleDeleteEvent = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' })
      if (res.status !== 204 && res.status !== 200) {
        throw new Error('Failed to delete event')
      }
      const updated = events.filter((e) => e.id !== id)
      setEvents(updated)
    } catch (err) {
      console.error('Failed to delete event', err)
    }
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setEventForm({
      name: event.name,
      description: event.description,
      imageSrc:
        event.imageSrc ||
        (Array.isArray(event.galleryImages) && event.galleryImages.length > 0
          ? event.galleryImages[0]
          : ''),
      galleryImages:
        (Array.isArray(event.galleryImages) && event.galleryImages) ||
        (event.imageSrc ? [event.imageSrc] : []),
    })
    setShowEventForm(true)
  }

  const handleAddProject = async () => {
    let updated
    if (editingProject) {
      try {
        const res = await fetch(`${API_BASE}/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectForm),
        })
        if (!res.ok) throw new Error('Failed to update project')
        const saved = await res.json()
        updated = projects.map((p) => (p.id === editingProject.id ? saved : p))
        setEditingProject(null)
      } catch (err) {
        console.error('Failed to update project', err)
        return
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectForm),
        })
        if (!res.ok) throw new Error('Failed to create project')
        const saved = await res.json()
        updated = [...projects, saved]
      } catch (err) {
        console.error('Failed to create project', err)
        return
      }
    }
    setProjects(updated)
    setProjectForm({
      name: '',
      description: '',
      icon: '📚',
      href: '',
      color: 'from-blue-500 to-cyan-500',
    })
    setShowProjectForm(false)
  }

  const handleDeleteProject = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' })
      if (res.status !== 204 && res.status !== 200) throw new Error('Failed to delete project')
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
    } catch (err) {
      console.error('Failed to delete project', err)
    }
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setProjectForm({
      name: project.name,
      description: project.description,
      icon: project.icon,
      href: project.href,
      color: project.color,
    })
    setShowProjectForm(true)
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'stats', label: 'Statistics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jfif" alt="Logo" className="h-8 w-auto rounded-lg" />
            <h1 className="text-xl font-extrabold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">
                {localStorage.getItem('username') || 'Admin'}
              </span>
            </div>
            <a
              href="/"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setShowEventForm(false)
                  setShowProjectForm(false)
                  setEditingEvent(null)
                  setEditingProject(null)
                }}
                className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="mb-6 text-3xl font-extrabold text-slate-900">Dashboard Overview</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Events" value={events.length} icon="📅" color="from-blue-500 to-cyan-500" />
                <StatCard label="Total Projects" value={projects.length} icon="🚀" color="from-purple-500 to-pink-500" />
                <StatCard label="Active Contributors" value={stats.contributors} icon="👥" color="from-green-500 to-emerald-500" />
                <StatCard label="Wikipedia Articles" value={stats.articles} icon="📚" color="from-orange-500 to-red-500" />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-extrabold text-slate-900">Recent Events</h3>
                  <div className="space-y-3">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                        <img
                          src={event.imageSrc || imageMap[event.imageKey] || participantsFPI}
                          alt={event.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900 line-clamp-1">{event.name}</div>
                          <div className="text-xs text-slate-500">Event</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-extrabold text-slate-900">Recent Projects</h3>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                        <div className="text-2xl">{project.icon}</div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900">{project.name}</div>
                          <div className="text-xs text-slate-500">Project</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Management */}
          {activeTab === 'events' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-slate-900">Events Management</h2>
                <button
                  onClick={() => {
                    setShowEventForm(true)
                    setEditingEvent(null)
                    setEventForm({ name: '', description: '', imageSrc: '' })
                  }}
                  className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                >
                  + Add New Event
                </button>
              </div>

              {showEventForm && (
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-extrabold text-slate-900">
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Event Name</label>
                      <input
                        type="text"
                        value={eventForm.name}
                        onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="Enter event name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                      <textarea
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        rows="3"
                        placeholder="Enter event description"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Choose images from computer
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          if (!files.length) return

                          Promise.all(
                            files.map(
                              (file) =>
                                new Promise((resolve) => {
                                  const reader = new FileReader()
                                  reader.onloadend = () => {
                                    const result = reader.result
                                    if (typeof result === 'string') resolve(result)
                                    else resolve(null)
                                  }
                                  reader.readAsDataURL(file)
                                }),
                            ),
                          ).then((results) => {
                            const valid = results.filter((r) => typeof r === 'string')
                            if (!valid.length) return
                            setEventForm((prev) => {
                              const merged = [...(prev.galleryImages || []), ...valid]
                              return {
                                ...prev,
                                imageSrc: prev.imageSrc || merged[0],
                                galleryImages: merged,
                              }
                            })
                          })

                          e.target.value = ''
                        }}
                        className="w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-2 text-xs text-slate-600 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:border-slate-400"
                      />
                      {eventForm.galleryImages && eventForm.galleryImages.length > 0 && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="h-12 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                            <img
                              src={eventForm.imageSrc || eventForm.galleryImages[0]}
                              alt="Event preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-[11px] text-slate-600">
                            {eventForm.galleryImages.length} image
                            {eventForm.galleryImages.length > 1 ? 's' : ''} selected
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setEventForm((prev) => ({ ...prev, imageSrc: '', galleryImages: [] }))
                            }
                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                          >
                            Clear images
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddEvent}
                        className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                      >
                        {editingEvent ? 'Update Event' : 'Add Event'}
                      </button>
                      <button
                        onClick={() => {
                          setShowEventForm(false)
                          setEditingEvent(null)
                          setEventForm({ name: '', description: '', imageSrc: '' })
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
                {events.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
                      <img
                        src={event.imageSrc || imageMap[event.imageKey] || participantsFPI}
                        alt={event.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-sm font-extrabold text-slate-900 line-clamp-2">{event.name}</h3>
                      <p className="mb-4 text-xs text-slate-600 line-clamp-2">{event.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-all hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Management */}
          {activeTab === 'projects' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-slate-900">Projects Management</h2>
                <button
                  onClick={() => {
                    setShowProjectForm(true)
                    setEditingProject(null)
                    setProjectForm({
                      name: '',
                      description: '',
                      icon: '📚',
                      href: '',
                      color: 'from-blue-500 to-cyan-500',
                    })
                  }}
                  className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                >
                  + Add New Project
                </button>
              </div>

              {showProjectForm && (
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-extrabold text-slate-900">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Project Name</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        rows="3"
                        placeholder="Enter project description"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">Icon (Emoji)</label>
                        <input
                          type="text"
                          value={projectForm.icon}
                          onChange={(e) => setProjectForm({ ...projectForm, icon: e.target.value })}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          placeholder="📚"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">URL</label>
                        <input
                          type="text"
                          value={projectForm.href}
                          onChange={(e) => setProjectForm({ ...projectForm, href: e.target.value })}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Gradient Color</label>
                      <select
                        value={projectForm.color}
                        onChange={(e) => setProjectForm({ ...projectForm, color: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                        <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                        <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                        <option value="from-orange-500 to-red-500">Orange to Red</option>
                        <option value="from-indigo-500 to-purple-500">Indigo to Purple</option>
                        <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddProject}
                        className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                      >
                        {editingProject ? 'Update Project' : 'Add Project'}
                      </button>
                      <button
                        onClick={() => {
                          setShowProjectForm(false)
                          setEditingProject(null)
                          setProjectForm({
                            name: '',
                            description: '',
                            icon: '📚',
                            href: '',
                            color: 'from-blue-500 to-cyan-500',
                          })
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
                {projects.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 text-4xl">{project.icon}</div>
                    <h3 className="mb-2 text-lg font-extrabold text-slate-900">{project.name}</h3>
                    <p className="mb-4 text-sm text-slate-600">{project.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-all hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statistics Management */}
          {activeTab === 'stats' && (
            <div>
              <h2 className="mb-6 text-3xl font-extrabold text-slate-900">Statistics Management</h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Active Contributors</label>
                    <input
                      type="text"
                      value={stats.contributors}
                      onChange={(e) => {
                        const updated = { ...stats, contributors: e.target.value }
                        setStats(updated)
                        fetch(`${API_BASE}/stats`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updated),
                        }).catch((err) => console.error('Failed to update stats', err))
                      }}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Wikipedia Articles</label>
                    <input
                      type="text"
                      value={stats.articles}
                      onChange={(e) => {
                        const updated = { ...stats, articles: e.target.value }
                        setStats(updated)
                        fetch(`${API_BASE}/stats`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updated),
                        }).catch((err) => console.error('Failed to update stats', err))
                      }}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Media Files</label>
                    <input
                      type="text"
                      value={stats.mediaFiles}
                      onChange={(e) => {
                        const updated = { ...stats, mediaFiles: e.target.value }
                        setStats(updated)
                        fetch(`${API_BASE}/stats`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updated),
                        }).catch((err) => console.error('Failed to update stats', err))
                      }}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Community Events</label>
                    <input
                      type="text"
                      value={stats.events}
                      onChange={(e) => {
                        const updated = { ...stats, events: e.target.value }
                        setStats(updated)
                        fetch(`${API_BASE}/stats`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updated),
                        }).catch((err) => console.error('Failed to update stats', err))
                      }}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="mb-6 text-3xl font-extrabold text-slate-900">Settings</h2>
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-extrabold text-slate-900">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Site Title</label>
                      <input
                        type="text"
                        defaultValue="Igala Wikimedia Community"
                        className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Site Description</label>
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
          )}
        </main>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-lg`}>
      <div className="mb-2 text-3xl">{icon}</div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="mt-1 text-sm font-semibold text-white/90">{label}</div>
    </div>
  )
}

export default AdminPage
