# AI Music Blog Setup Guide

This guide will walk you through setting up the AI Music Generation Blog from scratch.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git
- Contentful account
- Vercel account (for deployment)
- Google Analytics account (optional)

## Step-by-Step Setup

### 1. Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required environment variables:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. Contentful Setup

#### 2.1 Create a Contentful Space

1. Go to [Contentful](https://www.contentful.com/)
2. Sign up or log in
3. Create a new space
4. Note your Space ID from the space settings

#### 2.2 Get API Keys

1. Go to Settings > API keys
2. Create a new API key or use the default one
3. Copy the **Space ID** and **Content Delivery API - access token**
4. Add these to your `.env.local` file

#### 2.3 Create Content Model

Create a new content type called "Post" with these fields:

| Field         | ID             | Type             | Required | Help Text                                    |
| ------------- | -------------- | ---------------- | -------- | -------------------------------------------- |
| Title         | `title`        | Short text       | ✓        | The title of the blog post                   |
| Slug          | `slug`         | Short text       | ✓        | URL-friendly version (e.g., "my-first-post") |
| Date          | `date`         | Date & time      | ✓        | When the post was published                  |
| Cover Image   | `coverImage`   | Media            | ✗        | Featured image for the post                  |
| Excerpt       | `excerpt`      | Long text        | ✓        | Short description/summary                    |
| Body          | `body`         | Rich text        | ✓        | Main content of the post                     |
| Audio Preview | `audioPreview` | Media            | ✗        | Audio file for waveform player               |
| Tags          | `tags`         | Short text, list | ✗        | Category tags                                |

#### 2.4 Content Model Configuration

1. **Title Field:**
   - Validation: Required, 1-100 characters
   - Appearance: Single line

2. **Slug Field:**
   - Validation: Required, unique, lowercase
   - Pattern: `^[a-z0-9-]+$`
   - Appearance: Single line

3. **Date Field:**
   - Validation: Required
   - Format: Date and time

4. **Cover Image Field:**
   - Validation: File size < 10MB
   - Format: JPEG, PNG, WebP

5. **Excerpt Field:**
   - Validation: Required, 50-300 characters
   - Appearance: Multi-line

6. **Body Field:**
   - Enable all formatting options
   - Allow embedded entries

7. **Audio Preview Field:**
   - Validation: File size < 50MB
   - Format: MP3, WAV, OGG

8. **Tags Field:**
   - Validation: 1-10 items
   - Appearance: Tags

### 3. Create Sample Content

Create at least one post to test the application:

1. Go to Content in Contentful
2. Create a new "Post" entry
3. Fill in all required fields:
   - **Title**: "Welcome to AI Music Generation"
   - **Slug**: "welcome-to-ai-music-generation"
   - **Date**: Today's date
   - **Excerpt**: "Discover the fascinating world of artificial intelligence in music creation..."
   - **Body**: Add some sample content with rich text formatting
   - **Tags**: ["AI", "Music", "Technology"]
4. Publish the entry

### 4. Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Verify content loading:**
   You should see your sample post displayed

### 5. Google Analytics Setup (Optional)

1. **Create GA4 Property:**
   - Go to Google Analytics
   - Create a new GA4 property
   - Get your Measurement ID (G-XXXXXXXXXX)

2. **Add to environment:**

   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Test tracking:**
   Check Google Analytics Real-time reports

### 6. Deployment to Vercel

#### 6.1 GitHub Repository

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-music-blog.git
   git push -u origin main
   ```

#### 6.2 Vercel Deployment

1. **Connect GitHub:**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Choose "Other" framework preset

2. **Environment Variables:**
   Add all your environment variables in Vercel dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `NEXT_PUBLIC_GA_ID` (optional)
   - `NEXT_PUBLIC_SITE_URL`

3. **Deploy:**
   Click "Deploy" and wait for build completion

#### 6.3 GitHub Actions Setup

For automated deployments, add these secrets to your GitHub repository:

1. **Repository Secrets:**
   - `VERCEL_TOKEN` - Personal access token from Vercel
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your project ID
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_SITE_URL`

2. **Get Vercel IDs:**
   ```bash
   npx vercel link
   cat .vercel/project.json
   ```

### 7. Domain Configuration

1. **Add Custom Domain:**
   - Go to Vercel project settings
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment:**

   ```env
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   ```

3. **Update SEO Config:**
   Edit `next-seo.config.ts` with your domain

### 8. Testing Checklist

Before going live, verify:

- [ ] Homepage loads with posts
- [ ] Individual post pages work
- [ ] Images display correctly
- [ ] Audio player works (if you have audio files)
- [ ] Mobile responsive design
- [ ] SEO meta tags present
- [ ] Analytics tracking works
- [ ] Sitemap generates (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)

### 9. Content Guidelines

For best results:

#### Blog Posts

- **Title**: Keep under 60 characters for SEO
- **Slug**: Use kebab-case, include keywords
- **Excerpt**: 150-160 characters ideal for meta descriptions
- **Cover Image**: 1200x630px for social sharing
- **Tags**: Use 3-5 relevant tags maximum

#### Audio Files

- **Format**: MP3 preferred (browser compatibility)
- **Size**: Keep under 10MB for fast loading
- **Quality**: 128-320 kbps is sufficient

#### Images

- **Format**: WebP preferred, PNG/JPEG acceptable
- **Size**: Optimize for web (under 500KB)
- **Dimensions**: Use appropriate aspect ratios

### 10. Performance Optimization

The blog includes several optimizations:

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: Google Fonts with display swap
- **CSS Optimization**: Tailwind CSS purging
- **Caching**: HTTP headers for static assets
- **Compression**: Gzip/Brotli enabled

### 11. Troubleshooting

#### Common Issues

1. **Content not loading:**
   - Check Contentful API keys
   - Verify content model field IDs
   - Check network requests in browser dev tools

2. **Images not displaying:**
   - Add Contentful domain to `next.config.ts`
   - Check image URLs in Contentful

3. **Build failures:**
   - Check environment variables in Vercel
   - Verify all imports and exports
   - Check TypeScript errors

4. **Audio player not working:**
   - Verify audio file formats
   - Check browser console for errors
   - Test with different audio files

#### Getting Help

- Check the GitHub repository issues
- Review Contentful documentation
- Check Next.js deployment docs
- Join the community Discord

### 12. Next Steps

After setup:

1. **Content Creation:**
   - Write your first real blog posts
   - Add high-quality images and audio
   - Optimize for SEO

2. **Customization:**
   - Modify colors in `tailwind.config.ts`
   - Update fonts in `globals.css`
   - Add custom components

3. **Analytics:**
   - Set up conversion tracking
   - Monitor performance metrics
   - Analyze user behavior

4. **Marketing:**
   - Submit to search engines
   - Share on social media
   - Build backlinks

Congratulations! Your AI Music Generation Blog is now live. 🎉
