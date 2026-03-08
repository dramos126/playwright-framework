import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'expandtesting',
      testMatch: '**/api/expandtesting/**/*.spec.ts',
      use: { baseURL: 'https://practice.expandtesting.com' },
    },
    {
      name: 'pokeapi',
      testMatch: '**/api/pokeapi/**/*.spec.ts',
      use: { baseURL: 'https://pokeapi.co/api' },
    },
  ],
})
