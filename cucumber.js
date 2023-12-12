module.exports = {
    default: {
        //"Specifies the scenario with specific tage to be executed npm test --TAGS="@Test""
        tags: process.env.npm_config_TAGS || "@Test",
        //"specifies the format of step definitions generated if not present"
        formatOptions: {
            snippetInterface: "async-await"
        },
        //"Specifies the files paths for the feature files"
        paths: [
            "src/test/features"
        ],
        //Specifies the file paths for the .step and .page files"
        require:[
            "src/test/steps/*.ts",
            "src/test/pages/*.ts"
        ],
        //"Specifies the format of the output report"
        format: [
            "cucumber-console-formatter",
            "html:test-results/cucumber-html.html",
            "json:test-results/cucumber-json.json",
            "rerun:@rerun.txt"
        ],
        //"suppress verbose output during test execution"
        publishQuiet: true,
        //"checks the feature have valid steps definitions without executing them"
        dryRun: false,
        //"this is a specific option within the cucumber.js file that instructs cucumber to use ts-node to register your typscript step definition and hooks before running your tests"
        requireModule: [
            "ts-node/register"
        ],
        //"Treast undifined and pending steps as error"
        strict: true,
        prallel:1,
        monochrome: true
    },
    
    //"Config for rerunning the failed Scenarios"
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        format: [
            "cucumber-console-formatter",
            "html:test-results/cucumber-html.html",
            "json:test-results/cucumber-json.json",
            "rerun:@rerun.txt"
        ],
        publishQuiet: true,
        dryRun: false,
        requireModule: [
            "src/test/steps/*.ts",
            "src/test/pages/*.ts"
        ],
        requireModule: [
            "ts-mode/register"
        ],
        use: {
            headless: false,
            viewport: {
                width: 1280,
                height: 720
            }
        },
        strict: true,
        prallel: 1
    }
}