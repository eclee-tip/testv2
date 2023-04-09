import React, { useState } from 'react';
import '../style/control.css';
import { getDatabase, ref, set } from "firebase/database";

const Control = () => {
  const [button1On, setButton1On] = useState(false);
  const [button2On, setButton2On] = useState(false);

  const handleButton1Click = () => {
    const db = getDatabase();
    set(ref(db, 'Data/Control'), {
      Fermentation: !button1On ? 1 : 0,
      Drying: button2On ? 1 : 0,
    }).then(() => {
      setButton1On(!button1On);
    }).catch((error) => {
      console.error("Error updating database: ", error);
    });
  }

  const handleButton2Click = () => {
    const db = getDatabase();
    set(ref(db, 'Data/Control'), {
      Fermentation: button1On ? 1 : 0,
      Drying: !button2On ? 1 : 0,
    }).then(() => {
      setButton2On(!button2On);
    }).catch((error) => {
      console.error("Error updating database: ", error);
    });
  }

  return (
    <div>
      <h1>Control for Fermentation and Drying</h1>
      <div className="toggle-switch">
        <h1>Fermentation</h1>
        <button
          className={`button ${button1On ? 'on' : 'off'}`}
          onClick={handleButton1Click}
          disabled={button2On}
        ></button>
      </div>
      <div className="toggle-switch">
        <h1>Drying</h1>
        <button
          className={`button ${button2On ? 'on' : 'off'}`}
          onClick={handleButton2Click}
          disabled={button1On}
        ></button>
      </div>
    </div>
  );
};

export default Control;