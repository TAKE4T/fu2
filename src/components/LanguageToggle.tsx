interface LanguageToggleProps {
  language: 'ja' | 'en';
  onToggle: (language: 'ja' | 'en') => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
        <button
          onClick={() => onToggle('ja')}
          className={`rounded-full px-3 py-1 text-xs transition-all ${
            language === 'ja' 
              ? 'bg-gradient-to-r from-green-500 to-pink-500 text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          日本語
        </button>
        <button
          onClick={() => onToggle('en')}
          className={`rounded-full px-3 py-1 text-xs transition-all ${
            language === 'en' 
              ? 'bg-gradient-to-r from-green-500 to-pink-500 text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
}