import styles from '@/components/Canvas/Canvas.module.css';

const Canvas = ({ canvasRef, startDrawing }) => {
  return (
    <canvas
      data-testid="canvas"
      ref={canvasRef}
      width={300}
      height={300}
      className={styles.canvas}
      onMouseDown={startDrawing}
      onTouchStart={startDrawing}
    />
  );
}

export default Canvas;