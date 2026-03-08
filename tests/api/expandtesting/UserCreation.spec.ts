import { APIRequest, APIResponse } from "@playwright/test";
import { test } from "./Fixtures";


test.describe(`User Creation Flow`, () => {
    let createdUserEmail: string

    test(`Create a new user and login`, async ({ userHelper }) => {
        const createdUser = await userHelper.registerUser()
        const body = await createdUser.json()
        createdUserEmail = body.data.email

        await userHelper.login()
    })

    test(`Fail to create user with missing fields`, async ({ userHelper }) => {
        await userHelper.registerUser({ name: '', email: '', password: '', expectedStatus: 400 })
    })

    test(`Fail to create user with existing email`, async ({ userHelper }) => {
        await userHelper.registerUser({ email: createdUserEmail, expectedStatus: 409 })
    })
})
