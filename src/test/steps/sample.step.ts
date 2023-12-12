import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import { PageObject } from "../pages/pageObjects";
import { page, logger } from "../pages/browser";
import * as user from '../helper/testData/Users.json';

setDefaultTimeout(60 * 1000 * 2);

Given('user navigates to the application', async() =>{
    await PageObject.navigateToUrl();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    //logger.info("Going to the traget application");
});
