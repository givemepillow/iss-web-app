export const useTimer = () => {
  return function countDownTimer(countDown) {
    if (countDown.value > 0) {
      setTimeout(() => {
        countDown.value -= 1;
        countDownTimer(countDown);
      }, 1000);
    }
  };
};