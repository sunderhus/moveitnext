import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useChallenge } from "./challenge";

interface ICountdownContext {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface IChallengeProps {
  children: ReactNode;
}
let countdownTimeOut: NodeJS.Timeout;

const CountdownContext = createContext<ICountdownContext>(
  {} as ICountdownContext
);

export function CountdownProvider({ children }: IChallengeProps): JSX.Element {
  const { startNewChallenge } = useChallenge();
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [time, setTime] = useState(0.05 * 60);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeOut);
    setIsActive(false);
    setTime(0.05 * 60);
    setHasFinished(false);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsActive(false);
      setHasFinished(true);
      startNewChallenge();
    }
  }, [isActive, time, startNewChallenge]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdown(): ICountdownContext {
  const context = useContext(CountdownContext);
  if (!context) {
    throw Error("useCountdown must be within a CountdownProvider");
  }
  return context;
}
