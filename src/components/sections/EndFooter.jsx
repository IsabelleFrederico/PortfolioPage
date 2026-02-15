import { motion } from "motion/react"
import { FiArrowUp } from "react-icons/fi"
// import { Link } from "react-router-dom"

export function EndFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <motion.footer
      className="mt-0 w-full bg-[#f6efe6] py-8 md:py-10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.1 },
      }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <div className="flex flex-col items-center gap-5 text-neutral-800">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-900/5 transition active:scale-95"
          >
            <FiArrowUp className="text-xl" />
          </button>

          <div className="flex items-center gap-10 text-base font-medium">
            <a href="/privacy" className="hover:underline underline-offset-4">
              Privacy
            </a>
            <a href="/legal" className="hover:underline underline-offset-4">
              Legal Notice
            </a>
          </div>

          <p className="text-sm text-neutral-600">© 2026 Isabelle F. Travasso</p>
        </div>
      </div>
    </motion.footer>
  )
}
