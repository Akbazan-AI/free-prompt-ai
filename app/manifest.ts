import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prompt AI - Kho Prompts AI Miễn Phí',
    short_name: 'Prompt AI',
    description: 'Khám phá 75+ prompts AI chất lượng cao cho hình ảnh, văn phòng và nhiều hơn nữa',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
