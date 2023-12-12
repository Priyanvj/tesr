export { };


declare global {
        namespace NodeJS {
            interface ProcessEnv {
                BROWSER: "chrome" | "firefox" | "webkit",
                ENV: "env1" | "env2",
                BASEURL: string,
                HEAD: "true" | "false"
            }
        }
}