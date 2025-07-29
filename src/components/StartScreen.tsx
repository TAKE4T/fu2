import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Heart, Stethoscope, Leaf, Brain, Droplet, Zap } from 'lucide-react';

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
      features: [
        {
          title: '機能医学アプローチ',
          description: '自律神経・ホルモン・免疫系の状態を科学的に評価',
          icon: Brain
        },
        {
          title: '伝統医学の智慧',
          description: '気血水精の流れから体質を東洋医学的に分析',
          icon: Leaf
        },
        {
          title: '個別化ケア提案',
          description: 'あなた専用の生薬・施術・生活改善法をご提案',
          icon: Heart
        }
      ],
      startButton: '診断スタート',
      duration: '所要時間：約5分',
      categories: [
        { name: '自律神経系', icon: Zap, color: 'text-blue-600' },
        { name: 'ホルモン系', icon: Heart, color: 'text-pink-600' },
        { name: '気血水精', icon: Droplet, color: 'text-green-600' }
      ]
    },
    en: {
      title: 'Mibyou Salon Diagnosis',
      subtitle: 'Constitutional Analysis through Functional × Traditional Medicine',
      description: 'Comprehensive analysis of your constitution and symptoms from both functional medicine perspectives (autonomic nervous, hormonal, immune systems) and traditional medicine viewpoints (qi, blood, water, essence).',
      features: [
        {
          title: 'Functional Medicine Approach',
          description: 'Scientific evaluation of autonomic nervous, hormonal, and immune systems',
          icon: Brain
        },
        {
          title: 'Traditional Medicine Wisdom',
          description: 'Constitutional analysis through qi, blood, water, and essence flow',
          icon: Leaf
        },
        {
          title: 'Personalized Care Recommendations',
          description: 'Customized herbal medicines, treatments, and lifestyle improvements',
          icon: Heart
        }
      ],
      startButton: 'Start Diagnosis',
      duration: 'Duration: About 5 minutes',
      categories: [
        { name: 'Autonomic Nervous', icon: Zap, color: 'text-blue-600' },
        { name: 'Hormonal System', icon: Heart, color: 'text-pink-600' },
        { name: 'Qi-Blood-Water-Essence', icon: Droplet, color: 'text-green-600' }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-green-100 rounded-full">
            <Stethoscope className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl text-gray-800">{t.title}</h1>
          <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full">
            <Leaf className="w-8 h-8 text-pink-600" />
          </div>
        </div>
        
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
        
        <p className="text-gray-500 mb-8 max-w-4xl mx-auto leading-relaxed">
          {t.description}
        </p>

        {/* Category Preview */}
        <div className="flex justify-center gap-8 mb-12">
          {t.categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full shadow-sm">
                <IconComponent className={`w-5 h-5 ${category.color}`} />
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {t.features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index} className="p-6 text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-green-100 via-blue-100 to-pink-100 rounded-full">
                  <IconComponent className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Card className="inline-block p-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <Button
            onClick={onStart}
            size="lg"
            className="text-xl px-12 py-6 bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 hover:from-blue-600 hover:via-green-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t.startButton}
          </Button>
          <p className="text-sm text-gray-500 mt-4">{t.duration}</p>
        </Card>
      </div>
    </div>
  );
}