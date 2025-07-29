import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Question, Answer } from '../App';

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

export function QuestionScreen({
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
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  
  const content = {
    ja: {
      questionLabel: '質問',
      nextButton: '次へ',
      prevButton: '戻る',
      placeholder: 'ご自由にお書きください...'
    },
    en: {
      questionLabel: 'Question',
      nextButton: 'Next',
      prevButton: 'Back',
      placeholder: 'Please write freely...'
    }
  };

  const t = content[language];
  const questionText = language === 'ja' ? question.question : question.questionEn;
  const options = language === 'ja' ? question.options : question.optionsEn;

  const handleRadioChange = (value: string) => {
    onAnswer(question.id, value);
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentValue = Array.isArray(answer?.value) ? answer.value : [];
    let newValue: string[];
    
    if (checked) {
      newValue = [...currentValue, optionValue];
    } else {
      newValue = currentValue.filter(v => v !== optionValue);
    }
    
    onAnswer(question.id, newValue);
  };

  const handleInputChange = (value: string) => {
    onAnswer(question.id, value);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">
            {t.questionLabel} {questionIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-3 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>

      <Card className="p-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <h2 className="text-2xl mb-8 text-gray-800 leading-relaxed">
          {questionText}
        </h2>

        <div className="mb-8">
          {question.type === 'radio' && options && (
            <RadioGroup
              value={typeof answer?.value === 'string' ? answer.value : ''}
              onValueChange={handleRadioChange}
              className="space-y-4"
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'checkbox' && options && (
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Checkbox
                    id={`checkbox-${index}`}
                    checked={Array.isArray(answer?.value) && answer.value.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, !!checked)}
                  />
                  <Label htmlFor={`checkbox-${index}`} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {question.type === 'input' && (
            <Input
              value={typeof answer?.value === 'string' ? answer.value : ''}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t.placeholder}
              className="w-full p-4 text-lg border-2 border-gray-200 focus:border-green-400 rounded-lg"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={onPrev}
            variant="outline"
            disabled={questionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-gray-400"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.prevButton}
          </Button>

          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.nextButton}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}