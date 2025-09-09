'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b border-gray-800/50 bg-background/90 blur-backdrop sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent via-accent/80 to-highlight rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-xl text-foreground group-hover:text-accent/90 transition-colors duration-300">
              AI Music Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-foreground transition-colors duration-300 font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-foreground transition-colors duration-300 font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-foreground transition-colors duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white px-6 py-2.5 rounded-full transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/25 hover:scale-105">
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
                  className="text-gray-400 hover:text-foreground transition-colors duration-300 py-3 font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-foreground transition-colors duration-300 py-3 font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-foreground transition-colors duration-300 py-3 font-medium"
                >
                  Contact
                </Link>
                <button
                  onClick={toggleMenu}
                  className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white px-6 py-3 rounded-full transition-all duration-300 font-semibold self-start mt-2"
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
