// sanity/lib/client.js
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uav1wrmc'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-07-24'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Add this for debugging
  token: process.env.SANITY_API_TOKEN, // Optional: only if you need authenticated requests
})

// Export config for debugging
export const config = {
  projectId,
  dataset,
  apiVersion,
}