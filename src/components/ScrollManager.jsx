import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"

export function ScrollManager({ section, onSectionChange, started }) {
    const scroll = useScroll()
    const lastSection = useRef(section)
    const isProgrammatic = useRef(false)


    useEffect(() => {
        if (!started) return
        if (!scroll?.el) return

        const currentSection = Math.min(Math.floor(scroll.offset * 4), 3)

        if (currentSection === section) {
            lastSection.current = section
            return
        }

        isProgrammatic.current = true
        lastSection.current = section

        scroll.el.scrollTo({
            top: section * scroll.el.clientHeight,
            behavior: "smooth",
        })

        const t = setTimeout(() => {
            isProgrammatic.current = false
        }, 700)

        return () => clearTimeout(t)
    }, [section, scroll, started])

    useFrame(() => {
        if (!started) return
        if (isProgrammatic.current) return

        const currentSection = Math.min(Math.floor(scroll.offset * 4), 3)

        if (currentSection !== lastSection.current) {
            lastSection.current = currentSection
            onSectionChange(currentSection)
        }
    })

    return null
}
