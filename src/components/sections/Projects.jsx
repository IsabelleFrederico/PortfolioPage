import { Section } from "../Interface"
import { useEffect, useRef } from "react"
import { projects } from "../../utils/constants"
import { goToProjectsDetails } from "../Routes/coordinator"

export const Projects = ({ active = true }) => {
    const scrollerRef = useRef(null)
    const isMobile = window.innerWidth < 863

    useEffect(() => {
        if (isMobile) return
        if (!active) return

        const el = scrollerRef.current
        if (!el) return

        const onWheel = (e) => {
            if (!e.deltaY) return

            const atTop = el.scrollTop <= 0
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1

            if (atTop && e.deltaY < 0) return
            if (atBottom && e.deltaY > 0) return

            e.preventDefault()
            el.scrollTop += e.deltaY
        }

        el.addEventListener("wheel", onWheel, { passive: false })
        return () => el.removeEventListener("wheel", onWheel)
    }, [isMobile, active])

    return (
        <Section>
            <div className="w-full">
                <h2 className="text-3xl md:text-4xl font-bold pt-35 ml-15 md:ml-25">Projects</h2>
                <div
                    ref={scrollerRef}
                    className=
                    {`
                        mt-8
                        ${isMobile ? "pr-3 h-[90vh] overflow-y-auto no-scrollbar" : ""}
                    `}
                >
                    <div
                        className="
                        mt-8
                        pb-40
                        max-[1170px]:ml-30
                        grid grid-cols-1 gap-y-8 gap-x-8
                        min-[863px]:grid-cols-3
                        md:auto-rows-max
                        max-w-[1050px] mx-auto px-10
                        place-items-center
                    "
                    >
                        {projects.slice(0, 6).map((p) => (
                            <button
                                key={p.id}
                                onClick={() => goToProjectsDetails(p.id)}
                                className="
                                transition-transform
                                hover:scale-[1.02]
                                focus:outline-none focus:ring-2 focus:ring-emerald-400/60
                                cursor-pointer
                            "
                            >
                                <div className="overflow-hidden rounded-3xl shadow-md">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="
                                                w-full
                                                aspect-[16/9]
                                                object-cover
                                                transition-transform duration-200       
                                                hover:scale-[1.03]
                                            "
                                        loading="lazy"
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-center">
                                    {p.title}
                                </h3>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}