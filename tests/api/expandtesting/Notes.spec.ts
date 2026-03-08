import { test } from "./Fixtures";

test.describe('Notes API Tests', () => {
    test('Create a new note', async ({ userHelper, notesHelper }) => {
        await userHelper.registerAndLogin()
        await notesHelper.createNote({ title: 'Test Note', description: 'This is a test note.' })
    })

    test('Fail to create note without title', async ({ userHelper, notesHelper }) => {
        await userHelper.registerAndLogin()
        await notesHelper.createNote({ title: '', expectedStatus: 400 })
    })
})