import { Circle } from "react-feather";

export function DefaultCircleIcon({ ...delegated }) {
  return (
    <Circle
      stroke="#D0D5DD"
      strokeWidth="2"
      fill="none"
      size={30}
      {...delegated}
    />
  );
}
