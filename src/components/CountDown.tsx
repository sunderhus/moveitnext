import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
    const [active,setActive] = useState(false);
    const [time, setTime] = useState( 25 * 60);

    const minutes = Math.floor(time /60);
    const seconds = time % 60;


    const [minuteLeft,minuteRight] = String(minutes).padStart(2,'0').split('');

    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');


    const startCountDown = useCallback(()=>{
        setActive(true);
    },[setActive]);

    useEffect(()=>{
        if(active && time>0){
            setTimeout(() => {
                setTime(time-1);
            }, 1000);
        }

    },[active, time])

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
            <button
                className={styles.countdownButton}
                onClick={startCountDown}
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}

