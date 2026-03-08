import { APIRequestContext, expect } from "@playwright/test"
import { UserHelper } from "./UserHelper"

export enum NoteCategory {
    Personal = 'Personal',
    Work = 'Work',
    Home = 'Home'
}

export class NoteHelper {
    constructor(private request: APIRequestContext, private userHelper: UserHelper) { }
    noteID = ''

    async createNote({ title = 'test note', description = 'test note description', category = NoteCategory.Personal, expectedStatus = 200 } = {}) {
        const response = await this.request.post('/notes/api/notes', {
            headers: { 'x-auth-token': this.userHelper.token },
            data: { title, description, category }
        })

        expect(response.status()).toBe(expectedStatus)

        if (expectedStatus === 200) {
            const responseBody = await response.json()
            this.noteID = responseBody.data.id
        }

        return response
    }
}
