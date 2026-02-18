import { motion } from "motion/react"

export function LogoButton({ section = 0, setSection }) {
    const show = section >= 1

    const goHome = () => {
        setSection?.(0)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (!show) return null

    return (
        <>
            {show && (
                <motion.button
                    type="button"
                    onClick={goHome}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    aria-label="Back to Home"
                    className="absolute top-6 left-10 z-[999999] cursor-pointer select-none rounded-xl p-3 "
                >
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className={`
                            h-4 md:h-5 w-auto
                            transition-opacity
                            `}
                        draggable={false}
                    />
                </motion.button>
            )}
        </>
    )
}