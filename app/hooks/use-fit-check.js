import { useMemo, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { getAnsweredCount, getRecommendedMode, getScore } from '../lib/fit-check';

export function useFitCheck(qualificationSection) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFitCheckOpen, setIsFitCheckOpen] = useState(false);
  const questionSelectRefs = useRef({});
  const hasTrackedStep1StartRef = useRef(false);

  const answeredCount = useMemo(
    () => getAnsweredCount(answers, qualificationSection.questions),
    [answers, qualificationSection.questions],
  );
  const score = useMemo(
    () => getScore(answers, qualificationSection.questions),
    [answers, qualificationSection.questions],
  );
  const hasMinimumAnswers = answeredCount >= qualificationSection.minAnswers;
  const recommendedMode = useMemo(
    () => getRecommendedMode({ answers, hasMinimumAnswers }),
    [answers, hasMinimumAnswers],
  );
  const recommendation = recommendedMode
    ? qualificationSection.recommendations[recommendedMode]
    : null;
  const remainingAnswers = Math.max(qualificationSection.minAnswers - answeredCount, 0);

  function onAnswerChange(questionId, value) {
    if (!hasTrackedStep1StartRef.current) {
      trackEvent('fitcheck_start');
      hasTrackedStep1StartRef.current = true;
    }
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function onFitCheckSubmit(event) {
    event.preventDefault();
    const unansweredQuestion = qualificationSection.questions.find(
      (question) => !answers[question.id],
    );

    trackEvent('fitcheck_submit', {
      answeredCount,
      minimumRequired: qualificationSection.minAnswers,
      score,
      recommendedMode,
    });
    setIsSubmitted(true);

    if (!hasMinimumAnswers && unansweredQuestion) {
      questionSelectRefs.current[unansweredQuestion.id]?.focus();
    }
  }

  return {
    answers,
    answeredCount,
    hasMinimumAnswers,
    isFitCheckOpen,
    isSubmitted,
    onAnswerChange,
    onFitCheckSubmit,
    questionSelectRefs,
    recommendation,
    recommendedMode,
    score,
    remainingAnswers,
    setIsFitCheckOpen,
  };
}
