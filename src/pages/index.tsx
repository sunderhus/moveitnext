import Head from 'next/head';
import { GetServerSideProps } from 'next';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallanges from '../components/CompletedChallanges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import styles from '../styles/pages/Home.module.css';
import { AppProvider } from '../hooks';

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function App({
  level,
  currentExperience,
  challengesCompleted,
}: IHomeProps): JSX.Element {
  return (
    <AppProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
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
    </AppProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    } as IHomeProps,
  };
};
