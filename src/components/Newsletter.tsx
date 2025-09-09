'use client';

import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <AnimatedSection
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-accent/8 via-primary/60 to-highlight/8 rounded-2xl p-8 lg:p-12 my-16 border border-gray-800/40 backdrop-blur-sm"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl lg:text-4xl font-bold gradient-text mb-6 leading-tight">
          Join the AI Music Revolution
        </h3>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          Stay ahead with exclusive insights on AI music generation, breakthrough technology reviews, and expert analysis delivered straight to your inbox.
        </p>

        {isSubmitted ? (
          <div className="text-center bg-highlight/10 border border-highlight/20 rounded-xl p-6">
            <div className="text-highlight text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Successfully Subscribed!
            </div>
            <p className="text-gray-400">You&apos;ll receive the latest AI music insights and updates in your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:bg-gray-900/70 transition-all duration-300 text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-accent/25 hover:scale-105 whitespace-nowrap"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : 'Get Started'}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          No spam, unsubscribe anytime. Your privacy is protected.
        </p>
      </div>
    </AnimatedSection>
  );
}