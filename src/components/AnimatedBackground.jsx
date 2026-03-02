import { useEffect, useRef, useState, useCallback } from 'react'

export default function AnimatedBackground() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const smoothMouseRef = useRef({ x: 0, y: 0 })
    const particlesRef = useRef([])
    const animFrameRef = useRef(null)

    const initParticles = useCallback((width, height) => {
        const particles = []
        const count = Math.floor((width * height) / 18000)
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                pulseOffset: Math.random() * Math.PI * 2,
            })
        }
        particlesRef.current = particles
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let width = window.innerWidth
        let height = window.innerHeight

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initParticles(width, height)
        }

        resize()

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', resize)

        let time = 0

        const draw = () => {
            time += 1
            ctx.clearRect(0, 0, width, height)

            // Smooth mouse follow
            smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.06
            smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.06

            const mx = smoothMouseRef.current.x
            const my = smoothMouseRef.current.y

            // Cursor-reactive radial glow
            const glowRadius = 350
            const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius)
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.12)')
            gradient.addColorStop(0.4, 'rgba(37, 99, 235, 0.06)')
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0)')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            // Secondary ambient glow (slower, orbiting)
            const ambientX = width * 0.7 + Math.sin(time * 0.005) * 200
            const ambientY = height * 0.3 + Math.cos(time * 0.007) * 150
            const ambientGrad = ctx.createRadialGradient(ambientX, ambientY, 0, ambientX, ambientY, 300)
            ambientGrad.addColorStop(0, 'rgba(96, 165, 250, 0.06)')
            ambientGrad.addColorStop(1, 'rgba(96, 165, 250, 0)')
            ctx.fillStyle = ambientGrad
            ctx.fillRect(0, 0, width, height)

            // Third ambient glow
            const amb2X = width * 0.2 + Math.cos(time * 0.004) * 180
            const amb2Y = height * 0.7 + Math.sin(time * 0.006) * 120
            const amb2Grad = ctx.createRadialGradient(amb2X, amb2Y, 0, amb2X, amb2Y, 250)
            amb2Grad.addColorStop(0, 'rgba(30, 64, 175, 0.07)')
            amb2Grad.addColorStop(1, 'rgba(30, 64, 175, 0)')
            ctx.fillStyle = amb2Grad
            ctx.fillRect(0, 0, width, height)

            // Draw particles
            const particles = particlesRef.current
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // Update position
                p.x += p.speedX
                p.y += p.speedY

                // Wrap edges
                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                // Cursor repulsion — particles gently drift away from cursor
                const dx = p.x - mx
                const dy = p.y - my
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 180 && dist > 0) {
                    const force = (180 - dist) / 180 * 0.4
                    p.x += (dx / dist) * force
                    p.y += (dy / dist) * force
                }

                // Pulsing opacity
                const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset)
                const alpha = p.opacity + pulse * 0.15

                // Draw particle
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(147, 197, 253, ${Math.max(0.05, alpha)})`
                ctx.fill()

                // Draw faint connecting lines to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
                    if (d < 120) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - d / 120) * 0.08})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            // Subtle grid overlay
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)'
            ctx.lineWidth = 0.5
            const gridSize = 36
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }

            animFrameRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', resize)
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        }
    }, [initParticles])

    return (
        <canvas
            ref={canvasRef}
            className='pointer-events-none fixed inset-0 z-0'
            style={{ background: 'transparent' }}
        />
    )
}
