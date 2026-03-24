// next.config.ts — next-intl v4: ES module import
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
