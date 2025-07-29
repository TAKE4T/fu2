import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question, Answer } from '../App';

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  answer?: Answer;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
  language: 'ja' | 'en';
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  answer,
  onAnswer,
  onNext,
  onPrev,
  canProceed,
  language
}: QuestionScreenProps) {
  const [inputValue, setInputValue] = useState<string>(
    (answer && typeof answer.value === 'string') ? answer.value : ''
  );
  const [checkboxValues, setCheckboxValues] = useState<string[]>(
    (answer && Array.isArray(answer.value)) ? answer.value : []
  );

  const handleRadioChange = (value: string) => {
    onAnswer(question.id, value);
  };

  const handleCheckboxChange = (value: string) => {
    let newValues: string[];
    if (checkboxValues.includes(value)) {
      newValues = checkboxValues.filter(v => v !== value);
    } else {
      newValues = [...checkboxValues, value];
    }
    setCheckboxValues(newValues);
    onAnswer(question.id, newValues);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onAnswer(question.id, value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            {questionIndex + 1} / {totalQuestions}
          </span>
          <div className="w-full max-w-md mx-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {language === 'ja' ? question.question : question.questionEn}
          </CardTitle>
          {question.category && (
            <p className="text-sm text-gray-600 mt-2">
              カテゴリ: {language === 'ja' ? question.category : question.categoryEn}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {question.type === 'radio' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answer?.value === option}
                    onChange={() => handleRadioChange(option)}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700">
                    {language === 'ja' ? option : (question.optionsEn?.[index] || option)}
                  </span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'checkbox' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option}
                    checked={checkboxValues.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-gray-700">
                    {language === 'ja' ? option : (question.optionsEn?.[index] || option)}
                  </span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'input' && (
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={4}
              placeholder={language === 'ja' ? '詳しく教えてください...' : 'Please describe in detail...'}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={questionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {language === 'ja' ? '前へ' : 'Previous'}
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          {questionIndex === totalQuestions - 1 
            ? (language === 'ja' ? '結果を見る' : 'View Results')
            : (language === 'ja' ? '次へ' : 'Next')
          }
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}