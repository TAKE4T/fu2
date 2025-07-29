import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { LanguageToggle } from './components/LanguageToggle';

export interface Question {
  id: string;
  type: 'radio' | 'checkbox' | 'input';
  question: string;
  questionEn: string;
  options?: string[];
  optionsEn?: string[];
  category?: string;
  categoryEn?: string;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

// 機能医学と伝統医学に基づく質問データ
const questions: Question[] = [
  {
    id: 'M1',
    type: 'radio',
    category: '自律神経',
    categoryEn: 'autonomic_nervous',
    question: '寝つきが悪く、夜中に目が覚めることがありますか？',
    questionEn: 'Do you have difficulty falling asleep and wake up during the night?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'M2',
    type: 'radio',
    category: '自律神経',
    categoryEn: 'autonomic_nervous',
    question: '緊張しやすく、心配ごとが頭から離れないことがありますか？',
    questionEn: 'Do you get tense easily and have persistent worries?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'M3',
    type: 'radio',
    category: '自律神経',
    categoryEn: 'autonomic_nervous',
    question: '朝が苦手で、ぼーっとしてしまいますか？',
    questionEn: 'Do you have difficulty in the morning and feel mentally foggy?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'M4',
    type: 'radio',
    category: 'ホルモン',
    categoryEn: 'hormone',
    question: '月経のリズムが安定しないことがありますか？（該当しない場合は「ない」を選択）',
    questionEn: 'Do you have irregular menstrual rhythm? (Select "Never" if not applicable)',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'M7',
    type: 'radio',
    category: '免疫系',
    categoryEn: 'immune_system',
    question: '花粉症・鼻炎・アトピーなどのアレルギー症状がありますか？',
    questionEn: 'Do you have allergy symptoms such as hay fever, rhinitis, or atopy?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'F1',
    type: 'radio',
    category: '気',
    categoryEn: 'qi',
    question: '疲れやすく、だるさが取れないことがありますか？',
    questionEn: 'Do you get tired easily with persistent lethargy?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'F2',
    type: 'radio',
    category: '気',
    categoryEn: 'qi',
    question: 'ため息が多く、やる気が出ないことがありますか？',
    questionEn: 'Do you sigh frequently and lack motivation?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'F4',
    type: 'radio',
    category: '血',
    categoryEn: 'blood',
    question: '顔色が悪く、肌が乾燥しやすいですか？',
    questionEn: 'Do you have poor complexion and dry skin?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'F6',
    type: 'checkbox',
    category: '血（瘀血）',
    categoryEn: 'blood_stasis',
    question: '以下の症状で当てはまるものはありますか？（複数選択可）',
    questionEn: 'Which of the following symptoms apply to you? (Multiple selection)',
    options: ['肩こり', '冷え性', '経血に塊がある', '該当なし'],
    optionsEn: ['Shoulder stiffness', 'Cold sensitivity', 'Menstrual clots', 'None applicable']
  },
  {
    id: 'F8',
    type: 'radio',
    category: '水',
    categoryEn: 'water',
    question: 'むくみやすく、身体が重だるいことがありますか？',
    questionEn: 'Do you experience easy swelling and heavy body feeling?',
    options: ['よくある', 'たまにある', 'あまりない', 'ない'],
    optionsEn: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'F12',
    type: 'radio',
    category: '精（腎精）',
    categoryEn: 'essence_kidney',
    question: '抜け毛や白髪が気になりますか？',
    questionEn: 'Are you concerned about hair loss or gray hair?',
    options: ['とても気になる', '少し気になる', 'あまり気にならない', '気にならない'],
    optionsEn: ['Very concerned', 'Somewhat concerned', 'Not much concerned', 'Not concerned']
  },
  {
    id: 'additional',
    type: 'input',
    category: 'その他',
    categoryEn: 'other',
    question: 'その他、特に気になる身体の不調があれば詳しく教えてください',
    questionEn: 'Please describe any other particular physical discomfort in detail'
  }
];

// 症状パターンマトリックス
export const symptomPatternMatrix = {
  "気": {"自律神経": 3, "ホルモン": 1, "免疫": 3},
  "血": {"自律神経": 1, "ホルモン": 1, "免疫": 2},
  "水": {"自律神経": 3, "ホルモン": 1, "免疫": 2},
  "精": {"自律神経": 3, "ホルモン": 1, "免疫": 2}
};

// 生薬RAGデータベース
export const herbRecipeDatabase = [
  {
    recipe_id: "R001",
    name: "リズム巡り蒸し",
    name_en: "rhythm_circulation_steam",
    primary_actions: ["血流促進", "ホルモンバランス調整"],
    primary_actions_en: ["blood_circulation_promotion", "hormone_balance_adjustment"],
    herbs: [
      {"name": "よもぎ", "name_en": "artemisia", "properties": ["温経", "理気", "調経"]},
      {"name": "当帰", "name_en": "angelica", "properties": ["補血", "活血", "調経"]},
      {"name": "紅花", "name_en": "safflower", "properties": ["活血", "通経", "散瘀"]},
      {"name": "玫瑰花", "name_en": "rose_flower", "properties": ["理気", "活血", "調経"]},
      {"name": "陳皮", "name_en": "tangerine_peel", "properties": ["理気", "健脾", "化痰"]}
    ],
    target_conditions: ["M4", "M5", "M6", "M12", "F4", "F5", "F6"],
    target_symptoms: ["月経不順", "更年期症状", "PMS", "月経痛", "血虚", "瘀血"],
    keywords: ["月経", "ホルモン", "血流", "女性", "生理", "更年期"],
    vector_tags: ["menstrual", "hormone", "circulation", "women_health", "blood_flow", "reproductive"],
    treatment_approach: "ホルモンバランスを整え、血流を改善することで女性特有の症状を緩和",
    contraindications: ["妊娠中", "重度の出血性疾患"],
    session_duration: "30-40分",
    recommended_frequency: "週2-3回",
    price: "¥8,800",
    price_en: "$88"
  },
  {
    recipe_id: "R002",
    name: "デトックス蒸し",
    name_en: "detox_steam",
    primary_actions: ["むくみ改善", "瘀血除去", "免疫サポート"],
    primary_actions_en: ["edema_improvement", "blood_stasis_removal", "immune_support"],
    herbs: [
      {"name": "よもぎ", "name_en": "artemisia", "properties": ["温経", "理気", "調経"]},
      {"name": "益母草", "name_en": "motherwort", "properties": ["活血", "調経", "利水"]},
      {"name": "桃の葉", "name_en": "peach_leaf", "properties": ["活血", "解毒", "消腫"]},
      {"name": "ローズマリー", "name_en": "rosemary", "properties": ["抗酸化", "血流促進", "抗菌"]}
    ],
    target_conditions: ["M7", "M8", "F6", "F8", "F9"],
    target_symptoms: ["むくみ", "瘀血", "アレルギー", "免疫異常", "水滞", "血流停滞"],
    keywords: ["デトックス", "むくみ", "解毒", "免疫", "水分代謝", "血液浄化"],
    vector_tags: ["detox", "edema", "immune", "purification", "water_metabolism", "blood_cleansing"],
    treatment_approach: "体内の老廃物排出を促進し、免疫機能をサポートして全身の巡りを改善",
    contraindications: ["急性炎症期", "発熱時"],
    session_duration: "30-40分",
    recommended_frequency: "週1-2回",
    price: "¥7,200",
    price_en: "$72"
  },
  {
    recipe_id: "R003",
    name: "安眠ゆるり蒸し",
    name_en: "peaceful_sleep_steam",
    primary_actions: ["自律神経調整", "リラックス促進", "睡眠改善"],
    primary_actions_en: ["autonomic_nervous_regulation", "relaxation_promotion", "sleep_improvement"],
    herbs: [
      {"name": "よもぎ", "name_en": "artemisia", "properties": ["温経", "理気", "調経"]},
      {"name": "イチョウ葉", "name_en": "ginkgo_leaf", "properties": ["活血", "化瘀", "開竅"]},
      {"name": "当帰", "name_en": "angelica", "properties": ["補血", "活血", "調経"]},
      {"name": "カモミール", "name_en": "chamomile", "properties": ["鎮静", "抗炎症", "リラックス"]},
      {"name": "枇杷の葉", "name_en": "loquat_leaf", "properties": ["清熱", "潤肺", "鎮咳"]}
    ],
    target_conditions: ["M1", "M2", "M3", "M10", "M11", "F13"],
    target_symptoms: ["不眠", "不安", "緊張", "情緒不安定", "感覚過敏", "浅眠"],
    keywords: ["睡眠", "リラックス", "自律神経", "不眠", "安眠", "鎮静"],
    vector_tags: ["sleep", "relaxation", "autonomic", "insomnia", "calming", "nervous_system"],
    treatment_approach: "自律神経を整え、心身をリラックスさせることで質の良い睡眠をサポート",
    contraindications: ["低血圧", "妊娠初期"],
    session_duration: "40-50分",
    recommended_frequency: "週2-3回",
    price: "¥9,500",
    price_en: "$95"
  }
];

// 診断データベース
export const diagnosisDatabase = {
  functional_medicine_categories: [
    {
      id: "M1",
      category: "自律神経",
      category_en: "autonomic_nervous",
      symptom: "寝つきが悪く、夜中に目が覚める",
      symptom_en: "difficulty_falling_asleep_night_awakening",
      keywords: ["睡眠障害", "不眠", "夜間覚醒", "入眠困難"],
      vector_tags: ["sleep", "insomnia", "autonomic", "nervous_system"]
    },
    {
      id: "M2",
      category: "自律神経",
      category_en: "autonomic_nervous",
      symptom: "緊張しやすく、心配ごとが頭から離れない",
      symptom_en: "easily_tense_persistent_worry",
      keywords: ["不安", "緊張", "心配", "ストレス"],
      vector_tags: ["anxiety", "tension", "worry", "stress", "autonomic"]
    },
    {
      id: "M3",
      category: "自律神経",
      category_en: "autonomic_nervous",
      symptom: "朝が苦手で、ぼーっとしてしまう",
      symptom_en: "morning_difficulty_mental_fog",
      keywords: ["朝の不調", "集中力低下", "ぼんやり", "覚醒困難"],
      vector_tags: ["morning", "fog", "concentration", "awakening", "autonomic"]
    },
    {
      id: "M4",
      category: "ホルモン",
      category_en: "hormone",
      symptom: "月経のリズムが安定しない",
      symptom_en: "irregular_menstrual_rhythm",
      keywords: ["月経不順", "生理不順", "月経周期", "ホルモンバランス"],
      vector_tags: ["menstrual", "irregular", "cycle", "hormone", "rhythm"]
    },
    {
      id: "M7",
      category: "免疫系",
      category_en: "immune_system",
      symptom: "花粉症・鼻炎・アトピーなどがある",
      symptom_en: "hay_fever_rhinitis_atopy",
      keywords: ["アレルギー", "花粉症", "鼻炎", "アトピー性皮膚炎"],
      vector_tags: ["allergy", "hay_fever", "rhinitis", "atopy", "immune"]
    }
  ],
  traditional_medicine_elements: [
    {
      id: "F1",
      element: "気",
      element_en: "qi",
      symptom: "疲れやすく、だるさが取れない",
      symptom_en: "easily_fatigued_persistent_lethargy",
      keywords: ["疲労", "だるさ", "気虚", "エネルギー不足"],
      vector_tags: ["fatigue", "qi_deficiency", "energy", "lethargy"]
    },
    {
      id: "F2",
      element: "気",
      element_en: "qi",
      symptom: "ため息が多く、やる気が出ない",
      symptom_en: "frequent_sighing_lack_motivation",
      keywords: ["気うつ", "ため息", "やる気なし", "気滞"],
      vector_tags: ["sighing", "motivation", "qi_stagnation", "depression"]
    },
    {
      id: "F4",
      element: "血",
      element_en: "blood",
      symptom: "顔色が悪く、肌が乾燥しやすい",
      symptom_en: "poor_complexion_dry_skin",
      keywords: ["血虚", "顔色不良", "肌乾燥", "血液不足"],
      vector_tags: ["complexion", "dry_skin", "blood_deficiency", "pallor"]
    },
    {
      id: "F6",
      element: "血（瘀血）",
      element_en: "blood_stasis",
      symptom: "肩こり・冷え性・経血に塊がある",
      symptom_en: "shoulder_stiffness_coldness_menstrual_clots",
      keywords: ["瘀血", "血流停滞", "肩こり", "冷え性", "血塊"],
      vector_tags: ["blood_stasis", "shoulder_stiffness", "coldness", "clots"]
    },
    {
      id: "F8",
      element: "水",
      element_en: "water",
      symptom: "むくみやすく、身体が重だるい",
      symptom_en: "easy_swelling_heavy_body",
      keywords: ["水腫", "むくみ", "重だるさ", "水滞"],
      vector_tags: ["swelling", "edema", "heavy", "water_retention"]
    },
    {
      id: "F12",
      element: "精（腎精）",
      element_en: "essence_kidney",
      symptom: "抜け毛や白髪が気になる",
      symptom_en: "hair_loss_gray_hair",
      keywords: ["腎精不足", "抜け毛", "白髪", "老化"],
      vector_tags: ["hair_loss", "gray_hair", "kidney_essence", "aging"]
    }
  ]
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<'start' | 'questions' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  const handleStart = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    const newAnswers = answers.filter(a => a.questionId !== questionId);
    newAnswers.push({ questionId, value });
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const canProceed = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return answer && (
      (typeof answer.value === 'string' && answer.value.trim() !== '') ||
      (Array.isArray(answer.value) && answer.value.length > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 relative">
      <LanguageToggle language={language} onToggle={setLanguage} />
      
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'start' && (
          <StartScreen onStart={handleStart} language={language} />
        )}
        
        {currentStep === 'questions' && (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            answer={answers.find(a => a.questionId === questions[currentQuestionIndex].id)}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            canProceed={canProceed()}
            language={language}
          />
        )}
        
        {currentStep === 'result' && (
          <ResultScreen
            questions={questions}
            answers={answers}
            onRestart={handleRestart}
            language={language}
          />
        )}
      </div>
    </div>
  );
}