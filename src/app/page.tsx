import { ArrowRight } from "lucide-react"; // 상단에 임포트 잊지 마세요!

export default function HomePage() {
    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-background overflow-hidden">
            <div className="h-full w-full flex flex-col justify-center px-8 md:px-20 lg:px-40">
                <div className="flex flex-col md:flex-row items-center md:items-end w-full">

                    {/* 1. 텍스트 영역 */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tighter leading-[0.9] text-foreground">
                            Build Your<br />
                            Side Projects<br />
                            With The<br />
                            Best Team
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-foreground/70 font-medium tracking-tighter leading-snug max-w-[85%]">
                            Stop wandering alone in search of inspiration. Join a vibrant community
                            where passionate developers, creative designers, and strategic PMs
                            collide to turn raw ideas into reality.
                        </p>
                    </div>

                    {/* 2. 버튼 영역: 아이콘 추가 및 그룹 호버 효과 */}
                    <div className="mt-10 md:mt-0 md:ml-10 lg:ml-auto md:mb-12 lg:mb-4 w-full md:w-auto flex justify-start">
                        <a
                            href="/posts"
                            className="group relative inline-flex items-center gap-2 px-10 py-4 border-2 border-foreground
                       bg-transparent text-foreground text-base font-bold uppercase
                       overflow-hidden"
                        >
                            {/* Highlighter fill background - slides in from left on hover */}
                            <span
                                className="absolute inset-0 bg-[#a1f27b] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                aria-hidden="true"
                            />
                            {/* Button text with underline effect */}
                            <span className="relative z-10">
                                <span className="bg-[linear-gradient(#a1f27b,#a1f27b)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_3px] pb-0.5">
                                    Start Building Now
                                </span>
                            </span>
                            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
