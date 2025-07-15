import { useContext } from 'react';
import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timer-context.tsx';


export default function Header() {
 const timersCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={timersCtx.isRunning ? timersCtx.stopTimer : timersCtx.startTimer}>
        {timersCtx.isRunning ? 'Stop Timers' : 'Start Timers'}
      </Button>
    </header>
  );
}
