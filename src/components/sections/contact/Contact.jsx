import { Section } from "../../Interface"
import { motion, AnimatePresence } from "motion/react"
import { FiMail, FiCopy, FiCheck } from "react-icons/fi"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { useState, useRef } from "react"

export const Contact = () => {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const timerRef = useRef(null)

    const email = "isa.frederico@gmail.com"

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email)
        setCopied(true)

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        setTimeout(() => {
            setCopied(false)
            setOpen(false)
        }, 600)
    }

    return (
        <Section>
            <div className="mb-100 mt-40 md:mt-20 ml-4 md:ml-15">
                <h2 className="text-3xl md:text-4xl font-bold mb-0">Contact me</h2>
                <motion.p
                    className="md:text-lg text-gray-800 mt-4"
                >
                    It would be a pleasure to
                    <br />
                    work with you!
                </motion.p>
                <motion.div
                    className="flex gap-6 mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <motion.button
                        onClick={() => setOpen(!open)}
                        whileHover={{ scale: 1.1 }}
                        className="w-12 md:w-14 h-12 md:h-14 rounded-full 
                            bg-[#f3eadf] text-neutral-900 
                            flex items-center justify-center
                            transition-colors hover:bg-[#e7dccf]"
                    >
                        <FiMail size={20} />
                    </motion.button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute mt-20 
                                    bg-[#f3eadf] shadow-xl rounded-xl 
                                    px-4 py-3 flex items-center gap-3
                                    text-sm"
                            >
                                <span className="font-medium">{email}</span>

                                <button
                                    onClick={handleCopy}
                                    className="cursor-pointer flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition"
                                >
                                    {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.a
                        href="https://github.com/isabellefrederico"
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 md:w-14 h-12 md:h-14 rounded-full 
                               bg-[#f3eadf] text-neutral-900 
                               flex items-center justify-center
                               transition-colors hover:bg-[#e7dccf]"
                    >
                        <FaGithub size={20} />
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/isabelletravasso/"
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 md:w-14 h-12 md:h-14 rounded-full 
                               bg-[#f3eadf] text-neutral-900 
                               flex items-center justify-center
                               transition-colors hover:bg-[#e7dccf]"
                    >
                        <FaLinkedinIn size={18} />
                    </motion.a>
                </motion.div>
            </div>
        </Section>
    )
}