import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/f1f5f9/64748b?text=Event'

function EventDetailPage() {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const path = window.location.pathname // e.g. /events/123
        const segments = path.split('/').filter(Boolean) // ['events', '123']
        const idSegment = segments[1]
        const id = Number(idSegment)
        if (!id) throw new Error('Invalid event id')

        const res = await fetch(`${API_BASE}/events/${id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch event')
        }
        const data = await res.json()
        setEvent(data)
      } catch (e) {
        console.error('Failed to load event detail', e)
        setEvent(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-full border-4 border-slate-200 border-t-indigo-500 p-6 animate-spin" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="container-page flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.jfif" alt="Igala Wikimedia logo" className="h-9 w-auto rounded-lg" />
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Igala Wikimedia
              </span>
            </div>
            <a
              href="/events"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back to events
            </a>
          </div>
        </header>
        <main className="container-page py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Event not found
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              The event you are looking for could not be found. It may have been removed or the link
              is incorrect.
            </p>
            <a
              href="/events"
              className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Back to all events
            </a>
          </div>
        </main>
      </div>
    )
  }

  const primaryImage = event.imageSrc || event.image || PLACEHOLDER_IMAGE
  const rawGallery = Array.isArray(event.galleryImages) ? event.galleryImages : []
  const galleryImages =
    rawGallery.filter(Boolean).length > 0
      ? rawGallery.filter(Boolean)
      : [primaryImage]
  const safeIndex = Math.min(activeIndex, galleryImages.length - 1)
  const activeImage = galleryImages[safeIndex]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jfif" alt="Igala Wikimedia logo" className="h-9 w-auto rounded-lg" />
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Igala Wikimedia
              </span>
              <span className="text-[11px] font-medium text-slate-500">Event details</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/events"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← All events
            </a>
            <a
              href="/"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="py-10 sm:py-16">
        <section className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1.2fr)]">
            {/* Main content with gallery */}
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={activeImage}
                  alt={event.name}
                  className="h-full w-full object-contain bg-slate-900 sm:object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    Igala Wikimedia • Event
                  </span>
                  <h1 className="mt-3 max-w-2xl text-lg font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
                    {event.name}
                  </h1>
                </div>
              </div>

              {/* Thumbnail gallery */}
              <div className="border-t border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Event gallery
                  </p>
                  <span className="text-[11px] font-medium text-slate-500">
                    {galleryImages.length} {galleryImages.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border ${
                        idx === safeIndex
                          ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                          : 'border-slate-200 hover:border-slate-400'
                      } bg-slate-100`}
                    >
                      <img
                        src={src}
                        alt={`${event.name} thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="p-6 sm:p-8">
                <h2 className="text-sm font-extrabold tracking-tight text-slate-900">
                  Description
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {event.description ||
                    'Community event showcasing Igala culture and Wikimedia contributions.'}
                </p>
              </div>
            </article>

            {/* Sidebar meta */}
            <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-sm font-extrabold tracking-tight text-slate-900">
                  About this event
                </h2>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  This event is part of the Igala Wikimedia Community’s efforts to preserve and share
                  Igala culture, language, and knowledge through Wikimedia projects.
                </p>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Event ID</span>
                  <span>#{event.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Image source</span>
                  <span>{event.imageSrc ? 'Uploaded image' : 'Library image'}</span>
                </div>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="space-y-2 text-xs text-slate-600">
                <p className="font-semibold text-slate-700">Tips</p>
                <p>
                  You can add more photos for this event later by extending the data model to include
                  a gallery of images.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

export default EventDetailPage

