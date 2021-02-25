import styles from '../styles/Components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
    return (
        <header className={styles.experienceBar}>
            <span> 0 xp</span>
            <div>
                <div style={{ width: '50%' }} />
                <span className={styles.currentExperience} style={{left:'50%'}}>
                    300xp
                </span>
            </div>
            <span>600xp</span>
        </header>
    );
}

export default ExperienceBar;