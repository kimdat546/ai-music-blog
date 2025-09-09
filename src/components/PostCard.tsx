'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/contentful';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-gray-900/30 border border-gray-800/60 rounded-xl overflow-hidden hover:border-accent/40 hover:bg-gray-900/50 transition-all duration-500 backdrop-blur-sm group"
    >
      {post.coverImage && (
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      <div className="p-6 lg:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <time
              dateTime={post.date}
              className="text-sm text-gray-500 font-medium"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span className="text-sm text-gray-500 font-medium">
              {post.readingTime} min read
            </span>
          </div>
          {post.category && (
            <span className="px-3 py-1.5 bg-accent/15 text-accent text-xs font-semibold rounded-full border border-accent/20">
              {post.category}
            </span>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-highlight/10 text-highlight text-xs font-medium rounded-md border border-highlight/15"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-foreground line-clamp-2 leading-tight group-hover:text-accent/90 transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed text-base">
          {post.excerpt}
        </p>

        {post.audioPreviewUrl && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-accent bg-accent/5 px-3 py-2 rounded-lg border border-accent/10">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span className="font-medium">Audio Preview Available</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/${post.slug}`}
            className="inline-flex items-center gap-2 text-accent hover:text-highlight transition-colors duration-300 font-semibold group/link"
          >
            Read Full Article
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
