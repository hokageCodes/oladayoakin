"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const RegistrationCard = ({ registration }) => {
  const { fullName, email, phone, message, createdAt, id } = registration;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{fullName}</h3>
        <p className="text-gray-400 mb-1"><strong>Email:</strong> {email}</p>
        <p className="text-gray-400 mb-1"><strong>Phone:</strong> {phone}</p>
        <p className="text-gray-400 mb-1"><strong>Registered:</strong> {new Date(createdAt).toLocaleString()}</p>
      </div>
      <Link
        href={`/registrations/${id}`}
        className="mt-4 inline-flex items-center gap-2 text-blue-500 hover:underline"
      >
        See Details <ArrowRight className="w-4 h-4"/>
      </Link>
    </div>
  );
};

export default RegistrationCard;
