# Playwright API Testing Framework

A weekend project to get familiar with Playwright, coming from a mobile testing background (Detox, XCUITest, Appium).

## What's in here

**ExpandTesting Notes API** — authenticated REST API. Covers user registration, login, logout, notes, and account deletion. Uses Playwright's fixture system for dependency injection and automatic test cleanup.

**PokéAPI** — public read-only API. No auth, used to explore schema validation and chaining multiple requests (e.g. fetching a Pokémon → species → evolution chain).

## Running the tests

```bash
yarn test:expandtesting
yarn test:pokeapi
yarn test
```
