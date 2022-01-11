import React from 'react'

const Timer = ({formattedMinutes, formattedSeconds, isWorktime, isPlaying}) => {
  return (
    <>
      <h1 className="pomodoro__title">
        {isWorktime ? "Work time" : "Pause time"}
      </h1>
      <div className="pomodoro__timer">
        <span className={"pomodoro__timer__circle " + (isWorktime ? "-worktime" : "-pausetime") + " " + (isPlaying ? "-is-playing" : "-is-stopped")}></span>
        <span className="pomodoro__timer__countdown">
          {formattedMinutes}:{formattedSeconds}
        </span>
      </div>
    </>
  )
}

export default Timer;
