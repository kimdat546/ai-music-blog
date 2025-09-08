import { useCallback } from 'react';

interface AffiliateLink {
  url: string;
  trackClick: () => void;
}

export function useAffiliateLink(id: string): AffiliateLink {
  const trackClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Track the click event
      if (window.gtag) {
        window.gtag('event', 'affiliate_click', {
          affiliate_id: id,
          timestamp: new Date().toISOString(),
        });
      }

      // Log to console for debugging
      console.log('Affiliate click tracked:', {
        id,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      });
    }
  }, [id]);

  const url = `https://affiliate.example.com/${id}?ref=ai-music-blog`;

  return {
    url,
    trackClick,
  };
}
