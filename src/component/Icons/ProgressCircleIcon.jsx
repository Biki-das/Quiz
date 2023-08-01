import { Circle } from "react-feather";

export function ProgressCircleIcon({ ...delegated }) {
  const percentageFilled = 50;
  const radius = 16; // Adjust the radius as needed

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate the length of the dash that corresponds to the desired percentage
  const dashLength = (percentageFilled / 100) * circumference;

  // Calculate the gap length to fill the remaining part of the circle
  const gapLength = circumference - dashLength;

  return (
    <Circle
      stroke="#3BD6B0"
      strokeWidth="2"
      fill="none"
      size={30}
      r={radius}
      cx={radius}
      cy={radius}
      style={{
        strokeDasharray: `${dashLength} ${gapLength}`,
        strokeDashoffset: `0`,
      }}
      {...delegated}
    />
  );
}
