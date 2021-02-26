import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from "../components/LevelUpModal";
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
    startNewChallenge(): void;
    resetChallenge(): void;
    completeChallenge(): void;
    closeLevelUpModal(): void;
}

export interface IChallengeProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

const ChallengeContext = createContext<IChallengeContext>({} as IChallengeContext);

export function ChallengeProvider({
    children,
    ...rest
}: IChallengeProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null as IChallenge);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [experienceToNextLevel, setExperienceToNetLevel] = useState(() => {
        return Math.pow((level + 1) * 4, 2);
    })

    useEffect(() => {
        setExperienceToNetLevel(Math.pow((level + 1) * 4, 2));
    }, [level]);

    useEffect(() => {
        async function requestNotifyPermitions(): Promise<void> {
            if ("Notification" in window) {
                await Notification.requestPermission();
            }
        }
        requestNotifyPermitions();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted])

    const levelUp = useCallback((newlevel?:number) => {
        
        setLevel(newlevel ?? level+1);
        
        if (!isLevelUpModalOpen) {
            setIsLevelUpModalOpen(true);
        }
    }, [level, isLevelUpModalOpen]);

    async function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        await new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🔥', {
                body: `Valendo ${challenge.amount}xp!`,
                badge: `/icons/${challenge.type}.svg`,
                icon: `/icons/${challenge.type}.svg`,
                image: `/icons/${challenge.type}.svg`
            });
        }

        setActiveChallenge(challenge as IChallenge);

    }

    const resetChallenge = useCallback(() => {
        setActiveChallenge(null);
    }, []);

    const completeChallenge = useCallback(() => {
        if (!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount;
        let finalLevel = level;


        while (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            finalLevel++;
        }

        finalLevel>level && levelUp(finalLevel);

        setCurrentExperience(finalExperience);
        setActiveChallenge(null as IChallenge);
        setChallengesCompleted(challengesCompleted + 1);

    }, [experienceToNextLevel, activeChallenge, challengesCompleted, currentExperience,level]);

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }


    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}
            {isLevelUpModalOpen &&<LevelUpModal />}
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

