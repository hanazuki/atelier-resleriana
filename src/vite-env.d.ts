/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GIT_COMMIT_SHA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
