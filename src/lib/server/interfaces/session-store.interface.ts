export interface ISessionStore {
    get(sessionId: string): Promise<any>;
    set(sessionId: string, data: any, expiryInSeconds?: number): Promise<void>;
    delete(sessionId: string): Promise<void>;
    getActiveSessions(userId: string): Promise<string[]>;
    trackSession(userId: string, sessionId: string): Promise<void>;
}