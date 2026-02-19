export default function Laptop({
    src,
    title,
}) {

    return (
        <div className="w-full md:mt-10">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black flex items-center justify-center">
                    <video
                        src={src}
                        className="h-full max-w-[97%] object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        preload="metadata"
                        aria-label={`${title} demo video`}
                    />
                <div className="pointer-events-none absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-600" />
            </div>

            <div className="mx-auto mt-3 h-4 w-[85%] max-w-[640px] rounded-b-2xl bg-zinc-200 shadow-inner" />
            <div className="mx-auto h-2 w-[55%] max-w-[420px] rounded-b-2xl bg-zinc-300" />
        </div>
    )
}