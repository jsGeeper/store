function Countdown(minutes: number, seconds: number, callback: (s: string) => void) {
  let remaining = minutes * 60 + seconds;
  const interval = setInterval(() => {
    remaining--;
    if (remaining === 0) {
      clearInterval(interval);
      callback('');
    } else {
      callback(`${Math.floor(remaining / 60)}:${remaining % 60}`);
    }
  }, 1000);
}

export default Countdown;
