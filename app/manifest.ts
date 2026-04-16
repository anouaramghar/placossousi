import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Placo Sousi',
    short_name: 'Placo Sousi',
    description: 'Société marocaine spécialisée dans le plâtre, peinture et pasta.',
    start_url: '/',
    display: 'standalone',
    background_color: '#03060f',
    theme_color: '#03060f',
    icons: [
      { src: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
  }
}
