import { notFound } from 'next/navigation';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { getPostBySlug, getAllSlugs } from '@/lib/contentful';
import { Header } from '@/components/Header';
import { WaveformPlayer } from '@/components/WaveformPlayer';
import { AnimatedSection } from '@/components/AnimatedSection';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'AI Music Generation Blog',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Music Generation Blog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ai-music-blog.vercel.app/logo.png',
      },
    },
    datePublished: post.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ai-music-blog.vercel.app/${slug}`,
    },
    image: post.coverImage ? [post.coverImage] : undefined,
  };

  return (
    <div className="min-h-screen bg-background">
      <NextSeo
        title={post.title}
        description={post.excerpt}
        canonical={`https://ai-music-blog.vercel.app/${slug}`}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: `https://ai-music-blog.vercel.app/${slug}`,
          type: 'article',
          article: {
            publishedTime: post.date,
            modifiedTime: post.updatedAt,
            tags: post.tags,
          },
          images: post.coverImage
            ? [
                {
                  url: post.coverImage,
                  width: 1200,
                  height: 630,
                  alt: post.title,
                },
              ]
            : undefined,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="container mx-auto px-4 py-12">
        <AnimatedSection className="max-w-4xl mx-auto">
          <article>
            <header className="mb-12">
              {post.coverImage && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 glow text-accent">
                {post.title}
              </h1>

              <div className="flex items-center justify-between mb-6 text-gray-400">
                <time dateTime={post.date} className="text-lg">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>

              {post.audioPreviewUrl && (
                <div className="mt-8">
                  <WaveformPlayer
                    audioUrl={post.audioPreviewUrl}
                    title={post.title}
                  />
                </div>
              )}
            </header>

            <div className="prose prose-lg prose-invert max-w-none">
              {post.body && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.body.content
                      ? post.body.content
                          .map(
                            (node: {
                              nodeType: string;
                              content: Array<{ value: string }>;
                            }) => {
                              if (node.nodeType === 'paragraph') {
                                return `<p>${node.content.map(text => text.value).join('')}</p>`;
                              }
                              return '';
                            }
                          )
                          .join('')
                      : 'Content coming soon...',
                  }}
                />
              )}
            </div>
          </article>
        </AnimatedSection>
      </main>
    </div>
  );
}

export { generateStaticParams };
