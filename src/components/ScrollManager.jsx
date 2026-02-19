import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"

export const ScrollManager = ({ section, setSection }) => {
    const data = useScroll()

    const lastSection = useRef(section)

    const lockToSectionRef = useRef(null)
    const isAnimating = useRef(false)

    useEffect(() => {
        data.fill.classList.add("top-0", "absolute")
    }, [data])


    useEffect(() => {
        lockToSectionRef.current = section
        lastSection.current = section

        let raf = 0
        const start = () => {
            if (!data?.el) {
                raf = requestAnimationFrame(start)
                return
            }

            const el = data.el
            const h = el.clientHeight

            if (!h) {
                raf = requestAnimationFrame(start)
                return
            }

            gsap.killTweensOf(el)

            isAnimating.current = true
            gsap.to(el, {
                duration: 1,
                scrollTop: section * h,
                overwrite: "auto",
                onComplete: () => {
                    isAnimating.current = false
                    lastSection.current = section
                },
            })
        }

        raf = requestAnimationFrame(start)
        return () => cancelAnimationFrame(raf)
    }, [section, data])

    useFrame(() => {
        const el = data.el
        if (!el) return

        const h = el.clientHeight || 1
        const scrollTop = el.scrollTop || 0

        const locked = lockToSectionRef.current
        if (locked !== null) {
            const targetPx = locked * h
            const diffPx = Math.abs(scrollTop - targetPx)

            if (diffPx > 6 || isAnimating.current) return
            lockToSectionRef.current = null
        }

        const curSection = Math.round(scrollTop / h)

        if (curSection !== lastSection.current && curSection >= 0 && curSection <= 3) {
            lastSection.current = curSection
            setSection(curSection)
        }
    })

    return null
}
