import React, { useState, useEffect, useCallback } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { useApp } from "../context/AppContext";

const PAGE_SIZE = 6;

const Event = () => {
  const { BASE_URL } = useApp();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/event?page=${page}&length=${PAGE_SIZE}`
      );

      const data = response.data;

      setEvents(data.events || data); // supports both formats
      setHasNext(data.totalPages ? page < data.totalPages : data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <section id="events" className="py-20 sm:py-28">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Events and Activities
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover the vibrant activities and events happening in the Igala
            Wikimedia Community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden p-4"
                >
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: 200 }}
                  />
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              ))
            : events.map((event) => (
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  key={event.id}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 h-60">
                    <img
                      src={event.imageSrc}
                      alt={event.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-extrabold tracking-tight text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                      {event.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {event.description ||
                        "Community event showcasing Igala culture."}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href={`/events/${event.id}`}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination */}
        {!loading && (hasNext || page > 1) && (
          <div className="mt-12 flex justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-5 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold disabled:opacity-40"
            >
              Back
            </button>

            {hasNext && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Event;