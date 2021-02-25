import { ReactNode } from "react";
import { ChallengeProvider } from "../hooks/challenge";
import { CountdownProvider } from "../hooks/countdown";

interface IAppProviderProps {
    children: ReactNode
}

export function AppProvider({ children }: IAppProviderProps) {
    return (
        <ChallengeProvider>
            <CountdownProvider>
                {children}
            </CountdownProvider>
        </ChallengeProvider>
    );
}