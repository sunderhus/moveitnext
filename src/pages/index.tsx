
import { CompletedChallanges } from '../components/CompletedChallanges';
import { CountDown } from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css'

import Head from 'next/head'

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
            
        </div>
      </section>
    </div>
  );
}

export default App;
