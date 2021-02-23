import styles from '../styles/components/Profile.module.css'

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/sunderhus.png" alt="Profile github Sunderhus"/>
            <div>
                <strong>Matheus Sunderhus</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    level 1
                </p>
            </div>
        </div>
    );
}