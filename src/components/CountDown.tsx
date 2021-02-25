import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeOut: NodeJS.Timeout;

export function CountDown() {
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [time, setTime] = useState(0.05 * 60);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;


    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    const startCountDown = useCallback(() => {
        setIsActive(true);
    }, [setIsActive]);

    const resetCountDown = useCallback(() => {
        clearTimeout(countdownTimeOut);
        setIsActive(false);
        setTime(25 * 60);
    }, [setIsActive, countdownTimeOut]);

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setIsActive(false);
            setHasFinished(true);
        }
    }, [isActive, time])

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
                    <img src="icons/level.svg" alt="level"/>
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountDown}
                            >
                                Abandonar ciclo
                            </button>

                        ) : (
                            <button
                                className={styles.countdownButton}
                                onClick={startCountDown}
                            >
                                Iniciar ciclo
                            </button>
                        )}
                    </>
                )}



        </div>
    );
}

