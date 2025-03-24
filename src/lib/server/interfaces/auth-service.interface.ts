export interface IAuthService {
    validateCredentials(email: string, password: string): Promise<any>;
    // createSession(userData: any): Promise<string>;
    // validateSession(sessionId: string): Promise<any>;
    // destroySession(sessionId: string): Promise<void>;
}
