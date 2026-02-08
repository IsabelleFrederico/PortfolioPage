import { skills, languages } from '../../utils/constants'
import { Section } from "../Interface"
import { motion } from "motion/react"

export const Skills = () => {
    return (
        <Section>
            <motion.div
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-white">Skills</h2>
                        <div className=" mt-8 space-y-4">
                            {skills.map((skill, index) => (
                                <div className="w-full max-w-xs" key={index}>
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
                                        <h3 className="text-xl font-bold text-white" >
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
                        <h2 className="text-5xl font-bold text-white">Languages</h2>
                        <div className=" mt-8 space-y-4">
                            {languages.map((lng, index) => (
                                <div className="w-64" key={index}>
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
                                        <h3 className="text-xl font-bold text-white" >
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
        </Section>
    )
}