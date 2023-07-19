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
import usePlayer from "./hooks/usePlayer";
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
    setVolume,
    setPlayingState,
    openFullScreen,
    openPictureInPicture,
    handleOnTimeVideoUpdate,
    handleOnChangeVideo,
    handleOnLoadVideo
    
  } = usePlayer($videoPlayer);

  // handleOnLoadVideo()

  return (
    <main className="bg-wallpaper bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center text-gray-100 relative">
      <div className="bg-[#fdf8f4] w-4/5 items-center rounded-lg ">
        {/* <div className="bg-[red] w-4/5 items-center rounded-lg"> */}

        <div className="flex gap-1 p-2">
          <WindowButton color="#ed6a5e" />
          <WindowButton color="#f4bf4f" />
          <WindowButton color="#61c554" />
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

        <div className="bg-opacity-10 backdrop-blur-lg bg-white absolute left-[12.5%] top-[70%] h-[10%] flex flex-col p-4 w-[75%] items-center rounded-lg">
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

          <div className="flex  w-full items-center justify-around gap-2  ">
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
              <Icon icon={IoPlayBack} />

              {isPlaying ? (
                <Icon
                  icon={IoPause}
                  size={35}
                  onClickFunction={setPlayingState}
                />
              ) : (
                <Icon
                  icon={IoPlay}
                  size={35}
                  onClickFunction={setPlayingState}
                />
              )}

              <Icon icon={IoPlayForward} />
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
      <input hidden type="file" name="upload" id="upload" />
    </main>
  );
}

export default App;
