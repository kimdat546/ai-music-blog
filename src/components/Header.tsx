'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b border-gray-800 bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-highlight rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              AI Music Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-accent transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-accent transition-colors duration-200"
            >
              Contact
            </Link>
            <button className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
              }}
              className="block w-6 h-0.5 bg-foreground origin-center transition-all duration-200"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              className="block w-6 h-0.5 bg-foreground transition-all duration-200"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
              }}
              className="block w-6 h-0.5 bg-foreground origin-center transition-all duration-200"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-800 py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-accent transition-colors duration-200 py-2"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-accent transition-colors duration-200 py-2"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-accent transition-colors duration-200 py-2"
                >
                  Contact
                </Link>
                <button
                  onClick={toggleMenu}
                  className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-colors duration-200 self-start"
                >
                  Subscribe
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
