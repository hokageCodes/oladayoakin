"use client";
import React, { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    honeypot: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [lastSubmit, setLastSubmit] = useState(0);

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), type === "error" ? 4000 : 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9+]{7,15}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    if (formData.honeypot) {
      showToast("Bot detected!", "error");
      return;
    }

    // Rate limiting: 1 submission per 30 seconds
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      showToast("Please wait 30 seconds before submitting again.", "error");
      return;
    }

    if (!validateForm()) {
      showToast("Please fix the errors above", "error");
      return;
    }

    setIsSubmitting(true);
    showToast("Submitting registration...", "loading");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      showToast("Registration submitted successfully! 🎉", "success");
      setFormData({ fullName: "", email: "", phone: "", message: "", honeypot: "" });
      setLastSubmit(Date.now());
    } catch (err) {
      console.error(err);
      showToast(err.message || "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white py-10 px-2" id="register">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Register Now</h2>

        {/* Honeypot field */}
        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} className="hidden" />

        <input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700" />
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

        <input placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700" />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <textarea placeholder="Message" name="message" value={formData.message} onChange={handleInputChange} className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700" />
        {errors.message && <p className="text-red-500">{errors.message}</p>}

        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-white text-black p-4 rounded-lg flex items-center justify-center gap-2">
          {isSubmitting ? <><Loader2 className="animate-spin w-5 h-5"/> Submitting...</> : <>Submit <Check className="w-5 h-5"/></>}
        </button>
      </div>

      {/* Toasts */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {toasts.map(t => (
          <div key={t.id} className={`px-6 py-3 rounded-lg text-white ${t.type==="success"?"bg-green-600":t.type==="error"?"bg-red-600":"bg-blue-600"}`}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationForm;