export interface User {
    score: number,
    username: string,
    createdAt: {
        _seconds: number,
        _nanoseconds: number
    },
    email: string,
    role: string
}
