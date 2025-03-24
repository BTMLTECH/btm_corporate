import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { User } from "$lib/types";
import { authService } from "../config.server";
import type { IAuthService } from "../interfaces/auth-service.interface";
import type { ISessionStore } from "../interfaces/session-store.interface";
import { v4 as uuidv4 } from "uuid";

export class AuthService implements IAuthService {
  private apiUrl: string =
    process.env.NODE_ENV === "production"
      ? LIVE_URL + "/auth/sign-in"
      : LOCAL_URL + "/auth/sign-in";

  async validateCredentials(
    email: string,
    password: string
  ): Promise<
    | {
        detail?: string;
        access_token: string;
        csrf_token: string;
        user: User;
        errors?: Array<{ [x: string]: string }>;
      }
    | undefined
  > {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        detail?: string;
        user: User;
        access_token: string;
        csrf_token: string;
      };

      return data;
    } catch (err: any) {
      console.error("Error: ", err);
      return undefined;
    }
  }

  async createCredentials(
    name: string,
    email: string,
    password: string
  ): Promise<
    | {
        detail?: string;
        user: User;
        errors?: Array<{ [x: string]: string }>;
      }
    | undefined
  > {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await response.json()) as {
        detail?: string;
        user: User;
        errors?: Array<{ [x: string]: string }>;
      };

      return data;
    } catch (err: any) {
      console.error("Error: ", err);
      return undefined;
    }
  }

  async verifySignUp(token: string) {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: token }),
      });

      const data = (await response.json()) as {
        detail: string | undefined;
        verified: boolean;
      };

      if (data.detail?.length) {
        return {
          detail: data.detail,
          verified: false,
        };
      }

      return data;
    } catch (err: any) {
      console.error("Error: ", err);
      return {
        detail: "An unknown error has occured",
        verified: false,
      };
    }
  }

  async validateUserSession(csrfToken: string, accessToken: string): Promise<User | undefined> {
    try {
      authService.setUrl(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/validate-session" : LOCAL_URL + "/auth/validate-session"}`
      );

      const req = await fetch(this.apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-CSRF-Token": csrfToken ? csrfToken : "",
          cookie: `csrf_token=${csrfToken}`
        },
        credentials: "include",
      });

      const resp = (await req.json()) as User & { detail?: string };

      console.log("resp", resp);

      if (resp.detail) {
        return undefined;
      }

      return resp;
    } catch (err: any) {
      console.error("Error validating session", err);
      return undefined;
    }
  }

  async destroyUserSession(csrfToken: string) {
    try {
      authService.setUrl(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/logout" : LOCAL_URL + "/auth/logout"}`
      );

      const req = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken ? csrfToken : "",
          cookie: `csrf_token=${csrfToken}`,
        },
        credentials: "include",
      });

      const resp = await req.json();

      if (resp.detail) {
        return undefined;
      }

      return resp;
    } catch (err: any) {
      console.error("Error validating session", err);
      return undefined;
    }
  }

  setUrl(url: string): string {
    this.apiUrl = url;
    return this.apiUrl;
  }
}
