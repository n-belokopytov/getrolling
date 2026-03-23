export function getAnsweredCount(answers, questions) {
  return questions.reduce(
    (count, question) => (answers[question.id] ? count + 1 : count),
    0,
  );
}

export function getScore(answers, questions) {
  return questions.reduce((total, question) => {
    const selectedValue = answers[question.id];
    const selectedOption = question.options.find(
      (option) => option.value === selectedValue,
    );
    return total + (selectedOption?.score || 0);
  }, 0);
}

export function getRecommendedMode({ answers, hasMinimumAnswers }) {
  if (!hasMinimumAnswers) return null;

  const urgency = answers.urgency;
  const bottleneck = answers.bottleneck;
  const engagement = answers.engagement;
  const authority = answers.authority;
  const team = answers.team;

  if (
    urgency === 'exploring' ||
    bottleneck === 'uncertainty' ||
    engagement === 'advisory'
  ) {
    return 'diagnose-report';
  }

  if (
    urgency === 'this-quarter' ||
    bottleneck === 'incidents' ||
    engagement === 'hands-on'
  ) {
    return 'time-framed-intervention';
  }

  if (
    (team === '41-120' || team === '120+') &&
    (authority === 'final' || authority === 'influencer')
  ) {
    return 'fractional-role';
  }

  return 'time-framed-intervention';
}
