import { ReactNode } from "react";
import { ChallengeProvider, IChallengeProps } from "../hooks/challenge";
import { CountdownProvider } from "../hooks/countdown";
interface IAppProviderProps extends IChallengeProps {
    children: ReactNode
}

export function AppProvider({ children, ...rest }: IAppProviderProps) {
    return (
        <ChallengeProvider
            level={rest.level}
            currentExperience={rest.currentExperience}
            challengesCompleted={rest.challengesCompleted}
        >
            <CountdownProvider>
                {children}
            </CountdownProvider>
        </ChallengeProvider>
    );
}