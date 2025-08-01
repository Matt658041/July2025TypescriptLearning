import Container from './UI/Container.tsx';
import { Timer as TimerProps, useTimersContext } from '../store/timer-context.tsx';
import { useEffect, useRef, useState } from 'react';



export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

   const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number; 

  if (isRunning)  {
    timer = setInterval(function ()  {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          return prevTime;
        }
        return prevTime - 50;
      });
    }, 50);
    interval.current = timer;
  } else if (interval.current) {
    clearInterval(interval.current);
    interval.current = null;
  }
  return () => clearInterval(timer);
}, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed();

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{<progress value={remainingTime} max={duration * 1000} />}</p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
