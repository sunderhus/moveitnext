import { ReactNode } from 'react';
import { ChallengeProvider, IChallengeProps } from './challenge';
import { CountdownProvider } from './countdown';

interface IAppProviderProps extends IChallengeProps {
  children: ReactNode;
}

export function AppProvider({
  children,
  ...rest
}: IAppProviderProps): JSX.Element {
  return (
    <ChallengeProvider
      level={rest.level}
      currentExperience={rest.currentExperience}
      challengesCompleted={rest.challengesCompleted}
    >
      <CountdownProvider>{children}</CountdownProvider>
    </ChallengeProvider>
  );
}
