import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(phrases, typeSpeed = 120, deleteSpeed = 60, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const schedule = (fn, delay) => { timeout.current = setTimeout(fn, delay); };

    if (!deleting && charIdx < current.length) {
      schedule(() => setCharIdx(i => i + 1), typeSpeed);
    } else if (!deleting && charIdx === current.length) {
      schedule(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      schedule(() => setCharIdx(i => i - 1), deleteSpeed);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout.current);
  }, [charIdx, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs]);

  useEffect(() => {
    setDisplayed(phrases[phraseIdx].slice(0, charIdx));
  }, [charIdx, phraseIdx, phrases]);

  return displayed;
}
