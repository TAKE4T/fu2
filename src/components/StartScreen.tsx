interface StartScreenProps {
  onStart: () => void;
  language: 'ja' | 'en';
}

export function StartScreen({ onStart, language }: StartScreenProps) {
  const content = {
    ja: {
      title: '未病サロン診断',
      subtitle: '機能医学×伝統医学による体質分析',
      description: '自律神経・ホルモン・免疫系の機能医学的観点と、気血水精の伝統医学的観点から、あなたの体質と症状を総合的に分析します。',
      startButton: '診断スタート',
      duration: '所要時間：約5分'
    },
    en: {
      title: 'Mibyou Salon Diagnosis',
      subtitle: 'Constitutional Analysis through Functional × Traditional Medicine',
      description: 'Comprehensive analysis of your constitution and symptoms from both functional medicine perspectives (autonomic nervous, hormonal, immune systems) and traditional medicine viewpoints (qi, blood, water, essence).',
      startButton: 'Start Diagnosis',
      duration: 'Duration: About 5 minutes'
    }
  };

  const t = content[language];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-gray-800 mb-6">{t.title}</h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">{t.subtitle}</p>
        <p className="text-gray-500 mb-8 max-w-4xl mx-auto leading-relaxed">{t.description}</p>
      </div>

      <div className="text-center">
        <div className="inline-block p-8 border shadow-xl bg-white/90 backdrop-blur-sm rounded-lg">
          <button
            onClick={onStart}
            className="text-xl px-12 py-6 bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 hover:from-blue-600 hover:via-green-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {t.startButton}
          </button>
          <p className="text-sm text-gray-500 mt-4">{t.duration}</p>
        </div>
      </div>
    </div>
  );
}