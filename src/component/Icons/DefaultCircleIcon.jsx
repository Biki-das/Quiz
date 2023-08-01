import { Circle } from "react-feather";

export function DefaultCircleIcon({ ...delegatd }) {
  return (
    <Circle
      stroke="#D0D5DD"
      strokeWidth="2"
      fill="none"
      size={30}
      {...delegatd}
    />
  );
}
