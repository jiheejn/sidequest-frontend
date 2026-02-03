import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // 폰트 설정 추가
            fontFamily: {
                sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"], // 기본 본문 (Medium 느낌)
                logo: ["var(--font-logo)", "cursive"],                  // 로고 (Caprasimo)
                accent: ["var(--font-accent)", "serif"],                // 랜딩 강조 (Alfa Slab One)
            },
            /*
             * [중요!]
             * `@theme inline`을 사용하기 때문에 'colors' 객체는 삭제해야 합니다.
             * 플러그인이 자동으로 CSS 변수를 읽어 색상 클래스를 생성합니다.
             */
            // colors: { ... }  <- 이 부분을 삭제!

            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },

            /*
             * [중요!]
             * 'backgroundImage'는 'colors'가 아니므로 여기에 정의해야
             * `bg-grid-pattern`과 `bg-purple-gradient`를 사용할 수 있습니다.
             */
        },
    },

    /* * [중요!]
     * `plugins` 배열에 `@theme inline`을 제공하는 플러그인이
     * (예: require("tailwindcss-theming")) 설치되어 있어야 합니다.
     * `tw-animate-css`를 사용하시므로 'tailwindcss-animate'도 필요할 수 있습니다.
     */
    plugins: [
        // require("tailwindcss-animate")
        // 여기에 `@theme inline` 플러그인이 이미 설정되어 있다고 가정합니다.
    ],
}

export default config