import { motion } from "motion/react"
import { About } from "./sections/About"
import { Contact } from "./sections/Contact"
import { ProjectsSection } from "./sections/ProjectsSection"
import { Skills } from "./sections/Skills"

export const Section = (props) => {
    const { children } = props

    return (
        <motion.section
            className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
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
            {children}
        </motion.section>
    )
}

export function Interface(props) {
    const { setSection } = props;
    return (
        <div className="flex flex-col items-center w-screen">
            <About setSection={setSection}/>
            <Skills />
            <ProjectsSection />
            <Contact />
        </div>
    )
}







