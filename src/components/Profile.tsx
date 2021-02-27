import { useChallenge } from '../hooks/challenge';
import styles from '../styles/components/Profile.module.css';

const Profile: React.FC = () => {
  const { level } = useChallenge();
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/sunderhus.png"
        alt="Profile github Sunderhus"
      />
      <div>
        <strong>Matheus Sunderhus</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          level {level}
        </p>
      </div>
    </div>
  );
};
export default Profile;
