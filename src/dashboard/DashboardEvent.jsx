import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { Skeleton, Empty, Button, Modal, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const DashboardEvent = () => {
  const { BASE_URL } = useApp();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewEvent, setViewEvent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const openViewModal = (event) => {
    setViewEvent(event);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewEvent(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    name: "",
    description: "",
    mainImage: [],
    galleryImages: [],
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/event`);
      console.log(response);
      const eventsArray = Array.isArray(response.data.data)
        ? response.data.data
        : [];
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

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);

      const mainImageFile = event.imageSrc
        ? [
            {
              uid: "-1",
              name: "main-image",
              status: "done",
              url: event.imageSrc,
            },
          ]
        : [];

      const galleryFiles = (event.galleryImages || []).map((img, index) => ({
        uid: `${index}`,
        name: `gallery-${index}`,
        status: "done",
        url: img,
      }));

      setEventForm({
        name: event.name,
        description: event.description || "",
        mainImage: mainImageFile,
        galleryImages: galleryFiles,
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        name: "",
        description: "",
        mainImage: [],
        galleryImages: [],
      });
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setEventForm({
      name: "",
      description: "",
      mainImage: [],
      galleryImages: [],
    });
  };

  const handleSubmit = async () => {
    if (!eventForm.name.trim()) {
      message.error("Event name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", eventForm.name);
    formData.append("description", eventForm.description);

    if (
      eventForm.mainImage.length > 0 &&
      eventForm.mainImage[0].originFileObj
    ) {
      formData.append("image", eventForm.mainImage[0].originFileObj);
    }

    eventForm.galleryImages.forEach((file) => {
      if (file.originFileObj) {
        formData.append("galleryImages", file.originFileObj);
      }
    });

    setSubmitLoading(true);

    try {
      let res;
      if (editingEvent) {
        res = await axios.put(
          `${BASE_URL}/event/${editingEvent._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setEvents(events.map((e) => (e._id === res.data._id ? res.data : e)));
        message.success("Event updated successfully");
      } else {
        res = await axios.post(`${BASE_URL}/event`, formData);
        console.log(res);
        setEvents([res.data, ...events]);
        message.success("Event created successfully");
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
      message.error("Failed to save event");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = (eventId) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This will permanently delete the event.",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setLoading(true);
          await axios.delete(`${BASE_URL}/event/${eventId}`);
          setEvents(events.filter((e) => e._id !== eventId));
          message.success("Event deleted");
        } catch (err) {
          console.error(err);
          message.error("Failed to delete event");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div>
      <div className="mb-5">
        <Button
          type="primary"
          onClick={() => openModal()}
          loading={submitLoading}
        >
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))
        ) : events.length === 0 ? (
          <div className="col-span-full">
            <Empty description="No Events Found" />
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100 h-60">
                {event.imageSrc && (
                  <img
                    src={event.imageSrc}
                    alt={event.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-extrabold tracking-tight text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                  {event.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {event.description || "No description"}
                </p>

                <div className="mt-4 flex gap-2">
                  <Button size="small" onClick={() => openViewModal(event)}>
                    View
                  </Button>

                  <Button
                    size="small"
                    onClick={() => openModal(event)}
                    loading={submitLoading}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    danger
                    onClick={() => handleDelete(event._id)}
                    loading={loading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingEvent ? "Edit Event" : "Add Event"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
        okText={editingEvent ? "Update" : "Add"}
        confirmLoading={submitLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Event Name
            </label>
            <input
              type="text"
              value={eventForm.name}
              onChange={(e) =>
                setEventForm({ ...eventForm, name: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Description
            </label>
            <textarea
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Main Image */}
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Main Image
            </label>
            <Upload
              listType="picture-card"
              fileList={eventForm.mainImage}
              beforeUpload={(file) => {
                setEventForm({
                  ...eventForm,
                  mainImage: [
                    {
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                      thumbUrl: URL.createObjectURL(file),
                    },
                  ],
                });
                return false;
              }}
              onRemove={() => setEventForm({ ...eventForm, mainImage: [] })}
            >
              {eventForm.mainImage.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Gallery Images (max 5)
            </label>

            <Upload
              listType="picture-card"
              fileList={eventForm.galleryImages}
              beforeUpload={(file) => {
                if (eventForm.galleryImages.length >= 5) {
                  message.error("Max 5 images");
                  return Upload.LIST_IGNORE;
                }

                setEventForm({
                  ...eventForm,
                  galleryImages: [
                    ...eventForm.galleryImages,
                    {
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      originFileObj: file,
                      thumbUrl: URL.createObjectURL(file),
                    },
                  ],
                });

                return false;
              }}
              onRemove={(file) => {
                setEventForm({
                  ...eventForm,
                  galleryImages: eventForm.galleryImages.filter(
                    (f) => f.uid !== file.uid,
                  ),
                });
              }}
            >
              {eventForm.galleryImages.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>

            {/* Small preview styling */}
            {/* <div className="flex flex-wrap gap-2 mt-2">
              {eventForm.galleryImages.map((file, i) => (
                <img
                  key={i}
                  src={file.thumbUrl}
                  alt="preview"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              ))}
            </div> */}
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Event Details"
        open={viewModalOpen}
        onCancel={closeViewModal}
        footer={null}
        width={700}
      >
        {viewEvent && (
          <div className="space-y-4">
            {/* Main Image */}
            {viewEvent.imageSrc && (
              <img
                src={viewEvent.imageSrc}
                alt={viewEvent.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            {/* Title */}
            <h2 className="text-xl font-bold">{viewEvent.name}</h2>

            {/* Description */}
            <p className="text-gray-600">
              {viewEvent.description || "No description"}
            </p>

            {/* Gallery */}
            {viewEvent.galleryImages && viewEvent.galleryImages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Gallery</h3>

                <div className="grid grid-cols-3 gap-3">
                  {viewEvent.galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="gallery"
                      className="w-full h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardEvent;