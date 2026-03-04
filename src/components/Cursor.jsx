// src/components/Cursor.jsx
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const move = e => {
      dot.current.style.left  = e.clientX + 'px'
      dot.current.style.top   = e.clientY + 'px'
      setTimeout(() => {
        ring.current.style.left = e.clientX + 'px'
        ring.current.style.top  = e.clientY + 'px'
      }, 80)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}