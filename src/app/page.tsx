import { ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-background overflow-hidden">
            {/* Decorative shapes - subtle neo-brutalist geometric accents */}
            <div className="absolute top-20 right-20 w-32 h-32 border-4 border-primary/20 rounded-md rotate-12 hidden lg:block" />
            <div className="absolute bottom-32 right-40 w-16 h-16 bg-secondary/15 rounded-md -rotate-6 hidden lg:block" />
            <div className="absolute top-40 right-60 w-8 h-8 bg-primary/25 rounded-sm hidden lg:block" />

            <div className="h-full w-full flex flex-col justify-center px-8 md:px-20 lg:px-40">
                <div className="flex flex-col md:flex-row items-center md:items-end w-full">

                    {/* 1. Text area */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                        {/* Small label tag */}
                        <span className="inline-block w-fit px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest
                                       bg-primary/15 text-primary border-2 border-primary/30 rounded-md">
                            Side Projects Hub
                        </span>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
                            Build Your<br />
                            <span className="text-primary">Side Projects</span><br />
                            With The<br />
                            Best Team
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-muted-foreground font-medium tracking-tight leading-relaxed max-w-[85%]">
                            Stop wandering alone in search of inspiration. Join a vibrant community
                            where passionate developers, creative designers, and strategic PMs
                            collide to turn raw ideas into reality.
                        </p>
                    </div>

                    {/* 2. Button area */}
                    <div className="mt-10 md:mt-0 md:ml-10 lg:ml-auto md:mb-12 lg:mb-4 w-full md:w-auto flex justify-start">
                        <a
                            href="/posts"
                            className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-primary
                                     bg-primary text-primary-foreground text-base font-bold uppercase tracking-wide
                                     rounded-md shadow-[4px_4px_0px_0px] shadow-primary/40
                                     transition-all duration-150
                                     hover:shadow-[2px_2px_0px_0px] hover:shadow-primary/40 hover:translate-x-[2px] hover:translate-y-[2px]
                                     active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                        >
                            Start Building Now
                            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
