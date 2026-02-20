export default function BackgroundProjectDetails() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

            <div className="absolute right-[-120px] top-20 h-[340px] w-[340px]">
                <div className="relative h-full w-full">

                    <div className="absolute inset-0 rounded-full
                        bg-[linear-gradient(#c9f3e6_0%,#6fbca5_35%,#3f887a_70%,#2e6f63_100%)]" />

                    <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full blur-[20px]
                        bg-[linear-gradient(#e7fff7_10%,#4fae97_50%,#2e6f63_100%)]" />

                    <div className="absolute left-1/2 bottom-[-110px]
                        h-[70px] w-[85%] -translate-x-1/2
                        rounded-full bg-black/30 blur-[18px]" />
                </div>
            </div>


            <div className="absolute left-[-80px] bottom-20 h-[220px] w-[220px]">
                <div className="relative h-full w-full">

                    <div className="absolute inset-0 rounded-full
                        bg-[linear-gradient(#d7fff1_0%,#7ccbb4_40%,#3f887a_80%)]" />

                    <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full blur-[15px]
                        bg-[linear-gradient(#ffffff_5%,#4fae97_60%,#2e6f63_100%)]" />
                </div>
            </div>


            <div className="absolute left-1/3 top-[-60px] h-[140px] w-[140px]">
                <div className="relative h-full w-full">

                    <div className="absolute inset-0 rounded-full
                         bg-[linear-gradient(#eafff7_0%,#6fbca5_60%,#3f887a_100%)]" />   

                    <div className="absolute left-1/2 top-1/2 h-[100px] w-[100px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full blur-[12px]
                        bg-[linear-gradient(#ffffff_0%,#5ab8a3_80%)]" />
                </div>
            </div>

        </div>
    )
}
