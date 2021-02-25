import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import challenges from '../../challenges.json';

interface IChallenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface IChallengeContext {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: IChallenge;
    experienceToNextLevel: number;
    levelUp(): void;
    startNewChallenge(): void;
    resetChallenge(): void;
    completeChallenge(): void;
}

interface IChallengeProps {
    children: ReactNode;
}

const ChallengeContext = createContext<IChallengeContext>({} as IChallengeContext);

export function ChallengeProvider({ children }: IChallengeProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null as IChallenge);
    const [experienceToNextLevel, setExperienceToNetLevel] = useState(() => {
        return Math.pow((level + 1) * 4, 2);
    })

    const levelUp = useCallback(() => {
        setLevel(level + 1);
    }, [level]);

    const startNewChallenge = useCallback(async () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        await new Audio('/notification.mp3').play();
        
        if ("Notification"in window && Notification.permission === 'granted') {
            new Notification('Novo desafio 🔥', {
                body: `Valendo ${challenge.amount}xp!`,
                badge:`icons/${challenge.type}.svg`,
                icon: `icons/${challenge.type}.svg`,
                image:`icons/${challenge.type}.svg`
            });
        }

        setActiveChallenge(challenge as IChallenge);
        
    }, [challenges])

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null);
    }, []);

    const completeChallenge = useCallback(() => {
        if (!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount;

        while (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null as IChallenge);
        setChallengesCompleted(challengesCompleted + 1);

    }, [experienceToNextLevel, activeChallenge, challengesCompleted, currentExperience]);

    useEffect(() => {
        setExperienceToNetLevel(Math.pow((level + 1) * 4, 2));
    }, [level]);

    useEffect(() => {
        async function requestNotifyPermitions():Promise<void>{
            if("Notification"in window){
                await Notification.requestPermission();
            }
        }
        requestNotifyPermitions();
    }, []);

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }}
        >
            {children}
        </ChallengeContext.Provider>

    )
}

export function useChallenge(): IChallengeContext {
    const context = useContext(ChallengeContext);
    if (!context) {
        throw Error(
            'useChallenge must be within a ChallengeProvider'
        )
    }
    return context;
}

