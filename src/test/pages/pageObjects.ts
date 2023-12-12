import { Browser, BrowserContext, Page } from "@playwright/test";
import { page, browser, context } from "./browser";

export class PageObject {
    static async navigateToUrl() {
        // let url = typeof (process.env.npm_config_BASEURL) === 'string' ? process.env.npm_config_BASEURL : "null";
        let url = typeof (process.env.BASEURL) === 'string' ? process.env.BASEURL : "null";
        console.log(url);
        await page.goto(url, { timeout: 100000, waitUntil: "domcontentloaded"});
    }
}