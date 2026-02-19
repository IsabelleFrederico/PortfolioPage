import { motion } from "motion/react"
import { About } from "./sections/About"
import { Contact } from "./sections/Contact"
import { Projects } from "./sections/Projects"
import { Skills } from "./sections/Skills"
import { EndFooter } from "./sections/EndFooter"

export const Section = ({ children, mobileTop, isLast }) => {

    return (<motion.section
        className={`
                w-screen
                ${isLast ? "h-[80px]" : "h-screen"}
                flex
                overflow-hidden
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
        <div className={`w-full flex flex-col ${isLast ? "" : "justify-center"} `}>
            {children}
        </div>
    </motion.section>
    )
}

export function Interface({ setSection, section }) {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <About setSection={setSection} />
            <Skills />
            <Projects />
            <Contact />
            <EndFooter setSection={setSection} />
        </div>
    )
}