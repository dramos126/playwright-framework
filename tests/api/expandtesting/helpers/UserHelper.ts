import { APIRequestContext, expect } from "@playwright/test"

const randomString = () => Math.random().toString(36).substring(2, 10)

export class UserHelper {
    constructor(private request: APIRequestContext) { }
    userName = `user ${Date.now()}`
    userEmail = `user${randomString()}_${Date.now()}@example.com`
    userPassword = 'Password123'
    token = ''


    async registerUser({ name = this.userName, email = this.userEmail, password = this.userPassword, expectedStatus = 201 } = {}): Promise<any> {
        const userResponse = await this.request.post('/notes/api/users/register', {
            data: { name, email, password }
        })

        expect(userResponse.status()).toBe(expectedStatus)
        return userResponse;
    }


    async login({ email = this.userEmail, password = this.userPassword, expectedStatus = 200 } = {}): Promise<any> {
        const response = await this.request.post('/notes/api/users/login', {
            data: { email, password }
        });

        expect(response.status()).toBe(expectedStatus)

        if (expectedStatus === 200) {
            const responseBody = await response.json()
            this.token = responseBody.data.token
        }

        return response
    }

    async logout({ token = this.token, authHeader = 'x-auth-token', expectedStatus = 200 } = {}): Promise<any> {
        const response = await this.request.delete('/notes/api/users/logout', {
            headers: { [authHeader]: token }
        })

        expect(response.status()).toBe(expectedStatus)
        return response
    }
}
