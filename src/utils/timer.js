export function startQuestionTimer(durationSeconds, onTimeout) {
  let timerId = setTimeout(() => {
    onTimeout();
  }, durationSeconds * 1000);

  return {
    clear: () => clearTimeout(timerId),
  };
}
