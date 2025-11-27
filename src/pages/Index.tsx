import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Popup {
  id: number;
  direction: 'top' | 'bottom' | 'left' | 'right';
  position: { x: number; y: number };
}

const Index = () => {
  const [showError, setShowError] = useState(false);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [popupIdCounter, setPopupIdCounter] = useState(0);

  useEffect(() => {
    if (showError) {
      const interval = setInterval(() => {
        const directions: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        
        let position = { x: 0, y: 0 };
        
        switch (randomDirection) {
          case 'top':
            position = { x: Math.random() * 70 + 15, y: 10 };
            break;
          case 'bottom':
            position = { x: Math.random() * 70 + 15, y: 70 };
            break;
          case 'left':
            position = { x: 10, y: Math.random() * 70 + 15 };
            break;
          case 'right':
            position = { x: 75, y: Math.random() * 70 + 15 };
            break;
        }

        setPopups(prev => [...prev, {
          id: popupIdCounter,
          direction: randomDirection,
          position
        }]);
        
        setPopupIdCounter(prev => prev + 1);
      }, 800);

      return () => clearInterval(interval);
    }
  }, [showError, popupIdCounter]);

  const handleButtonClick = () => {
    setShowError(true);
  };

  const handlePopupClick = () => {
    window.open('https://www.rustore.ru/catalog/app/ru.oneme.app', '_blank');
  };

  if (showError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <div className="text-center animate-shake z-10">
          <h1 className="text-[120px] md:text-[200px] font-bold text-destructive leading-none mb-4">
            404
          </h1>
          <p className="text-2xl md:text-4xl font-medium text-muted-foreground">
            Ошибка
          </p>
        </div>

        {popups.map((popup) => (
          <div
            key={popup.id}
            onClick={handlePopupClick}
            className={`fixed bg-card border-2 border-primary rounded-xl p-6 shadow-2xl cursor-pointer 
              hover:scale-105 transition-transform z-20 animate-slide-in-${popup.direction}`}
            style={{
              left: `${popup.position.x}%`,
              top: `${popup.position.y}%`,
            }}
          >
            <div className="flex flex-col items-center gap-3 min-w-[200px]">
              <img 
                src="https://avatars.mds.yandex.net/i?id=ce01bae986bdaf75eccbd7167edd843a_l-5482194-images-thumbs&n=33&w=1093&h=1080" 
                alt="Макс"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <p className="text-lg font-semibold text-primary">
                Скачайте Макс
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Нажми, чтобы отправить запрос
        </h1>
        <Button 
          onClick={handleButtonClick}
          size="lg"
          className="text-xl px-12 py-8 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          Отправить запрос
        </Button>
      </div>
    </div>
  );
};

export default Index;
