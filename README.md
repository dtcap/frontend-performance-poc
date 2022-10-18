# Automated Collection of Frontend Performance Metrics

This is a demo on how varions performance metrics can be collected using real browsers in automated manner

## Purpose

This is a demo project which uses [Playwright](https://playwright.dev/) framework to open a web page and run several tests demonstrating the ability to fetch various client-side performance indicators

The following metrics are implemented as of now:

1. [Navigation Timing](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)
2. [Resource Timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API)
3. [Paint Timing](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming)
4. [Largest Contentful Paint](https://web.dev/lcp/)
5. [Cumulative Layout Shift](https://web.dev/cls/)
6. [Total Blocking Time](https://web.dev/tbt/)


## Pre-Requisities

The project requires [NodeJS](https://nodejs.org/en/) 14 or higher to be present on the machine along with NPM

In order to run the tests the following software is needed:

1. [playwright/test](https://www.npmjs.com/package/@playwright/test) package which can be installed using the following command

       npm install -D@playwright/test
2. Browsers (i.e. Chrome, Firefox, Safari, etc.) which can be installed using the following command:

       npx playwright install

## Tests Execution

It's sufficient to run the following command to kick off the tests 

    npx playwright test


## Test Report

Once tests are finished the result will be open in your default browser. If it doesn't happen the HTML report will be available under `playwright-report` folder as a single file `index.html`

At the only one assertion is implemented: check that Total Blocking Time is below 200 milliseconds, other metrics are just added to test annotations section in the report. 


### TBD

1. Currently only one assertion of one metric is implemented for demo purposes:

       expect(tbt).toBeLessThan(200)

    depending on what exactly needs to be monitored more assertions can be added so test could be automatically marked as failed if monitored values exceed the threshold
2. Captured metrics are being stored in test annotations, it worth dumping them to i.e. CSV file so it would be possible to compare historic data, build trends, plot charts, etc.
3. Continuous integration. It makes sense to run the test periodically to check performance degradations            