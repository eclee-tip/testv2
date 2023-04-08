import React, { useState, useEffect } from 'react';
import '../style/tablev1.css';

const data = [
  { temperature: 30, time: "12:00", day: "2023-04-08" },
  { temperature: 31, time: "12:00", day: "2023-04-08" },
  { temperature: 32, time: "12:00", day: "2023-04-09" },
]

const Graph = () => {
  const [currentDay, setCurrentDay] = useState("2023-04-08");
  const [filteredData, setFilteredData] = useState([]);

  const handlePrevDay = () => {
    const currentDate = new Date(currentDay);
    currentDate.setDate(currentDate.getDate() - 1);
    const prevDay = currentDate.toISOString().slice(0, 10);
    setCurrentDay(prevDay);
  }
  
  const handleNextDay = () => {
    const currentDate = new Date(currentDay);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().slice(0, 10);
    setCurrentDay(nextDay);
  }

  useEffect(() => {
    // Filter the data array to only include items with the currentDay
    const filtered = data.filter(item => item.day === currentDay);

    setFilteredData(filtered);
  }, [currentDay]);

  return (
    <div className="Graph">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handlePrevDay}>Previous</button>
        <button onClick={handleNextDay}>Next</button>
      </div>
      <table style={{ margin: '0 auto', width: '80%' }}>
        <tr>
          <th>Temperature</th>
          <th>Time</th>
        </tr>
        {filteredData.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.temperature}</td>
              <td>{val.time}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Graph;
