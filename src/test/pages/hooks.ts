import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import {Browser, BrowserContext, Page, chromium} from "playwright/test";
import {invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { Logger, createLogger} from 'winston';
import { options } from "../helper/logger/logger";
import fs from "fs-extra";


export let page: Page;
export let context: BrowserContext;
export let browser: Browser;
export let logger: Logger;

/* this overrides the environment variable and fetches if from env/.env.preProd file
invokeBrowser function launches the specific browser as per the value from env/.env.preProd */
BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

/* starts the recording of the video before the start of the scenario in the specified path 'dir' */
Before(async function ({ pickle }){

    let scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos"
        }
    });

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true
    })

    page = await context.newPage();
    logger =  createLogger(options(scenarioName));
});


AfterStep(async function ({ pickle }) {
     
    let scenarioName = pickle.name + pickle.id;
    //to take ss after each step and save it the specified path
    const img = await page.screenshot({path: "./ScreenShots/" + scenarioName + ".png", type: "png"});
    //attach the ss to html report
    await this.attach(img, "img/png")
});

After(async function ({ pickle, result}){

    let temp = await page.video()?.path();
    let videoPath = typeof (temp) === "string" ? temp : "null";

    const tracePath = `./test-results/trace/${pickle.id}.zip`;
    await context.tracing.stop({path: tracePath});

    //attach the video to the html report and trace if the scenario is failed
    if (result?.status === Status.FAILED) {
        this.attach(fs.readFileSync(videoPath), "video/webm");
        const traceFilelink = `<a href="https://trace.playwright.dev/">open ${tracePath}</a>`
        this.attach(`Trace file: ${traceFilelink}`, 'text/html');
    }

    await page.close();
    await context.close();
});

AfterAll(async function () {

    await browser.close();
});