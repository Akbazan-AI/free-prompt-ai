'use client';

import Link from 'next/link';
import { Github, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">Prompt AI</h3>
            <p className="text-sm text-slate-600">
              Kho prompts AI miễn phí chất lượng cao cho mọi nhu cầu của bạn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/prompts"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Prompts
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-slate-600 hover:text-primary-500 transition-colors"
                >
                  Hướng dẫn
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Credits */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Kết nối</h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by ADM
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 mt-8 pt-6">
          <p className="text-center text-xs text-slate-500">
            © {currentYear} Prompt AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
