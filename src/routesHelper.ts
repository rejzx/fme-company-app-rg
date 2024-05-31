/**
 * An array of routes that are accessible to public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = [
  "/",
];

/**
 * An array of routes that are used for authentication
 * These routes require authentication and will redirect user to
 * base page after successful login
 * @types {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
];

/**
 * The prefix for API authentication route
 * Route that starts with this prefix is used for API authentication
 * purpose only
 * @types {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path after successful login
 * @types {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/posts";