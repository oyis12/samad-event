import { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { useApp } from "./context/AppContext";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x400/f1f5f9/64748b?text=Event";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { BASE_URL } = useApp(); // ✅ FIXED (you forgot to call it)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/event`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setEvents(data);
          }
        }
      } catch (e) {
        console.error("Failed to load events from API", e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [BASE_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jfif"
              alt="Igala Wikimedia logo"
              className="h-9 w-auto rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Igala Wikimedia
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                Events & Activities
              </span>
            </div>
          </div>
          <a
            href="/"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to homepage
          </a>
        </div>
      </header>

      <main className="py-10 sm:py-16">
        <section className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Events and Activities
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Explore the past and upcoming activities of the Igala Wikimedia
              Community – outreach programs, trainings, contests, and more.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* ✅ Skeleton Loader */}
            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Skeleton.Image
                    style={{ width: "100%", height: 200 }}
                    active
                  />
                  <div className="mt-4">
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </div>
                </div>
              ))}

            {/* ✅ Empty State */}
            {!loading && events.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                No events have been added yet.
              </div>
            )}

            {/* ✅ Events */}
            {!loading &&
              events.map((event, index) => {
                const image =
                  event.imageSrc || event.image || PLACEHOLDER_IMAGE;

                return (
                  <article
                    key={`${event.name}-${index}`}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                      <img
                        src={image}
                        alt={event.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                        {event.name}
                      </h2>

                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                        {event.description ||
                          "Community event showcasing Igala culture and Wikimedia contributions."}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                        <span>Igala Wikimedia Community</span>
                        <a
                          href={
                            event.id
                              ? `/events/${event.id}`
                              : "/events"
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-slate-800"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default EventsPage;