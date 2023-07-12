import { useState } from "react";

export default function usePlayer() {
  const [{ isPlaying }, setPlayerProprieties] = useState({
    isPlaying: false,
  });

  function changeIsPlayingState() {
    setPlayerProprieties((prev) => {
      return {
        ...prev,
        isPlaying: !prev.isPlaying,
      };
    });
  }

  return {
    isPlaying,
    changeIsPlayingState,
  };
}