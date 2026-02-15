import { Section } from "../Interface"
import { languages, skills } from "../../utils/constants"

export function Skills() {

    return (
        <Section>
            <div className="w-full h-full overflow-hidden md:mt-5">
                <div className="h-full overflow-y-auto no-scrollbar px-4 md:px-15">

                    <div className="grid grid-cols-1 md:pr-0 md:grid-cols-3 gap-10">

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Skills
                            </h2>

                            <div className="space-y-4">
                                {skills.map((s) => (
                                    <div
                                        key={s.id}
                                        className="flex items-center gap-3 max-w-[180px] md:max-w-xs rounded-2xl bg-black/35 border border-emerald-300/20 px-4 py-3 backdrop-blur-md"
                                    >
                                        <img src={s.iconWhite} className="h-6 w-6" />
                                        <span className="text-emerald-50 md:text-xl">
                                            {s.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block" />

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Languages
                            </h2>

                            <div className="space-y-4">
                                {languages.map((l) => (
                                    <div
                                        key={l.id}
                                        className="flex items-center gap-3 max-w-2xs md:max-w-xs rounded-2xl bg-black/35 border border-emerald-300/20 px-4 py-3 backdrop-blur-md"
                                    >
                                        <span className="text-emerald-50 md:text-xl">
                                            {l.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Section>
    )
}
