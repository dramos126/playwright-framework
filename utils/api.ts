import { APIRequestContext, expect } from '@playwright/test'

export async function getJson(request: APIRequestContext, url: string, expectedStatus = 200): Promise<any> {
  const response = await request.get(url)
  expect(response.status()).toBe(expectedStatus)
  return response.json()
}
