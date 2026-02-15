import React from "react"
import { Link } from "react-router-dom"

export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <div className="text-xl">
            <Link to="/" className="text-slate-500 hover:text-slate-800">
              ← Back
            </Link>
          </div>

          {/* Logo top-right */}
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-5 w-auto select-none"
            draggable={false}
          />
        </div>

        <h1 className="mt-10 text-5xl font-extrabold tracking-tight">
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

        {/* Section 2 */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">2. Hosting</h2>

          <p className="leading-relaxed">
            This website is hosted by a third-party provider (e.g. Vercel / Netlify).
            When visiting the website, the hosting provider automatically collects
            technical data (server log files), including:
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
        </section>

        {/* Section 3 */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">3. Contact</h2>

          <p className="leading-relaxed">
            If you contact me via email or contact form, the data you provide
            will be used solely to process your request.
          </p>

          <p className="font-medium">
            Legal basis: Art. 6(1)(b) GDPR or Art. 6(1)(f) GDPR.
          </p>

          <p className="leading-relaxed">
            Your data will not be shared with third parties.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">4. No Cookies / No Tracking</h2>

          <p className="leading-relaxed">
            This website does not use tracking technologies, marketing cookies,
            or analytics tools.
          </p>

          <p className="leading-relaxed">
            No personal data is processed beyond technically necessary server log files.
          </p>
        </section>

        {/* Section 5 */}
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

        {/* Section 6 */}
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