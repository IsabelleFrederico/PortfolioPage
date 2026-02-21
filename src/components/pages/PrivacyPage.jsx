import { goToSection } from "../Routes/coordinator"
import { useNavigate } from "react-router-dom"

export default function PrivacyPage({ isProgrammaticNavRef }) {
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
            className=" h-4 md:h-5 w-auto select-none"
            draggable={false}
          />
        </div>

        <h1 className="mt-10 text-4xl md:text-5xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">1. Controller</h2>

          <p>
            Responsible for data processing on this website:
          </p>

          <p className="leading-relaxed">
            Isabelle Frederico Travasso <br />
            Schorndorf, Germany <br />
            Email: isa.frederico@gmail.com
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">2. Hosting</h2>

          <p className="leading-relaxed">
            This website is hosted by Netlify, Inc.
            When visiting the website, Netlify automatically collects technical data
            (server log files), including:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Date and time of access</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referrer URL</li>
          </ul>

          <p className="leading-relaxed">
            This data is processed to ensure technical functionality and security
            of the website.
          </p>

          <p className="font-medium">
            Legal basis: Art. 6(1)(f) GDPR (legitimate interest).
          </p>
          <p className="leading-relaxed">
            Further information can be found in Netlify’s Privacy Policy:
            https://www.netlify.com/privacy/
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">3. Contact</h2>

          <p className="leading-relaxed">
            If you contact me via email or contact form, the data you provide
            will be used solely to process your request.
          </p>

          <p className="font-medium">
            Legal basis: Art. 6(1)(b) GDPR (pre-contractual communication) and/or Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries).
          </p>

          <p className="leading-relaxed">
            Your data will not be shared with third parties.
          </p>

          <p className="leading-relaxed">
            I delete inquiries once they are no longer necessary for processing, unless statutory retention obligations apply.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">4. No Cookies / No Tracking</h2>

          <p className="leading-relaxed">
            This website does not use analytics tools, marketing cookies, or tracking pixels.
          </p>

          <p className="leading-relaxed">
            No personal data is processed beyond technically necessary server log files
            collected by the hosting provider (Netlify) for security and operational purposes.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">5. Data Security</h2>

          <p className="leading-relaxed">
            This website uses standard technical and organizational security
            measures to protect data against unauthorized access.
          </p>

          <p className="leading-relaxed">
            If a contact form is used, data transmission is encrypted via HTTPS.
          </p>
        </section>

        <section className="mt-12 space-y-4 mb-20">
          <h2 className="text-2xl font-bold">6. Your Rights under GDPR</h2>

          <p className="leading-relaxed">
            Under the GDPR, you have the following rights:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Right of access (Art. 15 GDPR)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>Right to object (Art. 21 GDPR)</li>
            <li>Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)</li>
          </ul>
        </section>

      </div>
    </main>
  )
}