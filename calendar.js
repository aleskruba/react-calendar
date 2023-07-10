import React, { useState } from 'react';
import moment from 'moment';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  const handleDayClick = (day) => {
    console.log(day.format('YYYY-MM-DD')); // Log the selected day in YYYY-MM-DD format
  };

  return (
    <div>
      <h1>Clickable Calendar</h1>
      <div>
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <Month month={currentMonth} onDayClick={handleDayClick} />
    </div>
  );
}

function Month({ month, onDayClick }) {
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
          const classNames = ['day'];
          if (i === 0 && j < firstDay) {
            cells.push(<td key={j} />);
          } else {
            const currentDate = moment(monthStart).date(day);
            classNames.push(currentDate.isSame(moment(), 'day') ? 'today' : '');

            cells.push(
              <td key={j} onClick={() => handleDayClick(currentDate)}>
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
    <table>
      <thead>
        <tr>
          <th colSpan="7">{month.format('MMMM YYYY')}</th>
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
