import {
    SiReact,
    SiVite,
    SiThreedotjs,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiBlender,
    SiNodedotjs,
    SiMysql,
    SiMui,
    SiCss3,
    SiHtml5,
    SiCanva,
} from "react-icons/si"

export default function TechIcon({ name }) {
    const key = name.toLowerCase()

    const Icon =
        key.includes("react three fiber") ? SiReact :
            key.includes("react") ? SiReact :
                key.includes("vite") ? SiVite :
                    key.includes("three") ? SiThreedotjs :
                        key.includes("javascript") ? SiJavascript :
                            key.includes("typescript") ? SiTypescript :
                                key.includes("tailwind") ? SiTailwindcss :
                                    key.includes("framer") ? SiFramer :
                                        key.includes("blender") ? SiBlender :
                                            key.includes("node") ? SiNodedotjs :
                                                key.includes("mysql") ? SiMysql :
                                                    key.includes("material") ? SiMui :
                                                        key === "css" ? SiCss3 :
                                                            key === "html" ? SiHtml5 :
                                                                key.includes("canva") ? SiCanva :
                                                                    null

    if (!Icon) return <span className="text-[10px] font-semibold text-emerald-900/70">•</span>
    return <Icon className="text-emerald-900/80" />
}