import type { User } from "../db/models/database";

// Custom error types for better error handling
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class ValidationError extends AuthError {}
export class NetworkError extends AuthError {}
export class UnauthorizedError extends AuthError {}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface TokenPayload {
  exp: number;
  sub: string;
  roles: string[];
}

/**
 * Singleton service for handling user authentication and authorization.
 * Manages login, signup, token storage, role and permission checks, and session persistence.
 */
export class AuthService {
  /**
   * Singleton instance of AuthService.
   * @type {AuthService}
   * @private
   * @static
   */
  private static instance: AuthService;

  /**
   * JSON Web Token (JWT) for the current authenticated user.
   * @type {string | null}
   * @private
   */
  private token: string | null = null;

  /**
   * Refresh token for the current authenticated user.
   * @type {string | null}
   * @private
   */
  private refreshToken: string | null = null;

  /**
   * Current authenticated user's information.
   * @type {User | null}
   * @private
   */
  private user: User | null = null;

  /**
   * Timeout reference for the refresh token timer.
   * @type {NodeJS.Timeout | undefined}
   * @private
   */
  private refreshTokenTimeout?: NodeJS.Timeout;

  /**
   * Private constructor for initializing AuthService and setting up token.
   * Loads token, refresh token, and user from localStorage, if available.
   * Sets up the refresh token timer if a valid token exists.
   * @private
   */
  constructor() {}

  async signUp({ name, email, password }: SignUpData) {}

  private setupRefreshTokenTimer(): void {
    if (!this.token) return;

    try {
      const tokenPayload = this.parseJwt(this.token);
      const expiresIn = tokenPayload.exp * 1000 - Date.now() - 60 * 1000; // Refresh 1 minute before expiry

      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
      }

      this.refreshTokenTimeout = setTimeout(
        () => {
          this.refreshUserToken().catch(() => this.logout());
        },
        Math.max(0, expiresIn)
      );
    } catch (error) {
      console.error("Error setting up refresh timer:", error);
    }
  }

  private parseJwt(token: string): TokenPayload {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch (error) {
      throw new AuthError("Invalid token format");
    }
  }

  public async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
        await this.apiCall("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }

    this.clearAuth();
  }
  apiCall(arg0: string, arg1: { method: string; body: string; }) {
    throw new Error("Method not implemented.");
  }
  clearAuth() {
    throw new Error("Method not implemented.");
  }

  public async refreshUserToken(): Promise<void> {
    if (!this.refreshToken)
      throw new UnauthorizedError("No refresh token available");

    try {
      const response = await this.apiCall<AuthResponse>("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });
      this.persistAuth(response);
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }
  persistAuth(response: any) {
    throw new Error("Method not implemented.");
  }
}
