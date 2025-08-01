import { Question, Answer, symptomPatternMatrix, herbRecipeDatabase } from '../App';

interface ResultScreenProps {
  questions: Question[];
  answers: Answer[];
  onRestart: () => void;
  language: 'ja' | 'en';
}

interface DiagnosisResult {
  category: string;
  score: number;
  symptoms: string[];
  recommendations: any[];
}

export default function ResultScreen({ questions, answers, onRestart, language }: ResultScreenProps) {
  // 診断ロジック
  const calculateDiagnosis = (): DiagnosisResult[] => {
    const functionalScores: { [key: string]: number } = {};
    const traditionalScores: { [key: string]: number } = {};
    const detectedSymptoms: { [key: string]: string[] } = {};

    // 機能医学カテゴリのスコア計算
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return;

      const scoreMap: { [key: string]: number } = {
        'よくある': 3, 'Often': 3,
        'たまにある': 2, 'Sometimes': 2,
        'あまりない': 1, 'Rarely': 1,
        'ない': 0, 'Never': 0,
        'とても気になる': 3, 'Very concerned': 3,
        '少し気になる': 2, 'Somewhat concerned': 2,
        'あまり気にならない': 1, 'Not much concerned': 1,
        '気にならない': 0, 'Not concerned': 0
      };

      if (question.category && typeof answer.value === 'string') {
        const score = scoreMap[answer.value] || 0;
        if (score > 0) {
          functionalScores[question.category] = (functionalScores[question.category] || 0) + score;
          if (!detectedSymptoms[question.category]) {
            detectedSymptoms[question.category] = [];
          }
          detectedSymptoms[question.category].push(question.question);
        }
      }

      // チェックボックスの場合
      if (Array.isArray(answer.value) && answer.value.length > 0) {
        const nonEmptyAnswers = answer.value.filter(v => v !== '該当なし' && v !== 'None applicable');
        if (nonEmptyAnswers.length > 0 && question.category) {
          functionalScores[question.category] = (functionalScores[question.category] || 0) + nonEmptyAnswers.length;
          if (!detectedSymptoms[question.category]) {
            detectedSymptoms[question.category] = [];
          }
          detectedSymptoms[question.category].push(question.question);
        }
      }
    });

    // 伝統医学要素のスコア計算
    Object.entries(functionalScores).forEach(([category, score]) => {
      Object.entries(symptomPatternMatrix).forEach(([element, relations]) => {
        const relation = relations[category as keyof typeof relations];
        if (relation) {
          traditionalScores[element] = (traditionalScores[element] || 0) + (score * relation);
        }
      });
    });

    // 結果の生成
    const results: DiagnosisResult[] = [];

    // 機能医学の結果
    Object.entries(functionalScores).forEach(([category, score]) => {
      if (score > 0) {
        const recommendations = herbRecipeDatabase.filter(recipe => 
          recipe.target_symptoms.some(symptom => 
            detectedSymptoms[category]?.some(detected => 
              detected.includes(symptom) || symptom.includes(category)
            )
          )
        );

        results.push({
          category: `機能医学: ${category}`,
          score,
          symptoms: detectedSymptoms[category] || [],
          recommendations
        });
      }
    });

    // 伝統医学の結果
    Object.entries(traditionalScores).forEach(([element, score]) => {
      if (score > 2) {
        const recommendations = herbRecipeDatabase.filter(recipe =>
          recipe.herbs.some(herb => 
            herb.properties.some(prop => 
              element === '気' && ['理気', '補気'].includes(prop) ||
              element === '血' && ['補血', '活血'].includes(prop) ||
              element === '水' && ['利水', '化湿'].includes(prop) ||
              element === '精' && ['補腎', '益精'].includes(prop)
            )
          )
        );

        results.push({
          category: `伝統医学: ${element}の不調`,
          score,
          symptoms: [],
          recommendations
        });
      }
    });

    return results.sort((a, b) => b.score - a.score);
  };

  const results = calculateDiagnosis();

  const generatePDF = () => {
    const content = results.map(result => `
${result.category} (スコア: ${result.score})
症状: ${result.symptoms.join(', ')}
推奨施術: ${result.recommendations.map(r => r.name).join(', ')}
    `).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagnosis-result.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border bg-white text-gray-800 shadow-sm mb-8">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <h3 className="text-2xl font-bold text-green-700">
            {language === 'ja' ? '診断結果' : 'Diagnosis Results'}
          </h3>
          <p className="text-gray-600 mt-2">
            {language === 'ja' 
              ? 'あなたの体質と症状に基づいた個別の診断結果です' 
              : 'Personalized diagnosis based on your constitution and symptoms'
            }
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border bg-white text-gray-800 shadow-sm">
          <div className="p-6 pt-0 text-center py-12">
            <p className="text-lg text-gray-600">
              {language === 'ja' 
                ? '特に気になる症状は検出されませんでした。健康的な生活を心がけましょう。' 
                : 'No significant symptoms detected. Continue maintaining a healthy lifestyle.'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="rounded-lg border bg-white text-gray-800 shadow-sm border-l-4 border-l-green-500">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center justify-between">
                  <span>{result.category}</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    スコア: {result.score}
                  </span>
                </h3>
              </div>
              <div className="p-6 pt-0">
                {result.symptoms.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">検出された症状:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {result.symptoms.map((symptom, idx) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">推奨施術:</h4>
                    <div className="grid gap-3">
                      {result.recommendations.slice(0, 2).map((recipe, idx) => (
                        <div key={idx} className="bg-green-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-green-800">{recipe.name}</h5>
                            <span className="text-green-700 font-semibold">{recipe.price}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{recipe.treatment_approach}</p>
                          <div className="text-xs text-gray-600">
                            <p>施術時間: {recipe.session_duration}</p>
                            <p>推奨頻度: {recipe.recommended_frequency}</p>
                          </div>
                          <div className="mt-2">
                            <button className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-8 px-3">
                              詳細を見る
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={generatePDF}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-10 px-4 py-2"
        >
          {language === 'ja' ? '結果をダウンロード' : 'Download Results'}
        </button>
        
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2"
        >
          {language === 'ja' ? 'もう一度診断する' : 'Take Diagnosis Again'}
        </button>
      </div>
    </div>
  );
}