import { Section } from "../Interface"
import { languages, skills } from "../../utils/constants"

export function Skills() {

    return (
        <Section>
            <div className="w-full h-full overflow-hidden mt-5 ml-6 md:mt-15">
                <div className="h-full overflow-y-auto no-scrollbar px-4 md:px-15">

                    <div className="grid grid-cols-1 md:pr-0 md:grid-cols-3 gap-10">

                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                                Skills
                            </h2>

                            <div className="space-y-4">
                                {skills.map((s) => (
                                    <div
                                        key={s.id}
                                        className="
                                            flex items-center justify-between
                                            max-w-[180px] md:max-w-xs
                                            rounded-2xl
                                            bg-black/35
                                            border border-emerald-300/20
                                            px-4 py-2
                                            backdrop-blur-md
                                        "
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={s.iconWhite} className="h-6 w-6" />
                                            <span className="text-emerald-50 md:text-l">
                                                {s.title}
                                            </span>
                                        </div>
                                        <div className="text-right pt-3 md:pt-0">
                                            <div className="text-emerald-300 font-semibold text-sm">
                                                {s.level}%
                                            </div>
                                            <div className="text-emerald-200/60 text-[10px]">
                                                {s.levelDescription}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block" />

                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                                Languages
                            </h2>

                            <div className="space-y-4">
                                {languages.map((l) => (
                                    <div
                                        key={l.id}
                                        className="
                                            flex items-center justify-between
                                            max-w-[180px] md:max-w-xs
                                            rounded-2xl
                                            bg-black/35
                                            border border-emerald-300/20
                                            px-4 py-2
                                            backdrop-blur-md
                                        "
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-emerald-50 md:text-l">
                                                {l.title}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-300 font-semibold text-sm">
                                                {l.level}%
                                            </div>
                                            <div className="text-emerald-200/60 text-[10px]">
                                                {l.levelDescription}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Section >
    )
}
