import { test } from "./Fixtures";

test.describe(`Delete Account Flow`, () => {
    test(`Delete account successfully`, async ({ userHelper }) => {
        await userHelper.registerUser()
        await userHelper.login()
        await userHelper.deleteAccount()
    })

    test(`Delete account fails without token`, async ({ userHelper }) => {
        await userHelper.deleteAccount({ token: '', expectedStatus: 401 })
    })

    test(`Delete account fails with invalid token`, async ({ userHelper }) => {
        await userHelper.deleteAccount({ token: 'InvalidToken', expectedStatus: 401 })
    })
})