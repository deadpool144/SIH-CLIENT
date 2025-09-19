"use client";

import React, { useState } from "react";
import CreateEventForm from "@/components/events/CreateEventForm";
import EventList from "@/components/events/EventList";

export default function EventPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-stone-800 min-h-screen  px-4">
      <EventList refresh={refresh} />
    </div>
  );
}
