import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].js'
      },
      external: [
        'electron',
        /^electron\/.*/,
        'node:path'
      ]
    },
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    electron({
      main: {
        entry: 'electron/main.ts',
        // Remove buildOptions and put rollup options directly in vite configuration
        vite: {
          build: {
            rollupOptions: {
              external: ['electron']
            }
          }
        }
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {
			
          } as const,
    }),
    commonjs({
      include: [
        'providers/**',
        'node_modules/**'
      ],
      dynamicRequireTargets: [
        './providers/address',
        './providers/**/*.js',
        './dist-electron/**/*.mjs'
      ] as string[],
      ignoreDynamicRequires: false,
      transformMixedEsModules: true,
      requireReturnsDefault: 'preferred'
    }),
  ],
  resolve: {
    alias: {
      '@providers': path.resolve(__dirname, 'providers')
    },
    mainFields: ['module', 'jsnext:main', 'jsnext', 'main']
  },
  optimizeDeps: {
    exclude: ['electron']
  }
} as UserConfig)