import { useMemo, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { projects } from "../../utils/constants"
import TechIcon from "../../utils/TechIcon"
import { FiGithub, FiExternalLink } from "react-icons/fi"
import { goToProjectsDetails, goToHome } from "../Routes/coordinator"
import Laptop from "../Laptop"
import CellphoneSkill from "../CellphoneSkill"
import BackgroundProject from "../BackgroundProject"
import { useSection } from "../state/SectionContext"

export default function ProjectDetailPage() {
    const { id } = useParams()
    const projectId = Number(id)
    const { setSection, setStarted } = useSection()

    const project = useMemo(() => {
        return projects.find((p) => p.id === projectId)
    }, [projectId])

    const currentIndex = projects.findIndex((p) => p.id === projectId)

    const prevProject = projects[currentIndex - 1] || null
    const nextProject = projects[currentIndex + 1] || null

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!project) {
        return (
            <div className="min-h-screen bg-[#A6CFB9] px-6 py-16 text-zinc-900">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="text-xl">
                        <button
                            onClick={() => { goToHome(); setStarted(true); setSection(2.6) }}
                            className="cursor-pointer text-slate-600 hover:text-slate-900"
                        >
                            ← Back
                        </button>
                    </div>
                    <p className="mt-6 text-sm text-zinc-700">Project not found</p>
                </div>
            </div>
        )
    }

    const isPhone = project.id === 4

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#A6CFB9] text-zinc-900">
            <BackgroundProject />
            <div className="mx-auto w-full max-w-7xl px-6 py-10">
                {/* Top bar (Back left / chips right) */}
                <div className="flex items-start justify-between gap-4">
                    <button
                        onClick={() => { goToHome(); setSection(2.6); setStarted(true) }}
                        className="text-xl cursor-pointer text-slate-600 hover:text-slate-900"
                    >
                        ← Back
                    </button>

                    <div className="flex max-w-[520px] flex-wrap justify-end gap-2">
                        {project.tecnology.map((t) => (
                            <span
                                key={t}
                                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-emerald-950 shadow-sm ring-1 ring-emerald-900/10 backdrop-blur"
                            >
                                <TechIcon name={t} />
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Main layout */}
                <div className="mt-5 md:-ml-60 grid grid-cols-1 gap-10 md:grid-cols-10 md:items-start">
                    <div className="md:col-span-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="md:ml-90 mt-6 md:pb-6 text-6xl font-black tracking-tight md:mt-5 md:text-6xl"
                        >
                            {project.title}
                        </motion.h1>

                        {/* Description card */}
                        <div className="md:pl-60 mt-5 w-full max-w-[860px] rounded-3xl bg-white/55 p-7 shadow-sm ring-1 ring-zinc-900/10 backdrop-blur">
                            <h2 className="text-sm font-extrabold tracking-wide text-zinc-500">
                                DESCRIPTION
                            </h2>

                            <p className="mt-4 text-[15px] leading-7 text-zinc-800">
                                {project.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {project.urlGit && (
                                    <a
                                        href={project.urlGit}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-900/10 hover:bg-zinc-50"
                                    >
                                        <FiGithub />
                                        Repository
                                    </a>
                                )}

                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900"
                                    >
                                        <FiExternalLink />
                                        Live
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="relative md:ml-15 md:mt-15 md:col-span-4"
                    >
                        {/* Device (no card, like the screenshot) */}
                        <div className="mt-6 flex justify-center md:mt-0 md:justify-end">
                            <div className="w-full max-w-[520px]">
                                {isPhone ? (
                                    <CellphoneSkill src={project.video} title={project.title} />
                                ) : (
                                    <Laptop src={project.video} title={project.title} />
                                )}
                            </div>
                        </div>

                        {/* TEAM card (bottom-right floating) */}
                        <div className="mt-2 md:mt-0 md:absolute md:-bottom-35 md:-right-15 md:min-w-[400px]">
                            <div className="w-full max-w-[340px] rounded-2xl bg-white/55 p-5 shadow-sm ring-1 ring-zinc-900/10 backdrop-blur">
                                <h2 className="text-[10px] font-extrabold tracking-wide text-zinc-500">
                                    TEAM
                                </h2>

                                <div className="mt-1 space-y-1 text-[10px] text-zinc-800">
                                    <>
                                        <p>
                                            <span className="font-semibold">Project type:</span>{" "}
                                            {project.teamSize === 1 ? "Solo project" : "Collaborative project"}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Team size:</span>{" "}
                                            {project.teamSize === 1 ? `${project.teamSize} members` : "1 member"}
                                        </p>
                                    </>
                                    <p className="pt-1 text-[8px] text-zinc-600">
                                        (Full team available in the GitHub repository.)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Bottom project navigation */}
            <div className="mt-20 flex flex-col items-center justify-center gap-0 md:mt-5 md:mr-100">

                <p className="pb-2 text-sm font-bold tracking-wide text-zinc-900">
                    Next project
                </p>

                <div className="flex items-center gap-4">
                    {prevProject && (
                        <button
                            onClick={() => goToProjectsDetails(prevProject.id)}
                            className="
                                rounded-xl 
                                bg-white/70 
                                px-6 py-3 
                                text-xs font-semibold 
                                text-zinc-900 
                                shadow-sm 
                                ring-1 ring-zinc-900/10 
                                hover:bg-white 
                                transition
                                cursor-pointer
                            "
                        >
                            ← {prevProject.title}
                        </button>
                    )}

                    {nextProject && (
                        <button
                            onClick={() => goToProjectsDetails(nextProject.id)}
                            className="
                                rounded-xl 
                                bg-white/70 
                                px-6 py-3 
                                text-xs font-semibold 
                                text-zinc-900  
                                shadow-md 
                                hover:bg-white  
                                transition
                                cursor-pointer
                            "
                        >
                            {nextProject.title} →
                        </button>
                    )}
                </div>
            </div>

        </main>

    )
}
