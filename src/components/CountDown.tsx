import { useCountdown } from '../hooks/countdown';
import styles from '../styles/components/CountDown.module.css';


export function CountDown() {
    const { 
        hasFinished,
        isActive,
        minutes,
        seconds,
        resetCountdown,
        startCountdown
    } = useCountdown();

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={`${styles.countdownButton}`}
                >
                    Ciclo encerrado
                    <img src="icons/level.svg" alt="level" />
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo
                            </button>

                        ) : (
                                <button
                                    className={styles.countdownButton}
                                    onClick={startCountdown}
                                >
                                    Iniciar ciclo
                                </button>
                            )}
                    </>
                )}



        </div>
    );
}

