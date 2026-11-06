export const GITHUB_URL = "https://github.com/mskerz/agent-skills-keeper"

export const AUTH_ROUTES = ['/auth/login', '/auth/register'] as const
export const PUBLIC_ROUTES = ['/', '/about', ...AUTH_ROUTES] as const
export const DEFAULT_LOGIN_REDIRECT = '/app'


export const LOGO_SYSTEM = {
    dark: {
        app: "/skill-keeper-dark-2.svg",
        favicon: "/skill-keeper-app-icon-dark.svg",
    },
    light: {
        app: "/skill-keeper-light-2.svg",
        favicon: "/skill-keeper-app-icon-light.svg",
    }
} as const
 