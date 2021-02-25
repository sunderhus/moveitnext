import { useChallenge } from '../hooks/challenge';
import styles from '../styles/components/CompletedChallanges.module.css'

export function CompletedChallanges(){
    const{level} = useChallenge();
    return(
        <div className={styles.container}>
            <span>Desafios completos</span>
            <span>{level}</span>
        </div>
    );
}