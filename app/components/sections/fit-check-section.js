export function FitCheckSection({
  answers,
  answeredCount,
  hasMinimumAnswers,
  isFitCheckOpen,
  isSubmitted,
  onAnswerChange,
  onFitCheckSubmit,
  onRecommendationClick,
  onToggleOpen,
  qualificationSection,
  questionSelectRefs,
  recommendation,
  recommendedMode,
  remainingAnswers,
  trackEvent,
}) {
  return (
    <section id={qualificationSection.id} className="section fit-check-section">
      <div className="fit-check-prompt">
        <button
          className="button secondary fit-check-toggle"
          type="button"
          aria-expanded={isFitCheckOpen}
          onClick={onToggleOpen}
        >
          {isFitCheckOpen ? qualificationSection.hideCta : qualificationSection.showCta}
        </button>
        {!isFitCheckOpen ? (
          <p className="fit-check-prompt-note">
            Optional if you want guidance before you submit.
          </p>
        ) : null}
      </div>
      {isFitCheckOpen ? (
        <form className="fit-check-card card large-card" onSubmit={onFitCheckSubmit}>
          <div className="fit-check-progress">
            <div className="fit-check-kicker">
              Completed {answeredCount}/{qualificationSection.questions.length}
            </div>
            <div className="fit-check-kicker">Target: 2 minutes</div>
          </div>
          <p
            className={`fit-check-status ${remainingAnswers > 0 ? 'fit-check-status-warning' : 'fit-check-status-ready'}`}
            aria-live="polite"
          >
            {remainingAnswers > 0
              ? `Answer ${remainingAnswers} more prompt${remainingAnswers === 1 ? '' : 's'} to score fit.`
              : 'Ready to score fit.'}
          </p>

          {qualificationSection.questions.map((question) => (
            <label
              className={`fit-question ${isSubmitted && !answers[question.id] && !hasMinimumAnswers ? 'fit-question-missing' : ''}`}
              key={question.id}
            >
              <span>{question.label}</span>
              <select
                ref={(node) => {
                  questionSelectRefs.current[question.id] = node;
                }}
                value={answers[question.id] || ''}
                onChange={(event) => onAnswerChange(question.id, event.target.value)}
                aria-invalid={isSubmitted && !answers[question.id] && !hasMinimumAnswers}
                aria-describedby={
                  isSubmitted && !answers[question.id] && !hasMinimumAnswers
                    ? `${question.id}-error`
                    : undefined
                }
              >
                <option value="">Select one</option>
                {question.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {isSubmitted && !answers[question.id] && !hasMinimumAnswers ? (
                <span id={`${question.id}-error`} className="fit-question-error">
                  Select an option for this prompt.
                </span>
              ) : null}
            </label>
          ))}

          <button className="button primary fit-check-submit" type="submit">
            See recommended path
          </button>

          {isSubmitted && !hasMinimumAnswers ? (
            <p className="fit-check-warning" role="alert">
              Answer at least {qualificationSection.minAnswers} prompts to score fit.
            </p>
          ) : null}

          {isSubmitted && hasMinimumAnswers ? (
            <div className="fit-result">
              <h3>{recommendation.title}</h3>
              <p className="fit-result-bridge">
                Based on your answers, this is the best mode.
              </p>
              <p>{recommendation.body}</p>
              <button
                className="button dark"
                type="button"
                onClick={() => {
                  trackEvent('fitcheck_recommendation_click', {
                    action: recommendedMode,
                  });
                  onRecommendationClick();
                }}
              >
                {recommendation.ctaLabel}
              </button>
              <p className="fit-result-secondary">
                Want to skip fit check?{' '}
                <a
                  href="#contact-form"
                  onClick={() =>
                    trackEvent('fitcheck_skip_to_contact_click', {
                      action: recommendedMode,
                    })
                  }
                >
                  Go straight to the context form
                </a>
              </p>
            </div>
          ) : null}
        </form>
      ) : null}
    </section>
  );
}
