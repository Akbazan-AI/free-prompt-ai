'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '@/hooks/use-favorites';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useFavorites();

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/prompts', label: 'Prompts' },
    { href: '/guides', label: 'Hướng dẫn' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500 text-white group-hover:bg-primary-600 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Prompt AI</h1>
              <p className="text-xs text-slate-500">Kho prompts miễn phí</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Favorites link with badge */}
            <Link
              href="/favorites"
              className={cn(
                'relative inline-flex items-center gap-2 px-4 py-2 rounded-full',
                'text-sm font-medium transition-colors',
                'bg-red-50 text-red-600 hover:bg-red-100'
              )}
            >
              <Heart className="w-4 h-4" />
              Yêu thích
              {count > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                  {count > 99 ? '99+' : count}
                </Badge>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3 border-t border-slate-200 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-slate-600 hover:text-primary-500 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Favorites - mobile */}
                <Link
                  href="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 py-2"
                >
                  <Heart className="w-4 h-4" />
                  Yêu thích
                  {count > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {count}
                    </Badge>
                  )}
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
