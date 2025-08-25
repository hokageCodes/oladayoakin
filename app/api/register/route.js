import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Initialize Firebase (client SDK)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export async function POST(req) {
  try {
    const data = await req.json();

    // Honeypot check
    if (data.honeypot) {
      return new Response(JSON.stringify({ message: "Bot detected" }), { status: 400 });
    }

    // Basic validation
    const { fullName, email, phone, message } = data;
    if (!fullName || !email || !phone || !message) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email" }), { status: 400 });
    }

    // Optional: Rate limiting could be added (e.g., via cookies or IP tracking)

    // Add to Firestore
    const docRef = await addDoc(collection(db, "registrations"), {
      fullName,
      email,
      phone,
      message,
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: "Registration successful", id: docRef.id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
