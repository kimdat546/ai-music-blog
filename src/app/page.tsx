import { getAllPosts, getAllCategories } from '@/lib/contentful';
import { Header } from '@/components/Header';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Newsletter } from '@/components/Newsletter';
import { PopularPosts } from '@/components/PopularPosts';
import { BlogContent } from './BlogContent';

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 lg:py-24">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text max-w-4xl mx-auto leading-tight">
              The Future of AI Music Generation
            </h1>
          </AnimatedSection>

          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            delay={0.2}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Discover cutting-edge AI music technology, innovative soundscapes, 
              and the evolution of artificial creativity in music composition.
            </p>
          </AnimatedSection>

          <AnimatedSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            delay={0.4}
            className="w-full max-w-5xl mx-auto h-80 lg:h-96 bg-gradient-to-br from-accent/10 via-primary/50 to-highlight/10 rounded-2xl border border-gray-800/50 flex items-center justify-center backdrop-blur-sm"
          >
            <div className="text-gray-500 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent/20 to-highlight/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">Featured Content</p>
              <p className="text-sm text-gray-600">AI-generated music showcase coming soon</p>
            </div>
          </AnimatedSection>
        </section>

        {/* Newsletter Signup */}
        <Newsletter />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1 h-12 bg-gradient-to-b from-accent to-highlight rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Latest Insights
                </h2>
              </div>
            </AnimatedSection>

            <BlogContent posts={posts} categories={categories} />
          </div>

          {/* Sidebar */}
          {posts.length > 0 && (
            <div className="lg:col-span-1">
              <PopularPosts posts={posts} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
