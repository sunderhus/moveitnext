import { useCallback } from 'react';
import { useChallenge } from '../hooks/challenge';
import { useCountdown } from '../hooks/countdown';
import styles from '../styles/components/ChallengeBox.module.css';

const ChallengeBox: React.FC = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenge();
  const { resetCountdown } = useCountdown();

  const handleChallengeSucceeded = useCallback(() => {
    completeChallenge();
    resetCountdown();
  }, [completeChallenge, resetCountdown]);

  const handleChallengeFailed = useCallback(() => {
    resetChallenge();
    resetCountdown();
  }, [resetChallenge, resetCountdown]);

  return (
    <div className={styles.container}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header> Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="desafio" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededdButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
