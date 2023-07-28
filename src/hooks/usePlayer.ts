import { ChangeEvent, useEffect, useState } from "react";

export type PlaybackSpeedOptionType = "speedUP" | "slowDOWN";
interface PlaybackSpeedProps {
  options?: PlaybackSpeedOptionType;
  reset?: boolean;
}

export function usePlayer($videoPlayer: React.RefObject<HTMLVideoElement>) {
  const thereIsNotVolumeAtLocalStorage = !localStorage.getItem("volume");
  if (thereIsNotVolumeAtLocalStorage) {
    localStorage.setItem("volume", "25");
  }
  const volumeAtLocalStorage = Number(localStorage.getItem("volume"));

  const [
    {
      isPlaying,
      volume,
      currentPercentage,
      playbackSpeed,
      currentVideoHour,
      currentVideoMinutes,
      currentVideoSeconds,
      totalVideoHours,
      totalVideoMinutes,
      totalVideoSeconds,
    },
    setPlayerProprieties,
  ] = useState({
    isPlaying: false,
    volume: volumeAtLocalStorage,
    playbackSpeed: 1,
    currentTime: 0,
    currentPercentage: 0,
    currentVideoHour: "00",
    currentVideoMinutes: "00",
    currentVideoSeconds: "00",
    totalVideoHours: "00",
    totalVideoMinutes: "00",
    totalVideoSeconds: "00",
  });

  useEffect(() => {
    isPlaying ? $videoPlayer.current?.play() : $videoPlayer.current?.pause();

    const volumeValue = volume / 100;
    $videoPlayer.current!.volume = volumeValue;

    $videoPlayer.current!.playbackRate = playbackSpeed;
  }, [$videoPlayer, isPlaying, volume, playbackSpeed]);

  // useEffect(() => {
  // setTotalVideoTimeLabel()
  // }, [$videoPlayer.current?.duration]);

  function openFullScreen() {
    void $videoPlayer.current?.requestFullscreen();
  }
  function openPictureInPicture() {
    void $videoPlayer.current?.requestPictureInPicture();
  }
  // const handleTimeUpdate = () => {
  // setCurrentTime(videoRef.current.currentTime);
  // };

  // function currentVideoTime() {
  //   const totalSeconds = Math.floor($videoPlayer.current!.currentTime);
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;

  //   return {
  //     minutes,
  //     seconds,
  //     //// seconds,
  //   };
  // }

  function setPlayingState(status: boolean) {
    // const newPlayState = status ? status : !isPlaying;

    // console.log(newPlayState);
    
    setPlayerProprieties((prev) => {
      return {
        ...prev,
        isPlaying: status,
      };
    });
  }
  function setVolume(value: ChangeEvent<HTMLInputElement>) {
    const volumeValue = Number(value.target.value);
    setPlayerProprieties((prev) => {
      return {
        ...prev,
        volume: volumeValue,
      };
    });

    localStorage.setItem("volume", String(volumeValue));
  }
  function setPercentage(newPercentage: number) {
    setPlayerProprieties((prev) => {
      return {
        ...prev,
        currentPercentage: newPercentage,
      };
    });
  }
  function setCurrentTimeLabel({
    hours,
    minutes,
    seconds,
  }: {
    hours: string;
    minutes: string;
    seconds: string;
  }) {
    setPlayerProprieties((prev) => {
      return {
        ...prev,
        currentVideoHour: hours,
        currentVideoMinutes: minutes,
        currentVideoSeconds: seconds,
      };
    });
  }
  function handleOnLoadVideo() {
    setTotalVideoTimeLabel();
    setCurrentTimeLabel({ hours: "00", minutes: "00", seconds: "00" });
    setPercentage(0);
  }
  function setTotalVideoTimeLabel() {
    const { duration } = getCurrentVideoPropreties();
    const { hours, minutes, seconds } = getVideoTimeByPercentageAndDuration({
      duration,
      percentage: 100,
    });

    setPlayerProprieties((prev) => {
      return {
        ...prev,
        totalVideoHours: hours,
        totalVideoMinutes: minutes,
        totalVideoSeconds: seconds,
      };
    });
  }

  function setPlaybackSpeed({ options, reset }: PlaybackSpeedProps) {
    let newPlaybackSpeed: number;
    const DefaultPlaybackSpeedValue = 0.25;

    if (reset) {
      newPlaybackSpeed = 1;
    } else {
      if (options === "speedUP") {
        const newPlaybackSpeedLimite = 2;

        if (playbackSpeed < newPlaybackSpeedLimite) {
          newPlaybackSpeed = playbackSpeed + DefaultPlaybackSpeedValue;
        }
      } else {
        const newPlaybackSpeedLimite = 0.25;

        if (playbackSpeed > newPlaybackSpeedLimite) {
          newPlaybackSpeed = playbackSpeed - DefaultPlaybackSpeedValue;
        }
      }
    }

    setPlayerProprieties((prev) => {
      return {
        ...prev,
        playbackSpeed: newPlaybackSpeed,
      };
    });
  }

  function handleOnTimeVideoUpdate() {
    const { percentage, duration } = getCurrentVideoPropreties();

    const { hours, minutes, seconds } = getVideoTimeByPercentageAndDuration({
      duration,
      percentage,
    });

    setPercentage(percentage);
    setCurrentTimeLabel({ hours, minutes, seconds });
  }

  // const timeoutRef = useRef(null);
  // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  // const [timeoutId, setTimeoutId] = useState<number>(0);

  function beatifyCurrentTime(timeValue: number): string {
    return timeValue < 10 ? `0${timeValue}` : String(timeValue);
  }

  function getVideoTimeByPercentageAndDuration({
    percentage,
    duration,
  }: {
    percentage: number;
    duration: number;
  }) {
    const totalSeconds = Math.floor((duration / 100) * percentage);

    const hours = beatifyCurrentTime(Math.floor(totalSeconds / 60 / 60));
    const minutes = beatifyCurrentTime(Math.floor((totalSeconds % 3600) / 60));
    const seconds = beatifyCurrentTime(totalSeconds % 60);

    return {
      hours,
      minutes,
      seconds,
      totalSeconds,
    };
  }

  function getCurrentVideoPropreties() {
    const videoCurrentTime = $videoPlayer.current!.currentTime;
    const videoDuration = $videoPlayer.current!.duration;
    const newCurrentPercentage = (videoCurrentTime / videoDuration) * 100;

    return {
      time: videoCurrentTime,
      duration: videoDuration,
      percentage: newCurrentPercentage,
      // hours,
      // minutes,
      // seconds,
    };
  }

  function handleOnChangeVideo(event: ChangeEvent<HTMLInputElement>) {
    const { duration } = getCurrentVideoPropreties();
    const newCurrentPercentage = Number(event.target.value);
    const newCurrentTime = (duration / 100) * newCurrentPercentage;
    const { hours, minutes, seconds } = getVideoTimeByPercentageAndDuration({
      duration,
      percentage: newCurrentPercentage,
    });

    //  clearTimeout(timeoutId);

    $videoPlayer.current!.currentTime = newCurrentTime;
    setCurrentTimeLabel({ hours, minutes, seconds });
    setPercentage(newCurrentPercentage);
    // setTimeout(() => {
    // console.log("xxxx");
    // }, 200);

    // clearTimeout(newTimeoutId)
    // setTimeoutId(newTimeoutId);
  }

  // $videoPlayer.current!.currentTime = newVideoCurrentTime;

  // setPercentage(newCurrentPercentage);
  // }

  return {
    isPlaying,
    volume,
    currentPercentage,
    currentVideoHour,
    currentVideoMinutes,
    currentVideoSeconds,
    totalVideoHours,
    totalVideoMinutes,
    totalVideoSeconds,
    playbackSpeed,
    setPlayingState,
    openFullScreen,
    openPictureInPicture,
    setVolume,
    handleOnTimeVideoUpdate,
    handleOnChangeVideo,
    handleOnLoadVideo,
    setPlaybackSpeed,
  };
}
