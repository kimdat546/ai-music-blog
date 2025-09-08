import { getAllPosts } from '@/lib/contentful';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { AnimatedSection } from '@/components/AnimatedSection';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center py-20">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 glow text-accent">
              AI Music Generation
            </h1>
          </AnimatedSection>

          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            delay={0.2}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore the future of music with AI-generated compositions,
              innovative soundscapes, and cutting-edge audio technology.
            </p>
          </AnimatedSection>

          <AnimatedSection
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            delay={0.4}
            className="w-full max-w-4xl mx-auto h-64 bg-gradient-to-r from-accent/20 to-highlight/20 rounded-lg flex items-center justify-center"
          >
            <div className="text-gray-400">
              <p className="text-lg mb-2">Hero Video Placeholder</p>
              <p className="text-sm">AI-generated music video will play here</p>
            </div>
          </AnimatedSection>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <AnimatedSection
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading font-bold mb-8 text-highlight">
              Latest Posts
            </h2>
          </AnimatedSection>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <AnimatedSection
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  delay={index * 0.1}
                >
                  <PostCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No posts available. Configure your Contentful integration to see
                posts.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
