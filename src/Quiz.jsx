import { useState, useEffect } from 'react';
import { questionBank } from './questions';

function Quiz({ onComplete, onFail }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [userInput, setUserInput] = useState("");

  // 初始化：从 30 题里随机选 10 题
  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const shuffled = [...questionBank]
      .sort(() => Math.random() - 0.5) // 随机打乱
      .slice(0, 10); // 取前 10 个
    setRandomQuestions(shuffled);
    setCurrentIdx(0);
    setUserInput("");
  };

  const handleAnswer = (selected) => {
    const currentQ = randomQuestions[currentIdx];

    if (selected.trim() === currentQ.a.trim()) {
      if (currentIdx + 1 < randomQuestions.length) {
        setCurrentIdx(currentIdx + 1);
        setUserInput(""); // 进下一题前清空输入框
      } else {
        onComplete();
      }
    } else {
      alert("⚠️ 答案不对！回第一题重来吧嘿嘿~");
      generateQuestions();
      onFail();
    }
  };

  if (randomQuestions.length === 0) return <div>题目加载中...</div>;

  const currentQ = randomQuestions[currentIdx];

  return (
    <div className="quiz-card">
      <div className="progress">第 {currentIdx + 1} / 10 题</div>
      <h3>{currentQ.q}</h3>

      {currentQ.type === 'choice' ? (
        <div className="options-grid">
          {currentQ.options.map((opt, i) => (
            <button key={i} className="opt-btn" onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      ): (
        /* 如果是填空题 */
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="在这里输入答案..."
            className="answer-input"
          />
          <button className="submit-btn" onClick={() => handleAnswer(userInput)}>
            提交答案
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;