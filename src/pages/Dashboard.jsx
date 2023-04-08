import React, { useState, useEffect } from 'react';
import '../style/dashboard.css';
import { MdOutlineWaterDrop} from "react-icons/md";
import { FaFan } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { FaTemperatureHigh } from "react-icons/fa";
import {GiHeatHaze} from "react-icons/gi";
import {BsFillDropletFill} from "react-icons/bs"

import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebaseconfig';

const Dashboard = () => {
  const [temp, setTemp] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [pH, setpH] = useState(null);
  const [exhaustFan, setexhaustFan] = useState(null);
  const [motor, setMotor] = useState(null);
  const [blowerFan, setblowerFan] = useState(null);
  const [heatingElement, setheatingElement] = useState(null);
  const [day, setDay] = useState(null);
  
  const db = getDatabase(app);
  const tempRef = ref(db, 'Data/Temperature'); //Temperature

  useEffect(() => {
    onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      setTemp(data);
    });
  }, []);

  const moistureRef = ref(db, 'Data/Moisture'); // Moisture

  useEffect(() => {
    onValue(moistureRef, (snapshot) => {
      const data = snapshot.val();
      setMoisture(data);
    });
  }, []);

  const pHRef = ref(db, 'Data/pH'); // pH

  useEffect(() => {
    onValue(pHRef, (snapshot) => {
      const data = snapshot.val();
      setpH(data);
    });
  }, []);

  const fanRef = ref(db, 'Data/Blower_Fan'); // Exhaust Fan

  useEffect(() => {
    onValue(fanRef, (snapshot) => {
      const data = snapshot.val();
      setblowerFan(data);
    });
  }, []);

  const motorRef = ref(db, 'Data/MOTOR'); // Motor

  useEffect(() => {
    onValue(motorRef, (snapshot) => {
      const data = snapshot.val();
      setMotor(data);
    });
  }, []);

  const exhaustFanRef = ref(db, 'Data/Exhaust_Fan'); // Motor

  useEffect(() => {
    onValue(exhaustFanRef, (snapshot) => {
      const data = snapshot.val();
      setexhaustFan(data);
    });
  }, []);

  const heatingElementRef = ref(db, 'Data/PTC'); // Motor

  useEffect(() => {
    onValue(heatingElementRef, (snapshot) => {
      const data = snapshot.val();
      setheatingElement(data);
    });
  }, []);

  const dayRef = ref(db, 'Data/day');

  useEffect(() => {
    onValue(dayRef, (snapshot) => {
      const data = snapshot.val();
      setDay(data);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {day >= 1 && day <= 2 ? (
        <p className='centered'>Status: Fermentation on Process (Anaerobic Phase)</p>
      ) : day >= 3 && day <= 4 ? (
        <p className='centered'>Status: Fermentation on Process (Aerobic Phase)</p>
      ) : (
        <p className='centered'>Status: Drying on Process</p>
      )}
      <div className="home-container">
        <div className="box">
          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <p>Day {day}</p>
            <span>Temperature</span>
            <h1>{temp} °C</h1>
            {day === 1 ? (
              <p>Temperature Range: 30 °C - 34 °C</p>
            ) : day === 2 ? (
              <p>Temperature Range: 35 °C - 39 °C</p>
            ) : day >= 3 && day <= 4 ? (
              <p>Temperature Range: 40 °C - 48 °C</p>
            ) : (
              <p>Temperature Range: 49 °C - 60 °C</p>
            )}
          </div>

        </div>

        <div className="box">

          <div className="box-icon">
            <MdOutlineWaterDrop/>
          </div>
          <div className="box-data">
            <p>Day {day}</p>
            <span>Moisture</span>
            <h1>{moisture} %</h1>
            {day <= 4 ? (
              <p>No required value for fermentation</p>
            ) : (
              <p>Needed moisture content is 7 %</p>
            )}
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <BsFillDropletFill />
          </div>
          <div className="box-data">
            <p>Day {day}</p>
            <span>pH</span>
            <h1>{pH}</h1>
            {day < 3 ? (
              <p>No display of data yet</p>
            ) : day >= 3 && day <=4 ? (
              <p>Well Fermented Range: 4.5 - 6.5</p>
            ) : (
              <p>No display of data yet</p>
            )}
            
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <GiHeatHaze/>
          </div>
          <div className="box-data">
            <span>PTC</span>
            <h1>{heatingElement}</h1>
            <p class="centered">Provides heat to regulate the temperature</p>

          </div>

        </div>

        <div className="box">

          <div className="box-icon">
          <FaFan/>
          </div>
          <div className="box-data">
            <span>Blower Fan</span>
            <h1>{blowerFan}</h1>
            <p class="centered">Activates to spread the heat from PTC</p>
          </div>

        </div>
      
        <div className="box">

          <div className="box-icon">
            <FaFan/>
          </div>
          <div className="box-data">  
            <span>Exhaust Fan</span>
            <h1>{exhaustFan}</h1>
            <p class="centered">Cools down the system when temperature is high</p>
          </div>

        </div>
        <div className="box">
          <div className="box-icon">
            <RiSettings2Line/>
          </div>
          <div className="box-data">
            <span>Motor</span>
            <h1>{motor}</h1>
            <p class="centered">Operates when it is aerobic and drying phase</p>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
