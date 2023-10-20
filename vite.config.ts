import * as path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import preload from 'vite-plugin-preload'
import license from 'rollup-plugin-license'
import * as cp from 'child_process';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.GIT_COMMIT_SHA': JSON.stringify(cp.execSync('git rev-parse HEAD').toString()),
  },
  plugins: [
    vanillaExtractPlugin(),
    react(),
    preload(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        license({
          thirdParty: {
            includePrivate: false,
            allow: {
              test: 'MIT OR BSD-3-Clause OR Apache-2.0',
              failOnUnlicensed: true,
              failOnViolation: true,
            },
            output: path.resolve(__dirname, './dist/assets/vendor.LICENSE.txt'),
          },
        }),
      ],
    },
  },
  esbuild: {
    banner: '/*! licenses: ./vendor.LICENSE.txt */',
  },
})
