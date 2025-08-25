import FeedbackPanel from '@/components/FeedbackPanel/FeedbackPanel';
import { useHumanChecker } from '@/contexts/HumanCheckerContext';
import styles from '@/HumanChecker/HumanChecker.module.css';
import Buttons from '@/components/Buttons/Buttons';
import Prompt from '@/components/Prompt/Prompt';
import Canvas from '@/components/Canvas/Canvas';

export default function HumanChecker() {
  const {
    currentShape,
    canvasRef,
    startDrawing,
    handleCheck,
    handleNext,
    handleUndo,
    handleRedo,
    handleClear,
    prediction,
    feedback
  } = useHumanChecker();

  return (
    <div className={styles.container}>
      <span className={styles.title}>Try a Square, Circle, or Triangle — see if I can predict it correctly.</span>
      <Prompt currentShape={currentShape} />
      <Canvas canvasRef={canvasRef} startDrawing={startDrawing} />
      <Buttons
        handleCheck={handleCheck}
        handleNext={handleNext}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleClear={handleClear}
        prediction={prediction}
      />
      {prediction && 
        <FeedbackPanel 
          prediction={prediction} 
          feedback={feedback} 
          currentShape={currentShape} 
        />
      }
    </div>
  );
}