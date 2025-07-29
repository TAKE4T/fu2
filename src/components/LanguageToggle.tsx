import React from 'react';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'ja' | 'en';
  onToggle: (language: 'ja' | 'en') => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
        <Globe className="w-4 h-4 text-gray-600 ml-2" />
        <Button
          variant={language === 'ja' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onToggle('ja')}
          className={`rounded-full px-3 py-1 text-xs ${
            language === 'ja' 
              ? 'bg-gradient-to-r from-green-500 to-pink-500 text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          日本語
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onToggle('en')}
          className={`rounded-full px-3 py-1 text-xs ${
            language === 'en' 
              ? 'bg-gradient-to-r from-green-500 to-pink-500 text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          English
        </Button>
      </div>
    </div>
  );
}