import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

export default function ReactionGame() {
  const [page, setPage] = useState('leaderboard'); 
  const [gameState, setGameState] = useState('idle'); 
  const [scores, setScores] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [tooEarly, setTooEarly] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const timeoutRef = useRef(null);

  const TOTAL_ROUNDS = 3; 
  const TOP_N = 10;

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useLayoutEffect(() => {
    if (gameState === 'ready') {
      requestAnimationFrame((frameTimestamp) => {
        setStartTime(frameTimestamp);
      });
    }
  }, [gameState]);

  const loadLeaderboard = () => {
    try {
      const entries = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('reaction:')) {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              entries.push(JSON.parse(data));
            } catch (parseError) {
              console.warn('Skipping corrupted entry:', key);
            }
          }
        }
      }
      entries.sort((a, b) => a.avgTime - b.avgTime);
      setLeaderboard(entries.slice(0, 20));
    } catch (error) {
      console.log('Loading leaderboard error:', error);
      setLeaderboard([]);
    }
  };

  const startGame = () => {
    setScores([]);
    setCurrentRound(0);
    setGameState('idle');
    setPage('game');
    startRound();
  };

  const startRound = () => {
    setTooEarly(false);
    setReactionTime(null);
    setStartTime(null);
    setGameState('waiting');
    
    const delay = Math.random() * 3000 + 1500; 
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
    }, delay);
  };

  const handleAction = (e) => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setTooEarly(true);
      setGameState('idle');
      setTimeout(() => {
        if (currentRound < TOTAL_ROUNDS) startRound();
      }, 1500);
    } else if (gameState === 'ready') {
      const endTime = e?.timeStamp || performance.now();
      const validStartTime = startTime || endTime - 1; 
      
      const time = Number(Math.max(1, endTime - validStartTime).toFixed(2)); 
      
      setReactionTime(time);
      setGameState('clicked');
      
      const newScores = [...scores, time];
      setScores(newScores);
      
      setTimeout(() => {
        const nextRound = currentRound + 1;
        setCurrentRound(nextRound);
        
        if (nextRound < TOTAL_ROUNDS) {
          startRound();
        } else {
          setGameState('results');
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setScores([]);
    setCurrentRound(0);
    setGameState('idle');
    setReactionTime(null);
    setTooEarly(false);
    setPage('leaderboard');
  };

  return (
    <>
      {page === 'leaderboard' && (
        <Leaderboard 
          leaderboard={leaderboard} 
          onStart={startGame} 
          topN={TOP_N} 
        />
      )}
      {page === 'game' && gameState !== 'results' && (
        <GameBoard 
          gameState={gameState}
          tooEarly={tooEarly}
          reactionTime={reactionTime}
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          scores={scores}
          onAction={handleAction}
        />
      )}
      {page === 'game' && gameState === 'results' && (
        <ResultScreen 
          scores={scores}
          leaderboard={leaderboard}
          topN={TOP_N}
          onSave={loadLeaderboard}
          onReset={resetGame}
        />
      )}
    </>
  );
}

function Leaderboard({ leaderboard, onStart, topN }) {
  useEffect(() => {
    const handleKeyPress = () => onStart();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStart]);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3, topN);

  const podium = [];
  if (top3[1]) podium.push({ ...top3[1], rank: 2 });
  if (top3[0]) podium.push({ ...top3[0], rank: 1 });
  if (top3[2]) podium.push({ ...top3[2], rank: 3 });

  const getPodiumStyle = (rank) => {
    if (rank === 1) return { bg: '#FFF9E6', border: '#FFD700', text: '#B8860B', height: '180px', flex: 1.2 }; 
    if (rank === 2) return { bg: '#F5F5F5', border: '#C0C0C0', text: '#696969', height: '140px', flex: 1 };   
    return { bg: '#FFF0E6', border: '#CD7F32', text: '#8B4513', height: '120px', flex: 1 };                   
  };

  return (
    <div 
      onPointerDown={onStart}
      style={{ 
        minHeight: '100vh', 
        width: '100%', 
        background: '#ffffff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px', 
        boxSizing: 'border-box', 
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '300', margin: '0 0 10px 0', letterSpacing: '-1px', color: '#000000' }}>REACTION</h1>
          <p style={{ fontSize: '12px', color: '#999999', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Press any key or tap to start</p>
        </div>

        <div>
          {leaderboard.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#cccccc' }}>No records yet</div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '12px', marginBottom: '20px', minHeight: '200px' }}>
                {podium.map((entry) => {
                  const style = getPodiumStyle(entry.rank);
                  return (
                    <div key={entry.rank} style={{ flex: style.flex, height: style.height, background: style.bg, borderTop: `6px solid ${style.border}`, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', borderRadius: '4px 4px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: style.text, marginBottom: '8px' }}>
                        {entry.rank}{entry.rank === 1 ? 'ST' : entry.rank === 2 ? 'ND' : 'RD'}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#000000', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                        {entry.name}
                      </div>
                      <div style={{ fontSize: entry.rank === 1 ? '28px' : '22px', fontWeight: '300', color: '#000000', marginTop: 'auto', fontVariantNumeric: 'tabular-nums' }}>
                        {Number(entry.avgTime).toFixed(2)}<span style={{ fontSize: '12px', color: '#999999', marginLeft: '2px' }}>ms</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {rest.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {rest.map((entry, index) => (
                    <div key={index} style={{ background: '#fafafa', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '4px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '500', color: '#aaaaaa', minWidth: '24px', textAlign: 'right' }}>{index + 4}</div>
                      <div style={{ flex: 1, fontSize: '15px', color: '#333333' }}>{entry.name}</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#000000', fontVariantNumeric: 'tabular-nums' }}>
                        {Number(entry.avgTime).toFixed(2)}<span style={{ fontSize: '11px', color: '#999999', marginLeft: '4px' }}>ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function GameBoard({ gameState, tooEarly, reactionTime, currentRound, totalRounds, scores, onAction }) {
  const actionRef = useRef(onAction);
  useEffect(() => { actionRef.current = onAction; }, [onAction]);

  useEffect(() => {
    const handleKey = (e) => {
      e.preventDefault(); 
      actionRef.current(e); 
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const getStateColor = () => {
    if (gameState === 'waiting') return '#ce2636'; 
    if (gameState === 'ready') return '#4bdb6a'; 
    if (gameState === 'clicked' && !tooEarly) return '#ffffff'; 
    if (tooEarly) return '#000000'; 
    return '#2b87d1'; 
  };

  const getTextColor = () => {
    if (gameState === 'ready' || (gameState === 'clicked' && !tooEarly)) return '#000000'; 
    return '#ffffff'; 
  };

  const getStateText = () => {
    if (tooEarly) return 'TOO EARLY';
    if (gameState === 'waiting') return 'WAIT FOR GREEN';
    if (gameState === 'ready') return 'CLICK!';
    if (gameState === 'clicked') return `${reactionTime.toFixed(2)}`;
    return 'READY';
  };

  const avgTime = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : null;

  return (
    <div 
      onPointerDown={(e) => actionRef.current(e)} 
      style={{ 
        minHeight: '100vh', 
        width: '100%', 
        background: '#ffffff', 
        display: 'flex', 
        flexDirection: 'column', 
        fontFamily: '-apple-system, sans-serif', 
        touchAction: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div style={{ position: 'fixed', top: '40px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', color: '#999999', letterSpacing: '1px', zIndex: 10 }}>
        {currentRound + 1} / {totalRounds}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: getStateColor(), padding: '40px', cursor: 'pointer' }}>
        <div style={{ fontSize: tooEarly ? '48px' : '96px', fontWeight: '300', color: getTextColor(), textAlign: 'center', letterSpacing: '-2px', fontVariantNumeric: 'tabular-nums' }}>
          {getStateText()}
        </div>
        {gameState === 'idle' && <div style={{ fontSize: '14px', color: '#ffffff', marginTop: '20px', opacity: 0.8, textTransform: 'uppercase' }}>Tap or Press Any Key</div>}
      </div>

      {scores.length > 0 && (
        <div style={{ width: '100%', padding: '20px 40px', background: '#fafafa', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid #f0f0f0' }}>
          {scores.map((score, i) => <div key={i} style={{ fontSize: '14px', color: '#666666', fontVariantNumeric: 'tabular-nums' }}>{score.toFixed(2)}</div>)}
          {avgTime && <div style={{ fontSize: '14px', color: '#000000', fontWeight: '500', paddingLeft: '20px', borderLeft: '1px solid #dddddd' }}>AVG {avgTime}</div>}
        </div>
      )}
    </div>
  );
}

function ResultScreen({ scores, leaderboard, topN, onSave, onReset }) {
  const [playerName, setPlayerName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const avgTimeNum = Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
  const canSave = leaderboard.length < topN || avgTimeNum < leaderboard[topN - 1]?.avgTime;

  const handleSaveScore = () => {
    if (!playerName.trim()) return;
    const timestamp = Date.now();
    const entry = { name: playerName.trim(), avgTime: avgTimeNum, scores, timestamp, date: new Date().toLocaleDateString('en-US') };
    
    try {
      localStorage.setItem(`reaction:${timestamp}`, JSON.stringify(entry));
      onSave(); 
      onReset(); 
    } catch (error) {
      alert('Failed to save score.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', boxSizing: 'border-box', fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        
        <div style={{ fontSize: 'clamp(64px, 15vw, 120px)', fontWeight: '200', color: '#000000', marginBottom: '40px', letterSpacing: '-3px', fontVariantNumeric: 'tabular-nums' }}>
          {avgTimeNum.toFixed(2)}<span style={{ fontSize: 'clamp(20px, 5vw, 36px)', color: '#999999', marginLeft: '8px' }}>ms</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
          {scores.map((score, i) => <div key={i} style={{ fontSize: '16px', color: '#666666', padding: '8px 16px', background: '#fafafa', borderRadius: '4px' }}>{score.toFixed(2)}</div>)}
        </div>

        {canSave ? (
          !showInput ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', color: '#666666' }}>You made it to top {topN}!</p>
              <button onClick={() => setShowInput(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', padding: '16px 48px', fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px' }}>Save Score</button>
              <button onClick={onReset} style={{ background: 'transparent', color: '#999999', border: 'none', padding: '16px 48px', fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>Skip</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px', margin: '0 auto' }}>
              <input type="text" placeholder="Your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSaveScore()} style={{ padding: '16px 20px', border: '1px solid #dddddd', fontSize: '16px', textAlign: 'center', color: '#000000', background: '#ffffff', borderRadius: '4px' }} autoFocus />
              <button onClick={handleSaveScore} disabled={!playerName.trim()} style={{ background: playerName.trim() ? '#000000' : '#eeeeee', color: '#ffffff', border: 'none', padding: '16px', cursor: playerName.trim() ? 'pointer' : 'not-allowed', textTransform: 'uppercase', borderRadius: '4px' }}>Confirm</button>
            </div>
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: '#999999' }}>Practice more to enter top {topN}</p>
            <button onClick={onReset} style={{ background: '#000000', color: '#ffffff', border: 'none', padding: '16px 48px', fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px' }}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}