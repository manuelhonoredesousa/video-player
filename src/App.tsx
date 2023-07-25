/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  IoFolderOpen,
  IoPlay,
  IoPause,
  // IoStop,
  // IoPlaySkipForward,
  IoPlayForward,
  // IoPlaySkipBack,
  IoPlayBack,
  // IoRepeat,
  // IoList,
  // IoCog,
  // IoFileTray,
  // IoFilm,
  IoOpen,
  // IoSettings,
  IoExpand,
  // IoScan,
} from "react-icons/io5";
import videoPath from "./../../../../Users/Manuel/Videos/Rap do Deadpool - Tauz RapTributo 15.mp4";
// import videoPath from "./../../../../Users/Manuel/Desktop/ /Top Gun - Maverick 2022.mp4";
import { WindowButton } from "./components/Window-Button";
import { usePlayer, PlaybackSpeedOptionType } from "./hooks/usePlayer";
import { ChangeEvent, useRef, useState } from "react";
import { Icon } from "./components/Icon";
import { Volume } from "./components/Volume";

// type volumeIcon =
//   | "IoVolumeMute"
//   | "IoVolumeOff"
//   | "IoVolumeLow"
//   | "IoVolumeMedium"
//   | "IoVolumeHigh";

function App() {
  const $videoPlayer = useRef<HTMLVideoElement>(null);
  const {
    isPlaying,
    volume,
    currentVideoHour,
    currentVideoMinutes,
    currentVideoSeconds,
    currentPercentage,
    totalVideoHours,
    totalVideoMinutes,
    totalVideoSeconds,
    playbackSpeed,
    setVolume,
    setPlayingState,
    openFullScreen,
    openPictureInPicture,
    handleOnTimeVideoUpdate,
    handleOnChangeVideo,
    handleOnLoadVideo,
    setPlaybackSpeed,
  } = usePlayer($videoPlayer);

  const [mouseOverPlayer, setMouseOverPlayer] = useState<boolean>(false);
  // handleOnLoadVideo()
  // function handlePlaybackSpeedUp(){
  //   setSpeedUpVideo({})
  // }

  function handlePlaybackSpeed(opt: PlaybackSpeedOptionType) {
    if (isPlaying) setPlaybackSpeed({ options: opt });
  }

  function handlePlayAndPause() {
    if (playbackSpeed == 1) {
      setPlayingState();
    } else {
      setPlaybackSpeed({ reset: true });
    }
  }
  function handleOnMouseOverVideo(opt: "Over" | "Out") {
    if (opt == "Over") {
      setMouseOverPlayer(true);
    } else {
      setMouseOverPlayer(false);
    }
  }

  return (
    <main className="bg-wallpaper bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center text-gray-100 ">
      <div className="bg-[#fdf8f4] w-4/5 items-center rounded-lg relative"
        onMouseEnter={() => handleOnMouseOverVideo("Over")}
        onMouseLeave={() => handleOnMouseOverVideo("Out")}
      >
        {/* <div className="bg-[red] w-4/5 items-center rounded-lg"> */}

        <div className="flex gap-1 p-2">
          <WindowButton color="#ed6a5e" />
          <WindowButton color="#f4bf4f" />
          <WindowButton color="#61c554" />
        </div>

        <div className="absolute top-[10%] left-1/2 text-center text-3xl opacity-90 font-bold">
          {playbackSpeed != 1 && `${playbackSpeed} X`}
        </div>

        <video
          className="w-full aspect-video object-cover rounded-b-lg"
          src={videoPath}
          ref={$videoPlayer}
          onTimeUpdate={handleOnTimeVideoUpdate}
          onLoadedData={handleOnLoadVideo}
        

          // autoPlay
          // controls
        ></video>
        <div
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          className={`bg-opacity-10 backdrop-blur-lg bg-white absolute left-[12.5%] bottom-[5%] flex flex-col p-2 w-[75%] items-center rounded-lg ${!mouseOverPlayer && "hidden"}`}
        >
          <div className="w-full flex gap-2 items-center">
            <label htmlFor="">{`${currentVideoHour}:${currentVideoMinutes}:${currentVideoSeconds}`}</label>
            <input
              type="range"
              className="flex-1 range accent-[#cf6247] h-1 transition"
              min={0}
              max={100}
              value={currentPercentage}
              onChange={handleOnChangeVideo}
              // onTimeUpdate={()=>console.log(5555)}
            />
            <label htmlFor="">{`${totalVideoHours}:${totalVideoMinutes}:${totalVideoSeconds}`}</label>
          </div>

          <div className="w-full flex items-center justify-around gap-2">
            <div className="flex flex-1 items-center gap-2 ">
              <Volume volume={volume} />
              <input
                type="range"
                className=" accent-[#cf6247] h-1 w-20 transition"
                value={volume}
                onChange={setVolume}
              />
              {volume}
            </div>

            <div className="flex flex-1 justify-center gap-2 items-center ">
              <Icon
                icon={IoPlayBack}
                onClickFunction={() => handlePlaybackSpeed("slowDOWN")}
              />
              {playbackSpeed != 1 ? (
                <Icon
                  icon={IoPlay}
                  size={28}
                  onClickFunction={handlePlayAndPause}
                />
              ) : isPlaying ? (
                <Icon
                  icon={IoPause}
                  size={28}
                  onClickFunction={handlePlayAndPause}
                />
              ) : (
                <Icon
                  icon={IoPlay}
                  size={28}
                  onClickFunction={handlePlayAndPause}
                />
              )}
              <Icon
                icon={IoPlayForward}
                onClickFunction={() => handlePlaybackSpeed("speedUP")}
              />
            </div>

            <div className="flex flex-1 flex-row justify-end  gap-2">
              <label htmlFor="upload">
                <Icon icon={IoFolderOpen} />
              </label>
              <Icon icon={IoOpen} onClickFunction={openPictureInPicture} />
              <Icon icon={IoExpand} onClickFunction={openFullScreen} />
            </div>
          </div>
        </div>
      </div>
      <input
        hidden
        type="file"
        name="upload"
        id="upload"
        onLoadedData={() => console.log("Load")}
      />
    </main>
  );
}

export default App;
