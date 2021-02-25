
import Head from 'next/head';
import {ChallengeBox} from '../components/ChallengeBox';
import { CompletedChallanges } from '../components/CompletedChallanges';
import { CountDown } from '../components/CountDown';
import {ExperienceBar} from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';


function App() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | #ipteam 💙</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallanges />
          <CountDown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  );
}

export default App;
