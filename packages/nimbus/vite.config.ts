import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import commonjs from '@rollup/plugin-commonjs'

// List all database-related modules that should be external
const databaseModules = [
  'pg',
  'tedious',
  'mysql',
  'mysql2',
  'oracledb',
  'pg-query-stream',
  'better-sqlite3',
  'sqlite3',
  'knex'
]

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
        'node:url',
        'node:path',
        ...databaseModules,
        /^better-sqlite3\/.*/,
        /^pg\/.*/
      ]
    },
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              external: [
                'electron',
                ...databaseModules,
                /^better-sqlite3\/.*/,
                /^pg\/.*/,
                // Add Node.js built-in modules
                /^node:.*/
              ]
            }
          }
        }
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {} as const,
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
    exclude: ['electron', ...databaseModules]
  }
} as UserConfig)