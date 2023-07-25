import { ElementType, ReactNode } from "react";

interface IconsProps {
  icon: ElementType;
  size?:number;
  onClickFunction?: ()=>void;
}
export function Icon({ icon:Icon, size, onClickFunction }: IconsProps) {
//   return <Icon size={25} className="hover:text-[#b53c29] transition" />;
  return <div onClick={onClickFunction}><Icon size={size ? size : 18} className="hover:text-[#de9a45] transition"  /></div>
}
