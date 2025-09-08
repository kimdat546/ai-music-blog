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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-accent/50 transition-colors duration-300"
    >
      {post.coverImage && (
        <div className="relative w-full h-48">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <time
            dateTime={post.date}
            className="text-sm text-gray-400 font-mono"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-highlight/20 text-highlight text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h2 className="text-xl font-heading font-bold mb-3 text-foreground line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {post.audioPreviewUrl && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-accent">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              Audio Preview Available
            </div>
          </div>
        )}

        <Link
          href={`/${post.slug}`}
          className="inline-flex items-center gap-2 text-accent hover:text-highlight transition-colors duration-200 font-medium"
        >
          Read More
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
    </motion.article>
  );
}
