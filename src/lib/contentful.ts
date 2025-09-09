import { createClient } from 'contentful';
import { ContentfulPost, Post } from '@/types/contentful';
import { calculateReadingTime, extractTextFromRichText } from './readingTime';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is required');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is required');
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

function parseContentfulPost(post: ContentfulPost): Post {
  const bodyText = extractTextFromRichText(post.fields.body);
  const readingTime = calculateReadingTime(bodyText + post.fields.excerpt);
  
  return {
    id: post.sys.id,
    title: post.fields.title,
    slug: post.fields.slug,
    date: post.fields.date,
    coverImage: post.fields.coverImage
      ? `https:${post.fields.coverImage.fields.file.url}`
      : undefined,
    excerpt: post.fields.excerpt,
    body: post.fields.body,
    audioPreviewUrl: post.fields.audioPreview
      ? `https:${post.fields.audioPreview.fields.file.url}`
      : undefined,
    tags: post.fields.tags,
    category: post.fields.category || 'General',
    readingTime,
    createdAt: post.sys.createdAt,
    updatedAt: post.sys.updatedAt,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const entries = await client.getEntries<ContentfulPost['fields']>({
      content_type: 'post',
      order: '-sys.createdAt',
    });

    return entries.items.map(item =>
      parseContentfulPost(item as ContentfulPost)
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const entries = await client.getEntries<ContentfulPost['fields']>({
      content_type: 'post',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) {
      return null;
    }

    return parseContentfulPost(entries.items[0] as ContentfulPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const entries = await client.getEntries<ContentfulPost['fields']>({
      content_type: 'post',
      select: 'fields.slug',
    });

    return entries.items.map(item => item.fields.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const entries = await client.getEntries<ContentfulPost['fields']>({
      content_type: 'post',
      'fields.category': category,
      order: '-sys.createdAt',
    });

    return entries.items.map(item =>
      parseContentfulPost(item as ContentfulPost)
    );
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const entries = await client.getEntries<ContentfulPost['fields']>({
      content_type: 'post',
      select: 'fields.category',
    });

    const categories = entries.items
      .map(item => item.fields.category)
      .filter((category): category is string => Boolean(category));
    
    return [...new Set(categories)];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['AI Tools', 'Tutorials', 'Industry News', 'Reviews', 'Guides'];
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const entries = await client.getEntries<ContentfulPost['fields']>({
      content_type: 'post',
      query: query,
      order: '-sys.createdAt',
    });

    return entries.items.map(item =>
      parseContentfulPost(item as ContentfulPost)
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}
