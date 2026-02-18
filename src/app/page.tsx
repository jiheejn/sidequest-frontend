import { ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="relative h-[calc(100vh-3.5rem)] w-full bg-background overflow-hidden">
            <div className="h-full w-full flex flex-col justify-center px-8 md:px-20 lg:px-40">
                <div className="flex flex-col md:flex-row items-center md:items-end w-full gap-16">

                    <div className="w-full md:w-3/5 flex flex-col justify-center text-left">
                        <div className="inline-flex items-center gap-2 w-fit px-3 py-1 mb-8 text-xs font-medium
                                       text-accent-foreground bg-accent/15 rounded-full">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            Side Projects Hub
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-foreground text-balance">
                            Build your side projects with the best team
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                            Stop wandering alone in search of inspiration. Join a vibrant community
                            where passionate developers, designers, and PMs collide to turn ideas into reality.
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                            <a
                                href="/posts"
                                className="group inline-flex items-center gap-2 px-6 py-3
                                         bg-primary text-primary-foreground text-sm font-medium
                                         rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Start Building
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </a>
                            <a
                                href="/posts"
                                className="inline-flex items-center gap-2 px-6 py-3
                                         text-sm font-medium text-foreground
                                         rounded-lg border border-border hover:bg-secondary transition-colors"
                            >
                                Browse Projects
                            </a>
                        </div>
                    </div>

                    {/* Right side: minimal decorative element */}
                    <div className="hidden md:flex flex-1 items-end justify-center pb-16">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-accent/8 rounded-2xl" />
                            <div className="absolute top-6 left-6 right-6 bottom-6 border border-accent/20 rounded-xl" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-foreground/80 transition-all" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
