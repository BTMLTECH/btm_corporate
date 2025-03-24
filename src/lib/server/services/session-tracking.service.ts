import type { ISessionStore } from "../interfaces/session-store.interface";

export class SessionTrackingService {
    constructor(private sessionStore: ISessionStore) {}

    async getUserActiveSessions(userId: string): Promise<Array<{ sessionId: string, lastActive: Date }>> {
        const sessions = await this.sessionStore.getActiveSessions(userId);
        const activeSessionsData = await Promise.all(
            sessions.map(async (sessionId) => {
                const data = await this.sessionStore.get(sessionId);
                return {
                    sessionId,
                    lastActive: data?.lastActive || new Date(),
                    // userAgent: data?.userAgent,
                    // ipAddress: data?.ipAddress
                };
            })
        );

        return activeSessionsData.filter(session => session.lastActive);
    }

    async invalidateOtherSessions(userId: string, currentSessionId: string): Promise<void> {
        const sessions = await this.sessionStore.getActiveSessions(userId);
        await Promise.all(
            sessions
                .filter(sessionId => sessionId !== currentSessionId)
                .map(sessionId => this.sessionStore.delete(sessionId))
        );
    }
}