// src/hooks/useApi.js
import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export function useApi(endpoint) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    axios.get(`${BASE}${endpoint}`)
      .then(res => { setData(res.data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [endpoint])

  return { data, loading, error }
}

export async function postContact(formData) {
  const res = await axios.post(`${BASE}/contact/`, formData)
  return res.data
}