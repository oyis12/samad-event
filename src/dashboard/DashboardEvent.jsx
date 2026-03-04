import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { Skeleton, Empty, Button } from "antd";

const DashboardEvent = () => {
  const { BASE_URL } = useApp();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/event`);

      // ✅ Ensure we always get an array
      const eventsArray = Array.isArray(response.data)
        ? response.data
        : response.data?.data || []; // fallback if your API wraps data

      setEvents(eventsArray);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
        <div className="mb-5">
            <Button>Add Event</Button>
        </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            ))
          : events.length === 0 ? (
              <div className="col-span-full">
                <Empty description="No Events Found" />
              </div>
            ) : (
              events.map((event) => (
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  key={event._id}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 h-60">
                    <img
                      src={event.imageSrc}
                      alt={event.name}
                      loading="lazy"
                      decoding="async"
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
                        // href={`/events/${event._id}`}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  );
};

export default DashboardEvent;