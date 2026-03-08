import { test as base, expect } from "@playwright/test"
import { UserHelper } from "./helpers/UserHelper"

type MyFixtures = {
    userHelper: UserHelper
}

export const test = base.extend<MyFixtures>({
    userHelper: async ({ request }, use) => {
        const userHelper = new UserHelper(request)
        await use(userHelper);
    }
})