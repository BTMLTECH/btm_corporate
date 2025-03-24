// See https://kit.svelte.dev/docs/types#app

import type { User } from "./lib/types/index";

// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      [x: string]: any;
    }
    interface Locals {
      user: User | undefined,
      accessToken: string | undefined
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
