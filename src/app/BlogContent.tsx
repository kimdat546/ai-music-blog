'use client';

import { useState, useMemo } from 'react';
import { Post } from '@/types/contentful';
import { PostCard } from '@/components/PostCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { AnimatedSection } from '@/components/AnimatedSection';

interface BlogContentProps {
  posts: Post[];
  categories: string[];
}

export function BlogContent({ posts, categories }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))) ||
        (post.category && post.category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [posts, searchQuery, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <AnimatedSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
      >
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search posts, tags, or categories..."
        />
        
        <div className="text-sm text-gray-400">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        </div>
      </AnimatedSection>

      {/* Category Filter */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
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
          <div className="text-gray-400 text-lg mb-4">
            {searchQuery || activeCategory ? (
              <>
                No posts found matching your criteria.
                <br />
                <span className="text-sm">
                  Try adjusting your search or filter settings.
                </span>
              </>
            ) : (
              'No posts available. Configure your Contentful integration to see posts.'
            )}
          </div>
          
          {(searchQuery || activeCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="text-accent hover:text-highlight transition-colors duration-200 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}