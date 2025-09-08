import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'AI Music Generation Blog',
  titleTemplate: '%s | AI Music Generation Blog',
  description:
    'Explore the future of music with AI-generated compositions, innovative soundscapes, and cutting-edge audio technology.',
  canonical: 'https://ai-music-blog.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-music-blog.vercel.app',
    siteName: 'AI Music Generation Blog',
    title: 'AI Music Generation Blog',
    description:
      'Explore the future of music with AI-generated compositions, innovative soundscapes, and cutting-edge audio technology.',
    images: [
      {
        url: 'https://ai-music-blog.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Music Generation Blog',
      },
    ],
  },
  twitter: {
    handle: '@aimusicblog',
    site: '@aimusicblog',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0a0a0a',
    },
    {
      name: 'msapplication-TileColor',
      content: '#0a0a0a',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://images.ctfassets.net',
    },
  ],
};

export default config;
