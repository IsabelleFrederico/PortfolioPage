import { goToSection } from "../routes/coordinator"
import { useNavigate } from "react-router-dom"

export default function LegalPage({isProgrammaticNavRef}) {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">

        <div className="flex items-start justify-between">
          <div className="text-xl">
            <button onClick={() => goToSection(navigate, 3, isProgrammaticNavRef)} className="cursor-pointer text-slate-500 hover:text-slate-800">
              ← Back
            </button>
          </div>

          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-4 md:h-5 w-auto select-none"
            draggable={false}
          />
        </div>

        <h1 className="mt-10 text-4xl md:text-5xl font-extrabold tracking-tight">
          Legal Notice
        </h1>

        <p className="mt-8 text-lg text-slate-700">
          Information according to § 5 TMG
        </p>

        <div className="mt-6 space-y-2 text-lg">
          <p className="font-medium">Isabelle Frederico Travasso</p>
          <p className="text-slate-700">
            Schorndorf, Baden-Württemberg, Germany
          </p>
          <p className="text-slate-700">
            Email:{" "}
            <a
              className="underline underline-offset-4 hover:text-slate-900"
              href="mailto:isa.frederico@gmail.com"
            >
              isa.frederico@gmail.com
            </a>
          </p>
        </div>

        <h2 className="mt-14 text-4xl font-extrabold tracking-tight">
          Website Terms and Conditions of Use
        </h2>

        <h3 className="mt-10 text-2xl font-bold">1. Terms</h3>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          By accessing this website, you agree to be bound by these terms and
          conditions and all applicable laws and regulations. If you do not
          agree with any of these terms, you are prohibited from using or
          accessing this site.
        </p>

        <h3 className="mt-10 text-2xl font-bold">2. Disclaimer</h3>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          The materials on this website are provided on an “as is” basis without
          warranties of any kind.
        </p>
      </div>
    </main>
  )
}