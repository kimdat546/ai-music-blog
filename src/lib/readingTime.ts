export function calculateReadingTime(content: string): number {
  // Average reading speed is 200-250 words per minute
  // Using 225 as a middle ground
  const wordsPerMinute = 225;
  
  // Remove HTML tags and count words
  const cleanText = content.replace(/<[^>]*>/g, '');
  const words = cleanText.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate reading time in minutes, minimum 1 minute
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  return readingTime;
}

export function extractTextFromRichText(richTextContent: unknown): string {
  if (!richTextContent || typeof richTextContent !== 'object' || !('content' in richTextContent)) return '';
  
  let text = '';
  
  function traverseNode(node: unknown) {
    if (node && typeof node === 'object') {
      if ('value' in node && typeof node.value === 'string') {
        text += node.value + ' ';
      }
      
      if ('content' in node && Array.isArray(node.content)) {
        node.content.forEach(traverseNode);
      }
    }
  }
  
  const content = richTextContent as { content: unknown[] };
  content.content.forEach(traverseNode);
  
  return text;
}