import { RedisSessionRepository } from "./repositories/redis-session.repository";
import { AuthService } from "./services/auth.service";
import { env } from "$env/dynamic/private";

const redis_url = env.REDIS_URL || "";
const API_URL = process.env.API_URL || "http://localhost:8000";

// export const sessionStore = RedisSessionRepository.getInstance(redis_url);
export const authService = new AuthService();
