declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string
    API_URL: string
    CDN_URL: string
    DEBUG: string
    LANG: string
    THEME: string
    [key: string]: string | undefined
  }
}
