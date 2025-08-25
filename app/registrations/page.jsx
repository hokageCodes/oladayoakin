"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg flex flex-col overflow-hidden">
      {event.image && (
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-400 mb-4 flex-grow">{event.description}</p>
        <p className="text-gray-500 text-sm mb-4">
          {event.date} &bull; {event.time}
        </p>
        <Link
          href={`/registrations/${event.slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Register Now <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/data/events.json");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <Container className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-gray-400 text-lg">See all upcoming events and register to reserve your spot.</p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400 text-center">No events available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
