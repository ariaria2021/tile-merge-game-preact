import { useEffect, useState } from 'preact/hooks';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { GameOverlay } from './components/GameOverlay';
import { move, finished } from './state/gameState';
import './app.css';

export function App() {
  // キーボード操作の登録
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (finished.value) return;

      switch (e.key) {
        case 'ArrowUp':
          move('UP');
          e.preventDefault();
          break;
        case 'ArrowDown':
          move('DOWN');
          e.preventDefault();
          break;
        case 'ArrowLeft':
          move('LEFT');
          e.preventDefault();
          break;
        case 'ArrowRight':
          move('RIGHT');
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // タッチ操作
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart || finished.value) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchEndX - touchStart.x;
    const diffY = touchEndY - touchStart.y;
    const threshold = 30;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > threshold) {
        move(diffX > 0 ? 'RIGHT' : 'LEFT');
      }
    } else {
      if (Math.abs(diffY) > threshold) {
        move(diffY > 0 ? 'DOWN' : 'UP');
      }
    }
    setTouchStart(null);
  };

  return (
    <div
      className="app-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Header />

      <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <Board />
        <GameOverlay />
      </div>

      <p style={{ textAlign: 'center', marginTop: '20px', color: '#776e65' }}>
        Use <strong>arrow keys</strong> or <strong>swipe</strong> to join the tiles!
      </p>
    </div>
  );
}
