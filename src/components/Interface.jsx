import { motion } from "motion/react"
import { About } from "./sections/About"
import { Contact } from "./sections/Contact"
import { Projects } from "./sections/Projects"
import { Skills } from "./sections/Skills"

export const Section = (props) => {
    const { children, mobileTop } = props

    return (
        <motion.section
            className={`
                h-screen w-screen 
                flex
                mb-1
                ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
            `}
            initial={{
                opacity: 0,
                y: 50,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    delay: 0.6,
                },
            }}
        >
            <div className="w-full p-8 flex flex-col justify-center">
                {children}
            </div>
        </motion.section>
    )
}

export function Interface(props) {
    const { setSection } = props;
    return (
        <div className="flex flex-col items-center w-screen">
            <About setSection={setSection} />
            <Skills /> 
            <Projects />
            <Contact />
        </div>
    )
}





