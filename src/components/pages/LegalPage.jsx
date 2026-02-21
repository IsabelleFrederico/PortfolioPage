import { goToSection } from "../routes/coordinator"
import { useNavigate } from "react-router-dom"

export default function LegalPage({ isProgrammaticNavRef }) {
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
          Provider identification according to § 5 DDG
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
        <h3 className="mt-10 text-2xl font-bold">3. Liability for Content</h3>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          The contents of this website have been created with the greatest possible care.
          However, I cannot guarantee the accuracy, completeness, or timeliness of the content.
        </p>
        <h3 className="mt-10 text-2xl font-bold">4. Liability for Links</h3>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          This website contains links to external third-party websites.
          I have no influence over the contents of those websites.
          Therefore, I cannot accept any liability for external content.
          The respective provider or operator of the linked pages is always responsible
          for their content.
        </p>
        <h3 className="mt-10 text-2xl font-bold">5. Copyright</h3>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          The content and works created by the site operator on this website are subject
          to German copyright law.
          Third-party content is identified as such.
          If you become aware of a copyright infringement, please inform me.
          Upon notification of violations, I will remove such content immediately.
        </p>
      </div>
    </main>
  )
}