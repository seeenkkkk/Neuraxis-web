'use client'
import { useEffect, useRef } from 'react'

interface Hex {
  x: number
  y: number
  size: number
  currentSize: number
  opacity: number
  currentOpacity: number
  color: string
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const hexagons: Hex[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 30 + Math.random() * 80,
      currentSize: 30 + Math.random() * 80,
      opacity: 0.06,
      currentOpacity: 0.06,
      color: Math.random() > 0.5 ? '123,47,190' : '0,168,214',
    }))

    // sync currentSize to size after init
    hexagons.forEach(h => { h.currentSize = h.size })

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const drawHex = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) { ctx.moveTo(px, py) } else { ctx.lineTo(px, py) }
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(${color},${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    let animFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const hex of hexagons) {
        const dx = mouseX - hex.x
        const dy = mouseY - hex.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        const near = dist < 150
        const targetSize = near ? hex.size * 0.3 : hex.size
        const targetOpacity = near ? 0.01 : 0.06

        // lerp
        hex.currentSize += (targetSize - hex.currentSize) * 0.08
        hex.currentOpacity += (targetOpacity - hex.currentOpacity) * 0.08

        drawHex(hex.x, hex.y, hex.currentSize, hex.color, hex.currentOpacity)
      }

      animFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      {/* CAPA 1 — imagen estática de fondo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/bg-3d.png"
        alt=""
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.15,
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />

      {/* CAPA 2 — canvas con efecto cursor */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
