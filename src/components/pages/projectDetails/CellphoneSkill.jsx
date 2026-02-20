export default function CellphoneSkill({ src, title }) {
  return (
    <div className="w-full">
      <div className="relative mx-auto w-[200px] rounded-[2.6rem] bg-black p-[3px] shadow-2xl">
        
        <div className="relative rounded-[2.3rem] bg-zinc-900 p-[3px]">
          
          <div className="overflow-hidden rounded-[2rem] bg-black">
            <video
              src={src}
              className="h-[360px] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              aria-label={`${title} demo video`}
            />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
