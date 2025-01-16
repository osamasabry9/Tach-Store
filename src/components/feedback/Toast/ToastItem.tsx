import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { removeToast, stopDelayAnimation } from "@store/toasts/toastsSlice";
import { TToast } from "@types";
import styles from "./styles.module.css";

const { toastItem } = styles;

// Constants for progress bar configuration
const PROGRESS_BAR_TOTAL_WIDTH = 100; // Represents 100% completion
const PROGRESS_BAR_DURATION = 4000; // Total duration in milliseconds
const PROGRESS_BAR_INTERVAL_TIME = PROGRESS_BAR_DURATION / PROGRESS_BAR_TOTAL_WIDTH; // Interval time in milliseconds
const DELAY_ANIMATION_DURATION = 2000; // Duration for delay animation

const ToastItem = ({
  id,
  type,
  delayAnimation,
  title,
  message,
  onCloseToast,
}: TToast) => {
  const dispatch = useAppDispatch();

  const [progressBarIndicator, setProgressBarIndicator] = useState(0);
  const [isProgressBarPaused, setIsProgressBarPaused] = useState(false);

  // Close toast handler
  const closeToastHandler = useCallback(() => {
    dispatch(removeToast(id));
    onCloseToast?.();
  }, [id, onCloseToast, dispatch]);

  // Toggle progress bar pause state on mouse enter/leave
  const handleMouseEvent = useCallback(() => {
    setIsProgressBarPaused((prevState) => !prevState);
  }, []);

  // Progress bar increment logic
  useEffect(() => {
    if (delayAnimation) return; // Stop progress bar if delay animation is active

    const timerId = setInterval(() => {
      setProgressBarIndicator((prevState) => {
        if (!isProgressBarPaused && prevState < PROGRESS_BAR_TOTAL_WIDTH) {
          return prevState + 1; // Increment progress by 1%
        }
        return prevState;
      });
    }, PROGRESS_BAR_INTERVAL_TIME);

    return () => clearInterval(timerId);
  }, [isProgressBarPaused, delayAnimation]);

  // Close toast when progress bar reaches 100%
  useEffect(() => {
    if (progressBarIndicator === PROGRESS_BAR_TOTAL_WIDTH) {
      closeToastHandler();
    }
  }, [progressBarIndicator, closeToastHandler]);

  // Handle delay animation
  useEffect(() => {
    if (delayAnimation) {
      const timeoutId = setTimeout(() => {
        dispatch(stopDelayAnimation(id));
      }, DELAY_ANIMATION_DURATION);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, delayAnimation, id]);

  // If delay animation is active, render nothing
  if (delayAnimation) return null;

  return (
    <div
      className={`alert alert-${type} ${toastItem}`}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <h5>{title || type}</h5>
      <p>{message}</p>
      <button type="button" className="btn-close" onClick={closeToastHandler} />
      <span
        className="placeholder"
        style={{
          width: `${progressBarIndicator}%`,
          transition: `width ${PROGRESS_BAR_INTERVAL_TIME}ms linear`,
        }}
      ></span>
    </div>
  );
};

export default ToastItem;
