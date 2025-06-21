import { Page } from '@playwright/test'

export async function delayApi(page: Page, url: string, ms: number = 300) {
  await page.route(url, async (route) => {
    await new Promise((r) => setTimeout(r, ms))
    route.continue()
  })
}
