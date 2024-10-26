import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
        output: {
            format: 'cjs', 
        },
    },
},
  plugins: [
    react(),
    TanStackRouterVite(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {},
    }),
    commonjs({
      include: ['providers/**'],
      dynamicRequireTargets: [
        './providers/address',
        './providers/**/*.js',
        './dist-electron/**/*.mjs'
      ],
      ignoreDynamicRequires: false,
      transformMixedEsModules: true,
    }),
  ],
  resolve: {
    alias: {
      // Add an alias for the providers directory
      '@providers': path.resolve(__dirname, 'providers')
    }
  }
})