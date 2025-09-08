export interface ContentfulPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    date: string;
    coverImage?: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
    excerpt: string;
    body: {
      content?: Array<{
        nodeType: string;
        content: Array<{ value: string }>;
      }>;
    };
    audioPreview?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    tags?: string[];
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  coverImage?: string;
  excerpt: string;
  body: {
    content?: Array<{
      nodeType: string;
      content: Array<{ value: string }>;
    }>;
  };
  audioPreviewUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
