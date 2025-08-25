"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import { Calendar, Clock, Monitor, Key, ArrowRight, Check, X } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm"; // import form

export default function BookedVisiblePaid() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-black text-white min-h-screen flex items-center">
        <Container className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full pt-12 md:pt-32">
          
          {/* Text Content - 55% */}
          <div className="md:w-[55%] text-center md:text-left">
            <div className="uppercase text-sm font-semibold tracking-wide mb-4">
              LinkedIn Masterclass
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              BOOKED, <span className="underline">VISIBLE</span> & PAID
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              A power-packed masterclass for lawyers & law students to grow your legal brand,
              attract clients, and position yourself for high-value opportunities on LinkedIn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="inline-block border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                Reserve Your Spot
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://oladayoakinmokun.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                Subscribe to Newsletter
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Event Highlights */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <Calendar className="w-6 h-6 mx-auto mb-1" />
                <p className="text-gray-400 text-sm">Aug 30, 2025</p>
              </div>
              <div>
                <Clock className="w-6 h-6 mx-auto mb-1" />
                <p className="text-gray-400 text-sm">4-6 PM WAT</p>
              </div>
              <div>
                <Monitor className="w-6 h-6 mx-auto mb-1" />
                <p className="text-gray-400 text-sm">LinkedIn Live</p>
              </div>
              <div>
                <Key className="w-6 h-6 mx-auto mb-1" />
                <p className="text-gray-400 text-sm">Free (Registration Required)</p>
              </div>
            </div>
          </div>

          {/* Flyer/Image Content */}
          <div className="md:w-[45%] max-w-md">
            <img
              src="/main.jpg"
              alt="Event Flyer"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </Container>
      </section>

      {/* What You'll Learn Section */}
      <section className="bg-black text-white py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your LinkedIn presence and convert connections into high-value opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "How to build a magnetic LinkedIn profile that works while you sleep",
              "Content strategies that get you seen and paid",
              "What to post, when to post & how to engage",
              "Move from just posting to building real influence online",
              "How to turn engagement into consultations and paid briefs"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-900/50 p-6 rounded-lg">
                <Check className="w-6 h-6 text-white mt-1" />
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Speaker Section */}
      <section className="bg-black text-white py-10">
        <Container className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="md:w-[55%]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Speaker</h2>
            <p className="text-gray-400 text-lg mb-6">
              <span className="text-3xl text-white">Victoria Olamide</span> <br /> Lawyer, Legal Project Manager & LinkedIn Growth Strategist.
            </p>
          </div>
          <div className="md:w-[45%] max-w-md">
            <img
              src="/guest.jpg"
              alt="Speaker Flyer"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </Container>
      </section>

      {/* Always Visible Registration Form */}
      <section className="bg-black text-white py-10">
        <Container>
          <RegistrationForm />
        </Container>
      </section>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-lg max-w-xl w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Reserve Your Spot</h2>
            <RegistrationForm />
          </div>
        </div>
      )}
    </>
  );
}
