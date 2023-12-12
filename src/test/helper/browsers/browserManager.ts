import {LaunchOptions, chromium, firefox, webkit} from "playwright/test";

function headlessStatus(): boolean {
    let hs = false;
    if(typeof (process.env.npm_config_HEAD) === "string") {
        if (process.env.npm_config_HEAD === "headless")
        hs = true;
        else if (process.env.npm_config_HEAD === "headed")
        hs = false;
    }
    return hs;
}


const options: LaunchOptions = {
    headless: headlessStatus(),
    timeout: 100000
}

export const invokeBrowser = () => {
    // const browserType = process.env.npm_config_BROWSER;
    const browserType = process.env.BROWSER;
    console.log(browserType)
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Incorrect browser type");
    }
}