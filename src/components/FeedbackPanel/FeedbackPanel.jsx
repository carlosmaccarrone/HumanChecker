import styles from '@/components/FeedbackPanel/FeedbackPanel.module.css';

const FeedbackPanel = ({ prediction, feedback, currentShape }) => {
  if (!prediction) return null;

  const { shape, confidence } = prediction;

  const showPrediction = !(confidence < 60 && shape !== currentShape);

  return (
    <div className={styles.feedback}>
      {showPrediction && (
        <p>
          Prediction:{" "}
          <span className={styles.shape}>
            {shape}
          </span>{" "}
          ({confidence}%)
        </p>
      )}
      <p className={styles.message}>{feedback}</p>
    </div>
  );
};

export default FeedbackPanel;