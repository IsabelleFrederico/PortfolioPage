// import { useScroll } from "@react-three/drei"
// import { useFrame } from "@react-three/fiber"
// import { useEffect, useRef } from "react"

// export function ScrollManager({ section, onSectionChange, started, pages = 4.3, sections = 4 }) {
//     const scroll = useScroll()
//     const lastSection = useRef(section)
//     const isProgrammatic = useRef(false)

//     const getCurrentSection = () => {
//         const pageFloat = scroll.offset * pages
//         return Math.max(0, Math.min(Math.floor(pageFloat), sections - 1))
//     }

//     useEffect(() => {
//         if (!started) return
//         if (!scroll?.el) return

//         const targetPage = Math.max(0, Math.min(Math.floor(section), sections - 1))

//         if (getCurrentSection() === targetPage) {
//             lastSection.current = targetPage
//             return
//         }

//         isProgrammatic.current = true
//         lastSection.current = targetPage

//         scroll.el.scrollTo({
//             top: targetPage * scroll.el.clientHeight,
//             behavior: "smooth",
//         })

//         const t = setTimeout(() => {
//             isProgrammatic.current = false
//         }, 700)

//         return () => clearTimeout(t)
//     }, [section, scroll, started, pages, sections])

//     useFrame(() => {
//         if (!started) return
//         if (isProgrammatic.current) return

//         const currentSection = getCurrentSection()

//         if (currentSection !== lastSection.current) {
//             lastSection.current = currentSection
//             onSectionChange(currentSection)
//         }
//     })

//     return null
// }


import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"

export function ScrollManager({
    section,
    onSectionChange,
    started,
    pages = 4.3,
    sections = 4,
    navToSectionRef,
    scrollTarget
}) {
    const scroll = useScroll()

    const isProgrammatic = useRef(false)
    const lastSection = useRef(0)
    const targetTopRef = useRef(0)

    const getStep = () => pages / (sections - 1)

    const getCurrentSection = () => {
        if (!scroll?.el) return 0
        const step = getStep()
        const pageFloat = scroll.el.scrollTop / scroll.el.clientHeight
        return Math.max(0, Math.min(Math.floor(pageFloat / step + 1e-6), sections - 1))
    }

    useEffect(() => {
        if (!started) return
        if (!scroll?.el) return

        const uiTarget = Math.max(0, Math.min(Math.floor(section), sections - 1))
        const page = (scrollTarget ?? Math.floor(section))
        const targetTop = page * scroll.el.clientHeight

        isProgrammatic.current = true
        if (navToSectionRef) navToSectionRef.current = true

        targetTopRef.current = targetTop
        lastSection.current = uiTarget

        scroll.el.scrollTo({ top: targetTop, behavior: "smooth" })
    }, [section, started, scroll, pages, sections, navToSectionRef])

    useFrame(() => {
        if (!started) return
        if (!scroll?.el) return

        if (isProgrammatic.current) {
            const diff = Math.abs(scroll.el.scrollTop - targetTopRef.current)
            if (diff <= 3) {
                isProgrammatic.current = false
                if (navToSectionRef) navToSectionRef.current = false
                lastSection.current = getCurrentSection()
            }
            return
        }

        if (navToSectionRef?.current) return

        const current = getCurrentSection()
        if (current !== lastSection.current) {
            lastSection.current = current
            onSectionChange(current)
        }
    })

    return null
}

