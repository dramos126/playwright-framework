import { test } from "./Fixtures";


test.describe(`User Creation Flow`, () => {
    let createdUserEmail: string

    test(`Create a new user and login`, async ({ userHelper }) => {
        await userHelper.registerUser()
        await userHelper.login()
    })

    test(`Fail to create user with missing fields`, async ({ userHelper }) => {
        await userHelper.registerUser({ name: '', email: '', password: '', expectedStatus: 400 })
    })

    test(`Fail to create user with existing email`, async ({ userHelper }) => {
        await userHelper.registerUser()
        await userHelper.registerUser({ expectedStatus: 409 })
    })
})
