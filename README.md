# AI Music Generation Blog

A modern, high-performance blog focused on AI-generated music with dark-mode-first design, neon-glow accents, and smooth animations.

## 🚀 Features

- **Dark-mode-first design** with neon glow accents evoking soundwaves
- **Hero section** with muted looping AI-generated music video
- **Fast, SEO-optimized** content delivery via Next.js, Tailwind CSS, and Contentful
- **Smooth animations** with Framer Motion for page transitions and interactive waveforms
- **Full SEO support** using next-seo, structured JSON-LD, sitemap.xml, and robots.txt
- **Monetization ready** with affiliate link tracking and Google Analytics 4
- **Interactive audio waveform** previews for music posts
- **Responsive design** optimized for all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS v4 with JIT compilation
- **Animations**: Framer Motion v12
- **CMS**: Contentful
- **SEO**: next-seo, next-sitemap
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ai-music-blog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables:

   ```env
   CONTENTFUL_SPACE_ID=your_contentful_space_id
   CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Contentful Setup

### Content Model: Post

Create a "Post" content type in Contentful with the following fields:

| Field Name    | Field ID       | Type              | Required | Description             |
| ------------- | -------------- | ----------------- | -------- | ----------------------- |
| Title         | `title`        | Short Text        | Yes      | Post title              |
| Slug          | `slug`         | Short Text        | Yes      | URL slug                |
| Date          | `date`         | Date & Time       | Yes      | Publication date        |
| Cover Image   | `coverImage`   | Media             | No       | Featured image          |
| Excerpt       | `excerpt`      | Long Text         | Yes      | Post summary            |
| Body          | `body`         | Rich Text         | Yes      | Post content            |
| Audio Preview | `audioPreview` | Media             | No       | Audio file for waveform |
| Tags          | `tags`         | Short Text (List) | No       | Post tags               |

### Content Model Configuration

1. In Contentful, go to Content model
2. Create a new content type called "Post"
3. Add all the fields listed above
4. Configure field validations as needed
5. Publish the content model

## 🚀 Deployment

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Set up environment variables in Vercel dashboard**:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - `VERCEL_TOKEN` (for GitHub Actions)
   - `VERCEL_ORG_ID` (for GitHub Actions)
   - `VERCEL_PROJECT_ID` (for GitHub Actions)

3. **Deploy**: Push to main branch triggers automatic deployment

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🎵 Audio Features

The blog supports interactive audio waveform players for music posts. Upload audio files to Contentful and link them to posts via the "Audio Preview" field. The waveform player will:

- Display an animated SVG waveform
- Allow click-to-seek functionality
- Show play/pause controls
- Display current time and duration

## 🔧 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: '#1F2937',    // Dark gray
  accent: '#6366F1',     // Indigo
  highlight: '#10B981',  // Emerald
}
```

### Fonts

The project uses:

- **Roboto Mono** for headings
- **Inter** for body text

Modify `src/app/globals.css` to change fonts.

### Animations

Customize Framer Motion animations in components or add new ones in `tailwind.config.ts`:

```typescript
animation: {
  'glow': 'glow 2s ease-in-out infinite alternate',
  'wave': 'wave 3s ease-in-out infinite',
}
```

## 📊 Analytics & Monetization

### Google Analytics 4

Set `NEXT_PUBLIC_GA_ID` in your environment variables. The tracking code is automatically included.

### Affiliate Links

Use the `useAffiliateLink` hook in components:

```typescript
import { useAffiliateLink } from '@/hooks/useAffiliateLink';

const { url, trackClick } = useAffiliateLink('product-id');
```

## 🔍 SEO Features

- **Automatic sitemap generation** via next-sitemap
- **Structured data (JSON-LD)** for articles
- **Open Graph and Twitter Card** meta tags
- **Canonical URLs** for all pages
- **Semantic HTML** structure
- **Image optimization** with Next.js Image component

## 📁 Project Structure

```
ai-music-blog/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── [slug]/         # Dynamic post pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable components
│   │   ├── Header.tsx
│   │   ├── PostCard.tsx
│   │   └── WaveformPlayer.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   │   └── contentful.ts   # Contentful API client
│   └── types/              # TypeScript type definitions
├── .github/
│   └── workflows/          # GitHub Actions
├── public/                 # Static assets
├── next-seo.config.ts      # SEO configuration
├── next-sitemap.config.js  # Sitemap configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js, Tailwind CSS, and Contentful
