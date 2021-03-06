import React from "react";
import classNames from "classnames";
import { InputType } from "common/types";
import { ChangeEventHandler, FC } from "react";
import styles from "./Calendar.module.css";
import { Day } from "./types";

interface WeekProps {
  days: Day[];
  inputName: string;
  offset?: number;
  selectedDate?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Week: FC<WeekProps> = ({
  days,
  inputName,
  offset,
  selectedDate,
  onChange,
}) => {
  const style = offset ? { marginLeft: `${offset * 2.7}rem` } : undefined;
  return (
    <div className={styles.week} style={style}>
      {days.map((d) => {
        const isSelected = d.date === selectedDate;
        return (
          <label
            key={`day-of-the-month-${d.date}`}
            className={classNames(styles.day, {
              [styles.selected]: isSelected,
              [styles.sunday]: +d.day === 7,
            })}
          >
            {d.date}
            <input
              type={InputType.Radio}
              checked={isSelected}
              value={d.date}
              className={styles.dayInput}
              name={inputName}
              onChange={onChange}
            />
          </label>
        );
      })}
    </div>
  );
};

export default React.memo(Week);
