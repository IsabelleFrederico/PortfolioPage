import { Section } from "../Interface"
import { motion } from "motion/react"

export const About = (props) => {
    const { setSection } = props
    return (
        <Section>
            <div className="pb-70 md:pb-0">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-snug text-stone-800 ">
                    Hi, I'm
                    <br />
                    <span className="bg-stone-50 md:px-0.5 md:py-0.5 rounded-md italic">Isabelle F. Travasso</span>
                </h1>
                <motion.p
                    className="md:text-lg text-gray-800 mt-4"
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 1.2,
                    }}
                >
                    Software developer focused on building
                    <br />
                    reliable and user-friendly applications.
                </motion.p>
                <motion.button
                    onClick={() => setSection(3)}
                    className={`bg-emerald-700 text-sm md:text-lg text-white text-base py-4 px-8 rounded-lg font-semibold mt-5 md:mt-16 w-fit cursor-pointer`}
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 1,
                    }}
                >
                    Contact me
                </motion.button>
            </div>
        </Section>
    )
}