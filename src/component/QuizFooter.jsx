import React from "react";
import { ToggleSound } from "./ToggleSound";

const rightSound =
  "https://storage.cloud.google.com/biki_bucket/Ok%20Success%20Notification%20Sound.mp3";
const wrongSound =
  "https://storage.cloud.google.com/biki_bucket/buzzer-or-wrong-answer-20582.mp3";

export const QuizFooter = React.forwardRef(
  ({ isEnabled, setIsEnabled, isPlaying, setIsPlaying, modalMessage }, ref) => {
    const currSrc = modalMessage === "success" ? rightSound : wrongSound;
    return (
      <div className="bg-white w-full h-[60px] absolute bottom-0 flex items-center p-2">
        <ToggleSound
          modalMessage={modalMessage}
          value={isEnabled}
          onChange={setIsEnabled}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          ref={ref}
          src={currSrc}
        />
      </div>
    );
  },
);
