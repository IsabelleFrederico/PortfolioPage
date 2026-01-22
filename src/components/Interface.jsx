const Section = (props) => {
    const { children } = props

    return (
        <section className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto
        flex flex-col items-start justify-center`}>
            {children}
        </section>
    )
}

export function Interface() {
    return (
        <div className="flex flex-col items-center w-screen">
            <AboutSection />
            <SkillsSection />
            <Section>
                <h1>Projects</h1>
            </Section>
            <Section>
                <h1>Contact</h1>
            </Section>
        </div>
    )
}

const AboutSection = () => {
    return (
        <Section>
            <h1 className="text-6xl font-extrabold leading-snug">
                Hi, I'm
                <br />
                <span className="bg-white px-1 italic"> Isabelle F Travasso</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4">
                bxuuciduis
                <br />
                learn
                <button className={`bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16`}>
                    Contact me
                </button>
            </p>
        </Section>
    )
}

const skills = [
    {
        title: "React",
        level: 75,
        levelDescription: "advanced"
    },
    {
        title: "JavaScript",
        level: 75,
        levelDescription: "advanced"
    },
    {
        title: "TypeScript ",
        level: 65,
        levelDescription: "intermediate"
    },
    {
        title: "REST APIs",
        level: 75,
        levelDescription: "advanced"
    },
    { 
        title: "Python",
        level: 65,
        levelDescription: "intermediate"
    },
    {
        title: "SQL",
        level: 60,
        levelDescription: "intermediate"
    },
    {
        title: "Node.js",
        level: 40,
        levelDescription: "basic"
    },
    {
        title: "Docker",
        level: 35,
        levelDescription: "basic"
    },
    {
        title: "HTML5",
        level: 75,
        levelDescription: "advanced"
    },
    {
        title: "CSS3",
        level: 75,
        levelDescription: "advanced"
    },
    {
        title: "Git, GitHub, GitLab",
        level: 75,
        levelDescription: "advanced"
    },
    {
        title: "Postman",
        level: 70,
        levelDescription: "advanced"
    },
    {
        title: "Power BI",
        level: 85,
        levelDescription: "advanced"
    },
    {
        title: "Test strategies",
        level: 60,
        levelDescription: "intermediate"
    },
    {
        title: "Functional testing",
        level: 85,
        levelDescription: "advanced"
    },
    {
        title: "Production validation",
        level: 80,
        levelDescription: "advanced"
    },
    {
        title: "Error analysis & troubleshooting",
        level: 80,
        levelDescription: "advanced"
    },
]

const languages = [
    {
        title: "Portuguese",
        level: 100,
        levelDescription: "Native"
    },
    {
        title: "English",
        level: 75,
        levelDescription: "Advanced"
    },
    {
        title: "German",
        level: 45,
        levelDescription: "Gut"
    }
]

const SkillsSection = () => {
    return (
        <Section>
            <h1 className="text-6xl font-extrabold leading-snug">
                Hi, I'm
                <br />
                <span className="bg-white px-1 italic"> Isabelle F Travasso</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4">
                bxuuciduis
                <br />
                learn
                <button className={`bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16`}>
                    Contact me
                </button>
            </p>
        </Section>
    )
}