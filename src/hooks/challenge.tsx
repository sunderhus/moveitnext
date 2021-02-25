import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IChallengeContext{
    level:number;
    upLevel():void;
    experience:number;
    challengesCompleted:number;
}

interface IChallengeProps{
    children: ReactNode;
}


const ChallengeContext = createContext<IChallengeContext>({} as IChallengeContext);

export function ChallengeProvider({children}:IChallengeProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    
    const upgradeLevel = useCallback(()=>{
        setLevel(level+1);
    },[level]);

    return(
        <ChallengeContext.Provider
        value={{
            level,
            upLevel:upgradeLevel,
            experience:currentExperience,
            challengesCompleted
        }}
        >
            {children}
        </ChallengeContext.Provider>

    )
}

export function useChallenge():IChallengeContext{
    const context = useContext(ChallengeContext);
    if(!context){
        throw Error(
            'useChallenge must be within a ChallengeProvider'
        )
    }
    return context;
}

