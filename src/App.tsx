import {
  IoFolderOpen,
  IoPlay,
  IoPause,
  IoStop,
  IoPlaySkipForward,
  IoPlayForward,
  IoPlaySkipBack,
  IoPlayBack,
  IoRepeat,
  IoList,
  IoCog,
  IoVolumeMute,
  IoVolumeOff,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
} from "react-icons/io5";
import videoPath from "./../../../../Users/Manuel/Videos/Rap do Deadpool - Tauz RapTributo 15.mp4";
import { WindowButton } from "./components/Window-Button";
import usePlayer from "./hooks/usePlayer";

function App() {
  const { isPlaying, changeIsPlayingState } = usePlayer();
  return (
    // <main className="bg-slate-500 h-screen flex items-center justify-center text-gray-100 relative">
    <main className="bg-wallpaper bg-center h-screen flex items-center justify-center text-gray-100 relative">
      {/* <div className="bg-slate-900 w-4/5 items-center rounded-lg"> */}

      <div className="bg-[#fdf8f4] w-4/5 items-center rounded-lg">
        {/* <div className="bg-[red] w-4/5 items-center rounded-lg"> */}

        <div className="flex gap-1 p-2">
          <WindowButton color="#ed6a5e" />
          <WindowButton color="#f4bf4f" />
          <WindowButton color="#61c554" />
        </div>

        <video
          className="w-full aspect-video object-cover rounded-b-lg"
          src={videoPath}
          autoPlay
          controls
        ></video>

        <div className="bg-opacity-10 backdrop-blur-lg bg-white absolute left-[12.5%] top-[70%] h-[10%] flex p-4 w-[75%] items-center rounded-lg">
          <div>
            <label onClick={() => console.log("Open File")} htmlFor="upload">
              <IoFolderOpen size={25} className="" />{" "}
            </label>
            <input hidden type="file" name="upload" id="upload" />
          </div>
          <IoPlayBack size={25} />
          <div onClick={changeIsPlayingState}>
            {isPlaying ? <IoPause size={25} /> : <IoPlay size={25} />}
          </div>
          <IoPlayForward size={25} />

          <div onClick={() => console.log("Stop")}>
            <IoStop size={25} />
          </div>
          <IoPlaySkipBack size={25} />

          <IoPlaySkipForward size={25} />

          <input type="range" width={300} />

          <IoCog size={25} />
          <IoVolumeMute size={25} />
          <IoVolumeOff size={25} />
          <IoVolumeLow size={25} />
          <IoVolumeMedium size={25} />
          <IoVolumeHigh size={25} />

          <IoRepeat size={25} />
          <IoList size={25} />
        </div>
      </div>
    </main>
  );
}

export default App;
