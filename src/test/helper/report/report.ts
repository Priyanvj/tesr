import {time} from "console";

const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "./test-results/reports/",
    reportName: "PlayWright Automation Report",
    displayDuration: time,
    metadata: {
        browser:{
            name: "chrome",
            version: "119",
        },
        device: "Local Test Machine",
        platform: {
            name: "Mac OS",
            version: "dont know",
        },
    },
    customerData: {
        title: "Run info",
        data: [
            {label: "Project", value: "Customer project"},
            {label: "Release", value: "1.2.3"},
            {label: "Cycle", value: "B11221.34321"},
            {label: "Execution Start Time", value: Date()}
        ]
    }

})