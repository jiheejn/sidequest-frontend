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
                            className="group inline-flex items-center gap-2 px-10 py-4 border-2 border-foreground
                       bg-foreground text-background text-base font-bold uppercase
                       transition-colors duration-200 hover:bg-transparent hover:text-foreground"
                        >
                            Start Building Now
                            {/* 호버 시 화살표가 오른쪽으로 살짝 움직이는 애니메이션 추가 */}
                            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
