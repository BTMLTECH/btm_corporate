import { createClient, type RedisClientType } from "redis";
import type { ISessionStore } from "../interfaces/session-store.interface";

export class RedisSessionRepository implements ISessionStore {
  private client: RedisClientType;
  private static instance: RedisSessionRepository;
  private isAlive: boolean

  private constructor(redisUrl: string) {
    this.isAlive = false
    this.client = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.error('Too many Redis retries, giving up.');
            return false; // Stop retrying
          }
          return Math.min(retries * 50, 2000);
        },
        tls: process.env.NODE_ENV === 'production' ? true : undefined
      },
    });

    this.client.connect().catch(console.error);

    this.client.on('connect', () => {
      console.log('Redis Client Connected');
      this.isAlive = true
    });

    this.client.on('ready', () => {
      console.log('Redis Client Ready');
      this.isAlive = true
    });

    this.client.on('end', async () => {
      console.log('Redis Client Connection Ended');
      this.isAlive = false
      await this.cleanup()
    });

    // Handle graceful shutdown
    this.setupShutdownHandlers();
    // Handle reconnection
    // this.client.on("error", (err) => console.error("Redis Client Error:", err));
    // this.client.on("reconnecting", () =>
    //   console.log("Redis Client Reconnecting")
    // );
  }

  public static getInstance(redisUrl: string): RedisSessionRepository {
    if (!RedisSessionRepository.instance) {
      RedisSessionRepository.instance = new RedisSessionRepository(redisUrl);
    }
    return RedisSessionRepository.instance;
  }

  async get(sessionId: string): Promise<any> {
    if (this.isAlive){
      try {
        const data = await this.client.get(`session:${sessionId}`);
        if (data) {
          const parsedData = JSON.parse(data);
          // Store in cache
          // this.cache.set(`session:${sessionId}`, parsedData);
          return parsedData;
        }
        return null;
      } catch (error) {
        console.error("Redis get error:", error);
        return null;
      }
    }
    return null
  }

  async set(
    sessionId: string,
    data: any,
    expiryInSeconds = 86400
  ): Promise<void> {
    try {
      await this.client.setEx(
        `session:${sessionId}`,
        expiryInSeconds,
        JSON.stringify(data)
      );
      //   this.cache.set(`session:${sessionId}`, data);

      // Track session for user
      if (data.userId) {
        await this.trackSession(data.userId, sessionId);
      }
    } catch (error) {
      console.error("Redis set error:", error);
      throw new Error("Session storage failed");
    }
  }

  async delete(sessionId: string): Promise<void> {
    try {
      const data = await this.get(sessionId);
      if (data?.userId) {
        await this.client.sRem(`user_sessions:${data.userId}`, sessionId);
      }
      await this.client.del(`session:${sessionId}`);
      //   this.cache.delete(`session:${sessionId}`);
    } catch (error) {
      console.error("Redis delete error:", error);
      throw new Error("Session deletion failed");
    }
  }

  async trackSession(userId: string, sessionId: string): Promise<void> {
    await this.client.sAdd(`user_sessions:${userId}`, sessionId);
  }

  async getActiveSessions(userId: string): Promise<string[]> {
    return await this.client.sMembers(`user_sessions:${userId}`);
  }

  async cleanup(): Promise<void> {
    await this.client.quit();
  }

  private setupShutdownHandlers(): void {
    // Handle SIGINT (e.g., Ctrl+C)
    process.on('SIGINT', async () => {
      console.log('SIGINT received. Shutting down gracefully...');
      await this.cleanup();
      process.exit(0);
    });

    // Handle SIGTERM (e.g., kill command)
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      await this.cleanup();
      process.exit(0);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', async (err) => {
      console.error('Uncaught Exception:', err);
      await this.cleanup();
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', async (err) => {
      console.error('Unhandled Rejection:', err);
      await this.cleanup();
      process.exit(1);
    });
  }
}
