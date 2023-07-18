import { Icon } from "./Icon";
import {
  IoVolumeMute,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
} from "react-icons/io5";

interface VolumeProps {
  volume: number;
}
export function Volume({ volume }: VolumeProps) {
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {volume == 0 && <Icon icon={IoVolumeMute} />}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {volume > 0 && volume <= 33 && <Icon icon={IoVolumeLow} />}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {volume > 33 && volume <= 66 && <Icon icon={IoVolumeMedium} />}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {volume > 66 && volume <= 100 && <Icon icon={IoVolumeHigh} />}
    </>
  );
}
