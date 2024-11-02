import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import commonjs from '@rollup/plugin-commonjs'

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
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'electron',
        ...databaseModules
      ]
    }
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              external: [
                'electron',
                ...databaseModules
              ]
            }
          }
        }
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          build: {
            outDir: 'dist-electron'
          }
        }
      },
      renderer: {} 
    }),
    commonjs({
      include: ['providers/**', 'node_modules/**'],
      dynamicRequireTargets: [
        './providers/address',
        './providers/**/*.js',
        './dist-electron/**/*.mjs'
      ],
      ignoreDynamicRequires: false,
      transformMixedEsModules: true,
      requireReturnsDefault: 'preferred'
    })
  ],
  resolve: {
    alias: {
      '@providers': path.resolve(__dirname, 'providers'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})