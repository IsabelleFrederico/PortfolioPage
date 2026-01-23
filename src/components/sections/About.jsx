import { Section } from "../Interface"
import { motion } from "motion/react"

export const About = () => {
    return (
        <Section>
            <h1 className="text-6xl font-extrabold leading-snug">
                Hi, I'm
                <br />
                <span className="bg-white px-1 italic">Wawa Sensei</span>
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
                I make YouTube videos to help developers
                <br />
                learn how to build 3D apps
            </motion.p>
            <motion.button
                className={`cursor-pointer bg-indigo-600 text-white py-4 px-8 
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