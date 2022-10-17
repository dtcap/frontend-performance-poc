const { test, expect } = require('@playwright/test');

test('Navigation Timing', async ({ page }) => {
  await page.goto('https://capgemini.com/');

  const navigationTiming = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'), null, '\t')
  )

  test.info().annotations.push({ type: 'Navigation Timings', description: navigationTiming })

});

test('Resource Timing', async ({ page }) => {
  await page.goto('https://capgemini.com/');

  const resourceTiming = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('resource'), null, '\t')
  )

  test.info().annotations.push({ type: 'Resource Timings', description: resourceTiming })

});

test('Paint Timing', async ({ page }) => {
  await page.goto('https://capgemini.com/');

  const paintTiming = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('paint'), null, '\t')
  )

  test.info().annotations.push({ type: 'Paint Timings', description: paintTiming })

});

test('Largest Contentful Paint', async ({ page }) => {
  await page.goto('https://capgemini.com/');

  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((l) => {
        const entries = l.getEntries()
        // the last entry is the largest contentful paint
        const largestPaintEntry = entries.at(-1)
        resolve(largestPaintEntry.startTime)
      }).observe({
        type: 'largest-contentful-paint',
        buffered: true
      })
    })
  })

  test.info().annotations.push({ type: 'LCP', description: lcp })

});

test('Cumulative Layout Shift', async ({ page }) => {
  await page.goto('https://capgemini.com/');

  const cls = await page.evaluate(() => {
    return new Promise((resolve) => {
      let CLS = 0

      new PerformanceObserver((l) => {
        const entries = l.getEntries()

        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            CLS += entry.value
          }
        })

        resolve(CLS)
      }).observe({
        type: 'layout-shift',
        buffered: true
      })
    })
  })

  test.info().annotations.push({ type: 'CLS', description: cls })

});

test('Total Blocking Time', async ({ page }) => {
  await page.goto('https://capgemini.com/');

  const tbt = await page.evaluate(() => {
    return new Promise((resolve) => {
      let totalBlockingTime = 0
      new PerformanceObserver(function (list) {
        const perfEntries = list.getEntries()
        for (const perfEntry of perfEntries) {
          totalBlockingTime += perfEntry.duration - 50
        }
        resolve(totalBlockingTime)
      }).observe({ type: 'longtask', buffered: true })

      // Resolve promise if there haven't been long tasks
      setTimeout(() => resolve(totalBlockingTime), 5000)
    })
  })

  test.info().annotations.push({ type: 'TBT', description: tbt })

  expect(tbt).toBeLessThan(200)
});