"use client";

import React, { useState } from "react";
import CreateEventForm from "@/components/events/CreateEventForm";
import EventList from "@/components/events/EventList";

export default function EventPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-stone-800 min-h-screen py-10 px-4">
      <CreateEventForm onEventCreated={() => setRefresh(!refresh)} />
      <EventList refresh={refresh} />
    </div>
  );
}
