import { useChallenge } from "../hooks/challenge";
import styles from "../styles/components/CompletedChallanges.module.css";

const CompletedChallanges: React.FC = () => {
  const { challengesCompleted } = useChallenge();
  return (
    <div className={styles.container}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};
export default CompletedChallanges;
