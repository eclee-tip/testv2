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



  return (
    <div>
      <div className="home-container">

        <div className="box">

          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <span>Temperature</span>
            <h1>{temp} °C</h1>
          </div>

        </div>

        <div className="box">

          <div className="box-icon">
            <MdOutlineWaterDrop/>
          </div>
          <div className="box-data">
            <span>Moisture</span>
            <h1>{moisture} %</h1>
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <BsFillDropletFill />
          </div>
          <div className="box-data">
            <span>pH</span>
            <h1>{pH}</h1>
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
          <FaFan/>
          </div>
          <div className="box-data">
            <span>Blower Fan</span>
            <h1>{blowerFan}</h1>
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <RiSettings2Line/>
          </div>
          <div className="box-data">
            <span>Motor</span>
            <h1>{motor}</h1>
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <FaFan/>
          </div>
          <div className="box-data">
            <span>Exhaust Fan</span>
            <h1>{exhaustFan}</h1>
          </div>

        </div>
        <div className="box">

          <div className="box-icon">
            <GiHeatHaze/>
          </div>
          <div className="box-data">
            <span>PTC</span>
            <h1>{heatingElement}</h1>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
