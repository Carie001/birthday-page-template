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

      while (!isEnd && index <= 50) { // 设置一个上限（比如50），防止死循环
        const url = `/images/photo${index}.jpg`;
        try {
          // 尝试去“敲一下”这张图片的门
          const response = await fetch(url);
          const contentType = response.headers.get("Content-Type");
          if (response.ok && contentType && contentType.includes("image")) {
            foundPhotos.push(url);
            index++;
          } else {
            isEnd = true; // 门打不开，说明照片到头了
          }
        } catch (e) {
          isEnd = true;
        }
      }
      setPhotos(foundPhotos);
    };

    autoLoadPhotos();
  }, []); // 仅在启动时运行一次

  return (
    <div className="container">
      {stage === 1 && (
        <div className="fade-in">
          <header className="hero">
            <h1 className="art-title">🎂 生日快乐，麻麻狗！！</h1>
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
              哈喽麻麻狗，不知不觉我们已经在一起这么久了，一千六百九十七天，其实在没来新加坡之前我就很期待我们每天在一起的日子。
              可以一起抱抱睡，坐坐，但是来了一个月之后我们突然开始频繁吵架了，那段时间搞得我都有点没信心了（主要是因为你找詹某聊天！！）
              我很多次幻想我和你提分手的样子，想着你到时候是怎样后悔，怎样求我，我都很平静的拒绝，该有多爽哈哈哈哈，咳咳
              但是后来情况就有好转啦，你看我们吵架的频率是不是明显降低了哦~
              <br/><br/>
              还有你经常说不喜欢我哭，我在尽量改了哦...不过只要没啥重大打击或者咱俩吵架也基本不会哭呀，我感觉这就是一个女生正常的样子吧...没错！是你太敏感了！
              要改哦，乖~
              <br/><br/>
              这次的礼物形式你没想到吧，我就说我的创意还是很好的，虽然没花什么钱钱，但是哈狗改代码改了好几个晚上哩，不对，是好几十个哦
              这个链接我也变成github的常驻地址了，以后不管多久你点开他都存在哦，照片墙那里我们还可以不断给里面加嘻嘻
              <br/><br/>
              好了，言归正传，礼物肯定不止一个网站啦，不过你要答对题目才能得到，去吧，麻麻狗！
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
            onFail={() => setStage(1)} // 答错就跳回第一页看照片
          />
        </div>
      )}

      {stage === 3 && (
        <div className="gift-section fade-in">
          <h2 className="gift-title">嘿嘿 终于对了哦 麻麻胖胖的</h2>
          <h3 className="gift-subtitle">🎁 拆礼物吧！</h3>

          <div className="gift-container">
            {/* 礼物 1 */}
            <GiftBox
              id="1"
              defaultEmoji="🎁"
              resultText="是彩票！！🎫"
            />

            {/* 礼物 2 */}
            <GiftBox
              id="2"
              defaultEmoji="📦"
              resultText="是桌宠！！🐱"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App