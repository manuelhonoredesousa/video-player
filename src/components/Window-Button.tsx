

interface WindowButtonProps {
  color: string;
  // title: string;
}

export function WindowButton({ color }: WindowButtonProps) {
  return (
    <div className={`w-3 h-3 rounded-full bg-${color}`}
      style={{background: color}}
    ></div>
  );
}
