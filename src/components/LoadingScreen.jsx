import { useProgress } from "@react-three/drei"
import { useEffect, useMemo } from "react"

export const LoadingScreen = ({ started, setStarted }) => {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setStarted(true), 500)
      return () => clearTimeout(t)
    }
  }, [progress, setStarted])

  const pct = useMemo(() => Math.min(100, Math.max(0, Math.round(progress))), [progress])

  return (
    <div
      className={[
        "fixed inset-0 z-50 transition-opacity duration-700",
        "flex items-center justify-center",
        "pointer-events-none",
        started ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-200 via-teal-200 to-emerald-200" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

      </div>

      <div className="relative w-[92%] max-w-[560px] rounded-[28px] bg-emerald-950/25 backdrop-blur-xl shadow-2xl border border-white/20 px-7 py-8 md:px-10 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <span className="font-black text-emerald-50 text-lg">&lt;/&gt;</span>
            </div>
            <div>
              <p className="text-emerald-50 font-bold text-lg leading-tight">Loading</p>
              <p className="text-emerald-50/70 text-sm">Preparing the 3D experience</p>
            </div>
          </div>

          <div className="text-emerald-50/90 font-bold text-xl tabular-nums">{pct}%</div>
        </div>

        <div className="mt-7">
          <div className="h-3 w-full rounded-full bg-black/20 border border-white/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-300/80 progress-shine"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-emerald-50/75">
            <span className="flex items-center gap-2">
              Loading assets
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className="hidden md:block">React • R3F • Drei</span>
          </div>
        </div>
      </div>

      <style>{`
        /* blobs */
        .blob {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          filter: blur(18px);
          opacity: 0.55;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(16,185,129,0.25), rgba(20,184,166,0.15));
          animation: floaty 7s ease-in-out infinite;
        }
        .blob-1 { top: -60px; left: -60px; animation-delay: 0s; transform: scale(1.05); }
        .blob-2 { top: 18%; right: -80px; width: 260px; height: 260px; animation-delay: 1.2s; }
        .blob-3 { bottom: -90px; left: 22%; width: 300px; height: 300px; animation-delay: 2.2s; opacity: 0.45; }

        @keyframes floaty {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-18px,0) scale(1.03); }
        }

        /* ring suave no fundo */
        .ring-soft {
          position: absolute;
          inset: 0;
          margin: auto;
          width: min(72vw, 680px);
          height: min(72vw, 680px);
          border-radius: 9999px;
          border: 18px solid rgba(0,0,0,0.10);
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.10);
          opacity: 0.35;
          transform: translateY(10px);
        }

        /* “shine” na barra */
        .progress-shine {
          position: relative;
          overflow: hidden;
        }
        .progress-shine::after{
          content:"";
          position:absolute;
          top:0; left:-40%;
          width:40%;
          height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: shine 1.4s ease-in-out infinite;
        }
        @keyframes shine {
          0% { left: -45%; }
          100% { left: 105%; }
        }

        /* dots */
        .dots { display:inline-flex; gap:6px; align-items:center; }
        .dots i{
          width:6px; height:6px; border-radius:9999px;
          background: rgba(236,253,245,0.85);
          display:inline-block;
          animation: dot 1.0s ease-in-out infinite;
        }
        .dots i:nth-child(2){ animation-delay: .15s; opacity:.75; }
        .dots i:nth-child(3){ animation-delay: .30s; opacity:.55; }
        @keyframes dot {
          0%, 100% { transform: translateY(0); opacity: .55; }
          50% { transform: translateY(-4px); opacity: 1; }
        }

        /* acessibilidade: reduz animação */
        @media (prefers-reduced-motion: reduce){
          .blob, .progress-shine::after, .dots i { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
