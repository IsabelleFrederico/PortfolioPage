import { Section } from "../Interface"
import { motion } from "motion/react"

export const About = (props) => {
    const { setSection } = props
    return (
        <Section>
            <h1 className="text-5xl font-extrabold leading-snug text-stone-800">
                Hi, I'm
                <br />
                <span className="bg-stone-50 px-0.5 py-0.5 rounded-md italic">Isabelle F Travasso</span>
            </h1>
            <motion.p
                className="text-lg text-gray-600 mt-4"
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
                    delay: 1.5,
                }}
            >
                Software developer focused on building
                <br />
                reliable and user-friendly applications.
            </motion.p>
            <motion.button
                onClick={() => setSection(3)}
                className={`cursor-pointer bg-emerald-700 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-16`}
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
                    delay: 2,
                }}
            >
                Contact me
            </motion.button>
        </Section>
    )
}