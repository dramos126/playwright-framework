import { test } from "./Fixtures";


test.describe(`Logout Flow`, () => {
    test(`Logout successfully`, async ({ userHelper }) => {
        await userHelper.registerUser()
        await userHelper.login()
        await userHelper.logout()
    })

    test(`Logout fails without token`, async ({ userHelper }) => {
        await userHelper.logout({ token: '', expectedStatus: 401 })
    })

    test(`Logout fails with invalid token`, async ({ userHelper }) => {
        await userHelper.logout({ token: 'invalidtoken', expectedStatus: 401 })
    })
})