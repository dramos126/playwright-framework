import { test } from "./Fixtures"


test.describe(`Login Flow`, () => {
    let createdUserEmail: string

    test.beforeAll("register user", async ({ userHelper }) => {
        const responseBody = await userHelper.registerUser().then(res => res.json())
        createdUserEmail = responseBody.data.email
    })

    test(`Login with valid credentials`, async ({ userHelper }) => {
        await userHelper.login({ email: createdUserEmail })
    })

    test(`Login fails with wrong password`, async ({ userHelper }) => {
        await userHelper.login({ email: createdUserEmail, password: 'WrongPassword123', expectedStatus: 401 })
    })

    test(`Login fails with non-existent email`, async ({ userHelper }) => {
        await userHelper.login({ email: 'nonexistent@example.com', expectedStatus: 401 })
    });

    test(`Login fails with missing fields`, async ({ userHelper }) => {
        await userHelper.login({ email: '', password: '', expectedStatus: 400 })
    })

    test(`Login fails with invalid email format`, async ({ userHelper }) => {
        await userHelper.login({ email: 'format@wrong', expectedStatus: 400 })
    })
})