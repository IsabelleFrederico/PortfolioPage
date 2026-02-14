import { skills, languages } from '../../utils/constants'
import { Section } from "../Interface"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

export const Skills = () => {
    const scrollerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    useEffect(() => {
        if (isMobile) return

        const el = scrollerRef.current
        if (!el) return

        const onWheel = (e) => {
            if (!e.deltaY) return

            const atTop = el.scrollTop <= 0
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1

            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                return
            }

            e.preventDefault()
            el.scrollTop += e.deltaY
        }

        el.addEventListener("wheel", onWheel, { passive: false })
        return () => el.removeEventListener("wheel", onWheel)
    }, [isMobile])


    return (
        <Section>
            <div className="w-full h-screen overflow-hidden">
                <div
                    ref={scrollerRef}
                    className={`
                        w-full max-w-screen-2xl mx-auto
                        p-8 pt-5 md:pt-0
                        ${isMobile ? "h-full overflow-y-auto no-scrollbar" : ""}
                        `}
                >
                    <motion.div
                        className="w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start md:mt-2">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
                                <div className="mt-8 space-y-4">
                                    {skills.map((skill, index) => (
                                        <div className="w-full max-w-50 md:max-w-xs" key={index}>
                                            <motion.div
                                                className="flex items-baseline justify-between"
                                                variants={{
                                                    hidden: { opacity: 0, y: 8 },
                                                    visible: {
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: { duration: 0.6, delay: 1 + index * 0.2 },
                                                    },
                                                }}
                                            >
                                                <h3 className="text-l md:text-xl font-bold text-white" >
                                                    {skill.title}
                                                </h3>
                                                <span className="text-xs font-semibold text-white/80">
                                                    {skill.level}%
                                                </span>
                                            </motion.div>

                                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                                <motion.div
                                                    className="h-full bg-emerald-400 rounded-full "
                                                    style={{ width: `${skill.level}%` }}
                                                    initial={{
                                                        scaleX: 0,
                                                        originX: 0,
                                                    }}
                                                    variants={{
                                                        visible: {
                                                            scaleX: 1,
                                                            transition: {
                                                                duration: 1,
                                                                delay: 1 + index * 0.2,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center lg:justify-center">

                            </div>
                            <div className="space-y-6 ">
                                <h2 className="text-3xl md:text-5xl font-bold text-white">Languages</h2>
                                <div className=" mt-8 space-y-4">
                                    {languages.map((lng, index) => (
                                        <div className="w-64 max-w-50 md:max-w-xs" key={index}>
                                            <motion.div
                                                className="flex items-baseline justify-between"
                                                variants={{
                                                    hidden: { opacity: 0, y: 8 },
                                                    visible: {
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: { duration: 0.6, delay: 1 + index * 0.2 },
                                                    },
                                                }}
                                            >
                                                <h3 className="text-l md:text-xl font-bold text-white" >
                                                    {lng.title}
                                                </h3>
                                                <span className="text-xs font-semibold text-white/80">
                                                    {lng.level}%
                                                </span>
                                            </motion.div>
                                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                                <motion.div
                                                    className="h-full bg-emerald-400 rounded-full "
                                                    style={{ width: `${lng.level}%` }}
                                                    initial={{
                                                        scaleX: 0,
                                                        originX: 0,
                                                    }}
                                                    variants={{
                                                        visible: {
                                                            scaleX: 1,
                                                            transition: {
                                                                duration: 1,
                                                                delay: 2 + index * 0.2,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}