import { createContext, useContext,  ReactNode, useReducer } from 'react';

export type Timer = {
    name: string;
    duration: number;
};

type TimersState = {
    isRunning: boolean;
    timers : Timer[]
};

const initalState: TimersState = {
    isRunning: true,
    timers: []
};

type TimersContextValue = TimersState & {
    addTimer: (timer: Timer) => void;
    startTimer: () => void;
    stopTimer: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
    const timersCtx = useContext(TimersContext);
    if (timersCtx === null) {
        throw new Error('useTimersContext must be used within a TimersContextProvider');
    }
    return timersCtx;
} 


type TimersContextProviderProps = {
 children: ReactNode;
}

type StartTimersAction = {
    type: 'START_TIMERS';
};
type StopTimersAction = {
    type: 'STOP_TIMERS';
};
type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {
    if (action.type === 'START_TIMERS') {
        return {
            ...state,
            isRunning: true
        };
    }

    if (action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false
        };
    }
    if (action.type === 'ADD_TIMER') {
        return {
            ...state,
            timers: [...state.timers, { name: action.payload.name, duration: action.payload.duration }]
        };
    }
    return state; 
}

export default function TimersContextProvider({ children }: TimersContextProviderProps) { 
    const [timersState, dispatch] = useReducer(timersReducer, initalState)
    
const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timerData) => {
        dispatch({ type: 'ADD_TIMER', payload: timerData });
    },
    startTimer: () => {
        dispatch({ type: 'START_TIMERS' });
    },
    stopTimer: () => {
        dispatch({ type: 'STOP_TIMERS' });
    }
};
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}

