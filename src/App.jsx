import { useState, useEffect } from 'react';
import Quiz from './Quiz';
import './App.css';

function GiftBox({ defaultEmoji, resultText }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`gift-box-item ${isOpen ? 'opened' : ''}`}
      onClick={() => setIsOpen(true)}
    >
      <div className="gift-icon">
        {isOpen ? "✨" : defaultEmoji}
      </div>
      <div className="gift-content">
        {isOpen ? resultText : "点击拆开"}
      </div>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState(1);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const autoLoadPhotos = async () => {
      let foundPhotos = [];
      let index = 1;
      let isEnd = false;

      while (!isEnd && index <= 50) {
        const url = `/images/photo${index}.jpg`;
        try {
          // 尝试去“敲一下”这张图片的门
          const response = await fetch(url);
          const contentType = response.headers.get("Content-Type");
          if (response.ok && contentType && contentType.includes("image")) {
            foundPhotos.push(url);
            index++;
          } else {
            isEnd = true;
          }
        } catch (e) {
          isEnd = true;
        }
      }
      setPhotos(foundPhotos);
    };

    autoLoadPhotos();
  }, []);

  return (
    <div className="container">
      {stage === 1 && (
        <div className="fade-in">
          <header className="hero">
            <h1 className="art-title">🎂 生日快乐，xx！！</h1>
            <p className="art-subtitle">你还能想起来每张照片背后的故事吗~</p>
          </header>

          <div className="photo-grid">
            {photos.map((src, index) => (
              <div key={index} className="photo-card">
                <img src={src} alt={`Moment ${index + 1}`} />
              </div>
            ))}
          </div>

          <section className="blessing">
            <h2>今年想对你说的话</h2>
            <p className="letter">
              祝你生日快乐
              <br/><br/>
              祝你生日快乐
              <br/><br/>
              祝你生日快乐
              <br/><br/>
              祝你生日快乐
            </p>
            <button className="next-btn" onClick={() => setStage(2)}>
              点击进入：默契大挑战 ➔
            </button>
          </section>
        </div>
      )}

      {/* 阶段 2：答题闯关 */}
      {stage === 2 && (
        <div className="quiz-section">
          <Quiz
            onComplete={() => setStage(3)}
            onFail={() => setStage(1)}
          />
        </div>
      )}

      {stage === 3 && (
        <div className="gift-section fade-in">
          <h2 className="gift-title">嘿嘿 终于对了哦 棒棒的</h2>
          <h3 className="gift-subtitle">🎁 拆礼物吧！</h3>

          <div className="gift-container">
            {/* 礼物 1 */}
            <GiftBox
              id="1"
              defaultEmoji="🎁"
              resultText="是蛋糕！！🎂"
            />

            {/* 礼物 2 */}
            <GiftBox
              id="2"
              defaultEmoji="📦"
              resultText="是手表！！⌚"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App