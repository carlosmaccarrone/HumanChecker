import styles from '@/components/Prompt/Prompt.module.css';

const Prompt = ({ currentShape }) => {
  return (
    <h1 className={styles.prompt}>
      Draw a: <span style={{ color: '#ffdd57' }}>{currentShape}</span>
    </h1>
  );
}

export default Prompt;