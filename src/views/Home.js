import React from "react";
import { useState, useEffect } from "react";
import Button from "components/Button";
import Modal from "utils/Modal";
import TimerSettings from "components/TimerSettings";
import {
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  CogIcon,
  ChevronDoubleRightIcon
} from "@heroicons/react/outline";

const Home = () => {
  const [selectedWorktimeMinutes, setSelectedWorktimeMinutes] = useState(25);
  const [selectedWorktimeSeconds, setSelectedWorktimeSeconds] = useState(0);
  const [selectedPausetimeMinutes, setSelectedPausetimeMinutes] = useState(5);
  const [selectedPausetimeSeconds, setSelectedPausetimeSeconds] = useState(0);
  const [minutes, setMinutes] = useState(selectedWorktimeMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isWorktime, setIsWorktime] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeWorktime = (time) => {
    console.log(time);
    setSelectedWorktimeMinutes(time.minutes);
    setSelectedWorktimeSeconds(time.seconds);
  };

  const handleChangePausetime = (time) => {
    console.log(time);
    setSelectedPausetimeMinutes(time.minutes);
    setSelectedPausetimeSeconds(time.seconds);
  };

  const setWorkSession = () => {
    setIsPlaying(true);
    setIsWorktime(true);
    setMinutes(selectedWorktimeMinutes);
    setSeconds(selectedWorktimeSeconds);
  };

  const setPauseSession = () => {
    setIsPlaying(true);
    setIsWorktime(false);
    setMinutes(selectedPausetimeMinutes);
    setSeconds(selectedPausetimeSeconds);
  };

  const resetTimer = () => {
    setWorkSession();
  };

  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (seconds !== 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes !== 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            if (isWorktime) {
              setPauseSession();
            } else {
              setWorkSession();
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [minutes, seconds, isPlaying]);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <main className="home">
      <section className="pomodoro">
        <h1 className="pomodoro__title">
          {isWorktime ? "Work time" : "Pause time"}
        </h1>
        <div className="pomodoro__timer">
          <span className={"pomodoro__timer__circle " + (isWorktime ? "-worktime" : "-pausetime") + " " + (isPlaying ? "-is-playing" : "-is-stopped")}></span>
          <span className="pomodoro__timer__countdown">
            {formattedMinutes}:{formattedSeconds}
          </span>
        </div>
        <div className="pomodoro__options">
          <Button title={isPlaying ? "Play" : "Pause"} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button title="Reset">
            <RefreshIcon onClick={() => resetTimer()} />
          </Button>
          <Button title="Skip session" onClick={() => isWorktime ? setPauseSession() : setWorkSession()}>
            <ChevronDoubleRightIcon />
          </Button>
          <Button title="Settings" onClick={() => setIsModalOpen(!isModalOpen)}>
            <CogIcon />
          </Button>
        </div>
      </section>
      <Modal
        onCloseModal={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        timeout={200}
      >
        <TimerSettings
          onWorktimeChange={(time) => handleChangeWorktime(time)}
          onPausetimeChange={(time) => handleChangePausetime(time)}
          defaultWorktimeMinutes={selectedWorktimeMinutes}
          defaultWorktimeSeconds={selectedWorktimeSeconds}
          defaultPausetimeMinutes={selectedPausetimeMinutes}
          defaultPausetimeSeconds={selectedPausetimeSeconds}
        />
      </Modal>
    </main>
  );
};

export default Home;
