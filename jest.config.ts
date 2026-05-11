import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // next-intl and use-intl ship ESM only — transpile their .js through ts-jest.
    '^.+\\.m?jsx?$': ['ts-jest', { tsconfig: { allowJs: true, module: 'commonjs' } }],
  },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(next-intl|use-intl|@formatjs|intl-messageformat)/)'],
}

export default config
