import React, { useState } from 'react';
import moment from 'moment';
import styles from './schedulepage.module.css';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(null);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const handleDayClick = (day) => {
    if (day.isSameOrAfter(moment(), 'day')) {
      setSelectedDay(day);
      console.log(day.format('YYYY-MM-DD')); // Log the selected day in YYYY-MM-DD format
    }
  };

  return (
    <div className={styles.maindiv}>
      <div className={styles.calendartop}>
        <button className={styles.prevbutton} onClick={handlePrevMonth}>Prev</button>
        <h2 className={styles.months}>{currentMonth.format('YYYY')}</h2>
        <button className={styles.nextbutton} onClick={handleNextMonth}>Next</button>
      </div>
      <Month month={currentMonth} selectedDay={selectedDay} onDayClick={handleDayClick} />
    </div>
  );
}

function Month({ month, selectedDay, onDayClick }) {
  const daysInMonth = month.daysInMonth();
  const monthStart = month.startOf('month');
  const firstDay = monthStart.day();

  const handleDayClick = (day) => {
    onDayClick(day);
  };

  const renderWeekdays = () => {
    const weekdays = moment.weekdaysShort();
    return weekdays.map((weekday) => <th key={weekday}>{weekday}</th>);
  };

  const renderDays = () => {
    const rows = [];
    let cells = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (day <= daysInMonth) {
          const classNames = [styles.day];
          if (i === 0 && j < firstDay) {
            cells.push(<td key={j} />);
          } else {
            const currentDate = moment(monthStart).date(day);
            if (currentDate.isSameOrBefore(moment(), 'day')) {
              classNames.push(styles.pastDay);
            }
            if (selectedDay && currentDate.isSame(selectedDay, 'day')) {
              classNames.push(styles.currentDay);
            }

            cells.push(
              <td className={styles.td} key={j} onClick={() => handleDayClick(currentDate)}>
                <div className={classNames.join(' ')}>{day}</div>
              </td>
            );
            day++;
          }
        }
      }

      rows.push(<tr key={i}>{cells}</tr>);
      cells = [];
    }

    return rows;
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th} colSpan="7">{month.format('MMMM')}</th>
        </tr>
        <tr>{renderWeekdays()}</tr>
      </thead>
      <tbody>{renderDays()}</tbody>
    </table>
  );
}

function SchedulePage() {
  return <Calendar />;
}

export default SchedulePage;

