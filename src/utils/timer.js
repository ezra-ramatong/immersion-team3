/**
 * Starts a countdown timer with optional tick updates.
 * @param {number} durationSeconds - Total countdown time in seconds.
 * @param {Function} onTimeout - Callback when the timer ends.
 * @param {Function} [onTick] - Optional callback fired every second with remaining time.
 * @returns {{ clear: Function }}
 */
export function startQuestionTimer(durationSeconds, onTimeout, onTick) {
  let remaining = durationSeconds;

  // Call tick immediately so the bar updates right away
  if (typeof onTick === "function") {
    onTick(remaining);
  }

  const intervalId = setInterval(() => {
    remaining--;

    if (typeof onTick === "function") {
      onTick(remaining);
    }

    if (remaining <= 0) {
      clearInterval(intervalId);
      onTimeout();
    }
  }, 1000);

  return {
    clear: () => clearInterval(intervalId),
  };
}
