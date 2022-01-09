import React from "react";
import { useState, useRef } from "react";

const TimerSettings = (props) => {
  const [showWorkSettings, setShowWorkSettings] = useState(true);
  const [worktimeMinutes, setWorktimeMinutes] = useState(props.defaultWorktimeMinutes);
  const [worktimeSeconds, setWorktimeSeconds] = useState(props.defaultWorktimeSeconds);
  const [pausetimeMinutes, setPausetimeMinutes] = useState(props.defaultPausetimeMinutes);
  const [pausetimeSeconds, setPausetimeSeconds] = useState(props.defaultPausetimeSeconds);
  const worktimeMinutesInput = useRef(null);
  const worktimeSecondsInput = useRef(null);
  const pausetimeMinutesInput = useRef(null);
  const pausetimeSecondsInput = useRef(null);

  const formatMaxSeconds = seconds => seconds > 59 ? 0 : seconds;
  const isNumber = input => input.toString().match(/^\d+$/) ? true : false;

  const handleWorktimeSubmit = (e) => {
    e.preventDefault();
    if (worktimeMinutes !== '' && worktimeSeconds !== '' && isNumber(worktimeMinutes) && isNumber(worktimeSeconds)) {
      props.onWorktimeChange({minutes: worktimeMinutes, seconds: formatMaxSeconds(worktimeSeconds)});
    }
  };

  const handlePausetimeSubmit = (e) => {
    e.preventDefault();
    if (pausetimeMinutes !== '' && pausetimeSeconds !== '' && isNumber(pausetimeMinutes) && isNumber(pausetimeSeconds)) {
      props.onPausetimeChange({minutes: pausetimeMinutes, seconds: formatMaxSeconds(pausetimeSeconds)});
    }
  };

  return (
    <div className="timer-settings">
      <div className="timer-settings__forms">
        {showWorkSettings ? (
          <div className="timer-settings__forms__work">
            <h3>Work options</h3>
            <form
              onSubmit={handleWorktimeSubmit}
              className="timer-settings__worktime-form"
            >
              <div>
                <input
                  ref={worktimeMinutesInput}
                  className="worktime-form__minutes"
                  type="text"
                  name="minutes"
                  placeholder="00"
                  onChange={(e) => setWorktimeMinutes(Number(e.target.value))}
                  value={worktimeMinutes}
                  maxLength="3"
                />
                <span>:</span>
                <input
                  ref={worktimeSecondsInput}
                  className="worktime-form__seconds"
                  type="text"
                  name="seconds"
                  placeholder="00"
                  onChange={(e) => setWorktimeSeconds(Number(e.target.value))}
                  value={worktimeSeconds}
                  maxLength="2"
                />
              </div>
              <button disabled={(worktimeMinutes === '' || worktimeSeconds === '')} className="submit-btn -red">Save</button>
            </form>
          </div>
        ) : (
          <div className="settings__forms__pause">
            <h3>Pause options</h3>
            <form
              onSubmit={handlePausetimeSubmit}
              className="timer-settings__pausetime-form"
            >
              <div>
                <input
                  ref={pausetimeMinutesInput}
                  className="pausetime-form__minutes"
                  type="text"
                  name="minutes"
                  placeholder="00"
                  onChange={(e) => setPausetimeMinutes(Number(e.target.value))}
                  value={pausetimeMinutes}
                  maxLength="3"
                />
                <span>:</span>
                <input
                  ref={pausetimeSecondsInput}
                  className="pausetime-form__seconds"
                  type="text"
                  name="seconds"
                  placeholder="00"
                  onChange={(e) => setPausetimeSeconds(Number(e.target.value))}
                  value={pausetimeSeconds}
                  maxLength="2"
                />
              </div>
              <button disabled={(pausetimeMinutes === '' || pausetimeSeconds === '')} className="submit-btn -blue">Save</button>
            </form>
          </div>
        )}
      </div>
      <div className="timer-settings__switch">
        <button
          onClick={() => setShowWorkSettings(true)}
          className={showWorkSettings ? "is-active" : null}
        >
          Work
        </button>
        <button
          onClick={() => setShowWorkSettings(false)}
          className={showWorkSettings ? null : "is-active"}
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default TimerSettings;
