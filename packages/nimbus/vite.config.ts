import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      dynamicRequireTargets: [
        // Add the specific paths that need dynamic require
        'providers/address',
        'providers/**/*.js'
      ],
      transformMixedEsModules: true,
    }
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {},
    }),
    commonjs({
      // Move these options to the root level of commonjs config
      include: ['providers/**'],
      dynamicRequireTargets: [
        // Use relative paths from the project root
        './providers/address',
        './providers/**/*.js'
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