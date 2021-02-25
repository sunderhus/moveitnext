import { ReactNode } from "react";
import { ChallengeProvider } from "../hooks/challenge";

interface IAppProviderProps {
    children: ReactNode
}

export function AppProvider({ children }: IAppProviderProps) {
    return (
        <ChallengeProvider>
            {children}
        </ChallengeProvider>
    );
}