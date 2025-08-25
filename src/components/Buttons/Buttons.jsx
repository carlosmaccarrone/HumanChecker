import styles from '@/components/Buttons/Buttons.module.css';

const Buttons = ({ handleCheck, handleNext, handleUndo, handleRedo, handleClear, prediction }) => {
  const disabled = Boolean(prediction);

  return (
    <div className={styles.buttons}>
      <button onClick={handleCheck} disabled={disabled}>Check</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleUndo} disabled={disabled}>Undo</button>
      <button onClick={handleRedo} disabled={disabled}>Redo</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default Buttons;