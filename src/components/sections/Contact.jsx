import { Section } from "../Interface"
import { motion } from "motion/react"
import { FiMail } from "react-icons/fi"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"

export const Contact = () => {
    return (
        <Section>
            <div className="mb-120 mt-40 md:mt-20 ml-4 md:ml-15">
                <h2 className="text-3xl md:text-5xl font-bold mb-0">Contact me</h2>
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
                    transition={{ duration: 0.6 }}
                >
                    <motion.a
                        href="mailto:seuemail@email.com"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 md:w-14 h-12 md:h-14 rounded-full 
                               bg-[#f3eadf] text-neutral-900 
                               flex items-center justify-center
                               transition-colors hover:bg-[#e7dccf]"
                    >
                        <FiMail size={20} />
                    </motion.a>

                    <motion.a
                        href="https://github.com/seuusuario"
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
                        href="https://linkedin.com/in/seuusuario"
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