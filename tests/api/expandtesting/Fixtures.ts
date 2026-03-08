import { test as base, expect } from "@playwright/test"
import { UserHelper } from "./helpers/UserHelper"
import { NoteHelper } from "./helpers/NoteHelper"

type MyFixtures = {
    userHelper: UserHelper
    notesHelper: NoteHelper
}

export const test = base.extend<MyFixtures>({
    userHelper: async ({ request }, use) => {
        const userHelper = new UserHelper(request)
        await use(userHelper)
        if (userHelper.token) {
            await userHelper.deleteAccount()
        }
    },

    notesHelper: async ({ request, userHelper }, use) => {
        const notesHelper = new NoteHelper(request, userHelper)
        await use(notesHelper);
    }
})