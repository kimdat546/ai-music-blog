'use client';

import { Post } from '@/types/contentful';
import { AnimatedSection } from './AnimatedSection';
import Link from 'next/link';

interface PopularPostsProps {
  posts: Post[];
}

export function PopularPosts({ posts }: PopularPostsProps) {
  // Simulate popularity based on recent posts for now
  const popularPosts = posts.slice(0, 5);

  if (popularPosts.length === 0) {
    return null;
  }

  return (
    <AnimatedSection
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/30 rounded-lg p-6"
    >
      <h3 className="text-xl font-heading font-bold text-highlight mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Popular Posts
      </h3>
      
      <div className="space-y-4">
        {popularPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="flex gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-sm">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white group-hover:text-accent transition-colors duration-200 line-clamp-2 text-sm mb-1">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{post.readingTime} min read</span>
                {post.category && (
                  <>
                    <span>•</span>
                    <span>{post.category}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AnimatedSection>
  );
}