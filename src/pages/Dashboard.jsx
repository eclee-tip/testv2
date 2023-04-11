import React, { useState, useEffect } from 'react';
import '../style/dashboard.css';
import { MdOutlineWaterDrop} from "react-icons/md";
import { FaFan } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { FaTemperatureHigh } from "react-icons/fa";
import {GiHeatHaze} from "react-icons/gi";
import {BsFillDropletFill} from "react-icons/bs"
import {AiFillWarning} from "react-icons/ai";

import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebaseconfig';

const Dashboard = () => {
  const [temp, setTemp] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [pH, setpH] = useState(null);
  const [exhaustFan, setexhaustFan] = useState(null);
  const [motor, setMotor] = useState(null);
  // const [blowerFan, setblowerFan] = useState(null);
  const [heatingElement, setheatingElement] = useState(null);
  const [day, setDay] = useState(null);
  const [ambient, setAmbient] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningmoisture, setShowWarningmoisture] = useState(false);
  
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

  const ambientRef = ref(db, 'Data/ambient'); // pH

  useEffect(() => {
    onValue(ambientRef, (snapshot) => {
      const data = snapshot.val();
      setAmbient(data);
    });
  }, []);

  // const fanRef = ref(db, 'Data/Blower_Fan'); // Exhaust Fan

  // useEffect(() => {
  //   onValue(fanRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setblowerFan(data);
  //   });
  // }, []);

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

  const getAcceptedRange = () => {
    if (day === 1) {
      return <span1>Accepted Range: 30 °C - 34 °C</span1>; 
    } else if (day === 2) {
      return <span1>Accepted Range: 35 °C - 39 °C</span1>;
    } else if (day === 3) {
      return <span1>Accepted Range: 40 °C - 44 °C</span1>
    } else if (day === 4) {
      return <span1>Accepted Range: 45 °C - 50 °C</span1>;
    } else {
      return <span1>No required value for temperature in Drying</span1>;
    }
  };
  // useEffect(() => {
  //   if (day <= 4 && (ambient < 30 || ambient > 40)) {
  //     setShowWarning(true);
  //   } else if (day > 4 && ambient >= 50) {
  //     setShowWarning(true);
  //   } else {
  //     setShowWarning(false);
  //   }
  // }, [ambient, day]);

  // useEffect(() => {
  //   if (day >= 5 && (moisture< 5.5 || moisture> 7.5)) {
  //     setShowWarningmoisture(true);
  //   } else {
  //     setShowWarningmoisture(false);
  //   }
  // }, [moisture, day]);

  return (
    <div>
      <div className='inline-container'>
        <h1 className='font-candara inline-block'>Dashboard</h1>
        <p className='font-candara inline-block '>Legend: <span className='danger-box'></span> = far from range <span className='warning-box'></span> = close to range <span className='accepted-box'></span> = within range</p>
      </div>

      <div>
        <h2 className='tab1 font-candara'>Day {day}</h2>
        {day <= 2 ? (
          <span1 className='centered1'>Status: Fermentation on Process (Anaerobic Phase)</span1>
        ) : day >= 3 && day <= 4 ? (
          <span1 className='centered1'>Status: Fermentation on Process (Aerobic Phase)</span1>
        ) : day === 5 ? (
         <span1 className='centered1'>Status: Drying on Process</span1>
        ) : (
         <span1 className='centered1'>Status: No current process</span1>
        )}
      </div>
      
      
      <div className="home-container">

        {day <= 4 ? (
          <div className="box">
          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <span>Temperature (Cacao)</span>
            <h1>{temp} °C</h1>
            {getAcceptedRange()}
            {(day === 1 && (temp < 28.5 || temp > 35.7)) ? (
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
            ) : (day === 1 && ((temp >= 28.5 && temp < 30) || (temp <= 35.7 && temp > 34))) ? (
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
            ): (day === 1 && (temp >= 30 || temp <= 34)) ? (
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
            ) : (day === 2 && (temp < 33.25 || temp > 40.95)) ? (
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
            ) : (day === 2 && ((temp >= 33.25 && temp < 35) || (temp > 39 && temp <= 40.95))) ? (
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
            ) : (day === 2 && (temp >= 35 || temp <= 39)) ? (
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
            ) : (day === 3 && (temp < 38 || temp > 46.2)) ? (
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
            ) : (day === 3 && ((temp >= 38 && temp < 40) || (temp > 44 && temp <= 46.2))) ? (
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
            ) : (day === 3 && (temp >= 40 || temp <= 44)) ?(
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
            ) : (day === 4 && (temp < 42.75 || temp > 52.5)) ? (
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
            ) : (day === 4 && ((temp >= 42.75 && temp < 45) || (temp > 50 && temp <= 52.5))) ? (
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
            ) : (day === 4 && (temp >= 45 || temp <= 50)) ?(
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
            ) : null}
          </div>
        </div>
        ): (
          <div className="box-hide">
          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <span>Temperature (Cacao)</span>
            <h1>{temp} °C</h1>
            {getAcceptedRange()}
            {/* {day === 1 ? (
              <p>Accepted Range: 30 °C - 34 °C</p>
            ) : day === 2 ? (
              <p>Accepted Range: 35 °C - 39 °C</p>
            ) : day === 3 || day === 4 ? (
              <p>Accepted Range: 40 °C - 45 °C</p>
            ) : (
              <p>No required value for temperature in Drying</p>
            )} */}
          </div>
        </div>
        )}
        

        <div className="box">
          <div className="box-icon">
            <FaTemperatureHigh />
          </div>
          <div className="box-data">
            <span>Ambient Temperature</span>
            <h1>{ambient} °C</h1>
            {((day === 1 || day === 2) && (ambient < 28.5 || ambient > 35.7)) ? (
              <>
              <span1>Accepted Range: 30 °C - 34 °C</span1>
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
              </>
            ) : ((day === 1 || day === 2) && ((ambient >= 28.5 && ambient < 30) || (ambient > 34 && ambient <= 35.7))) ? (
              <>
              <span1>Accepted Range: 30 °C - 34 °C</span1>
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
              </>
            ) : ((day === 1 || day === 2) && (ambient >= 30 || ambient <= 34)) ? (
              <>
              <span1>Accepted Range: 30 °C - 34 °C</span1>
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
              </>
            ) : (day === 3 && (ambient < 33.25 || ambient > 42)) ? (
              <>
              <span1>Accepted Range: 35 °C - 40 °C</span1>
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
              </>
            ) : (day === 3 && ((ambient >= 33.25 && ambient < 35) || (ambient > 40 && ambient <= 42))) ? (
              <>
              <span1>Accepted Range: 35 °C - 40 °C</span1>
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
              </>
            ) : (day === 3 && (ambient >= 35 || ambient <= 40)) ? (
              <>
              <span1>Accepted Range: 35 °C - 40 °C</span1>
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
              </>
            ) : (day === 4 && (ambient < 33.25 || ambient > 38.85)) ? (
              <>
              <span1>Accepted Range: 35 °C - 37 °C</span1>
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
              </>
            ) : (day === 4 && ((ambient >= 33.25 && ambient < 35) || (ambient > 37 && ambient <= 38.85))) ? (
              <>
              <span1>Accepted Range: 35 °C - 37 °C</span1>
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
              </>
            ) : (day === 4 && (ambient >= 35 || ambient <= 37)) ? (
              <>
              <span1>Accepted Range: 35 °C - 37 °C</span1>
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
              </>
            ) : (ambient > 52.5) ? (
              <>
              <span1>Accepted Range: less than than 50 °C</span1>
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
              </>
            ) : (ambient > 50 && ambient <= 52.5) ? (
              <>
              <span1>Accepted Range: less than than 50 °C</span1>
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
              </>
            ) : (ambient <= 50) ? (
              <>
              <span1>Accepted Range: less than than 50 °C</span1>
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
              </>
            ) : null} 
          </div>
        </div>

        <div className="box">

          <div className="box-icon">
            <GiHeatHaze/>
          </div>
          <div className="box-data">
            <span>PTC (Heating Unit)</span>
            <h1>{heatingElement}</h1>
            <span1 class="centered">Provides heat to regulate the temperature </span1>
          </div>
        </div>
        
        {day <= 4 ? (
          <div className="box-hide">

          <div className="box-icon">
            <MdOutlineWaterDrop/>
          </div>
          <div className="box-data">
            <span>Moisture</span>
            <h1>{moisture} %</h1>
            {day <= 4 ? (
              <span1>No required value for fermentation</span1>
            ) : (day === 5) ? (
              <span1>Acceptable Range: 5.5 % - 7.5 %</span1>
            ) : (
              <span1>No required value for moisture</span1>
            )}
          </div>

        </div>
        ) : (
          <div className="box">

          <div className="box-icon">
            <MdOutlineWaterDrop/>
          </div>
          <div className="box-data">
            <span>Moisture</span>
            <h1>{moisture} %</h1>
            {day <= 4 ? (
              <span1>No required value for fermentation</span1>
            ) : (day === 5 && (moisture < 5.23 || moisture > 7.88)) ? (
              <>
              <span1>Acceptable Range: 5.5 % - 7.5 %</span1>
              <div class="danger-rectangle">
              <p>DANGER</p>
              </div>
              </>
            ) : (day === 5 && ((moisture >= 5.23 && moisture < 5.5) || (moisture > 7.5 && moisture <= 7.88))) ? (
              <>
              <span1>Acceptable Range: 5.5 % - 7.5 %</span1>
              <div class="warning-rectangle">
              <p>WARNING</p>
              </div>
              </>
            ) : (day === 5 && (moisture >= 5.5 || moisture <= 7.5)) ? (
              <>
              <span1>Acceptable Range: 5.5 % - 7.5 %</span1>
              <div class="accepted-rectangle">
              <p>ACCEPTED</p>
              </div>
              </>
            ) : null}
          </div>

        </div>
        )}
        
        {day <= 2 ? (
          <div className="box-hide">

          <div className="box-icon">
            <BsFillDropletFill />
          </div>
          <div className="box-data">
            <span>pH (Cotyledon)</span>
            <h1>{pH}</h1>
            {day <= 2 ? (
              <span1>No required value for fermentation (anaerobic)</span1>
            ) : day === 3 || day === 4 ? (
              <span1>Acceptable Range: 4.8 - 6.5</span1>
            ) : (
              <span1>No require value for pH</span1>
            )}
            
          </div>

        </div>
        ) : day === 3 || day === 4 ? (
          <div className="box">

          <div className="box-icon">
            <BsFillDropletFill />
          </div>
          <div className="box-data">
            <span>pH (Cotyledon)</span>
            <h1>{pH}</h1>
            {day <= 2 ? (
              <span1>No required value for fermentation (anaerobic)</span1>
            ) : day === 3 || day === 4 ? (
              <span1>Acceptable Range: 4.8 - 6.5</span1>
            ) : (
              <span1>No require value for pH</span1>
            )}
            
          </div>

        </div>
        ) : (
          <div className="box-hide">

          <div className="box-icon">
            <BsFillDropletFill />
          </div>
          <div className="box-data">
            <span>pH (Cotyledon)</span>
            <h1>{pH}</h1>
            {day <= 2 ? (
              <span1>No required value for fermentation (anaerobic)</span1>
            ) : day === 3 || day === 4 ? (
              <span1>Acceptable Range: 4.8 - 6.5</span1>
            ) : (
              <span1>No require value for pH</span1>
            )}
            
          </div>

        </div>
        )}
        

        {/* <div className="box">

          <div className="box-icon">
          <GiHeatHaze/>
          <FaFan/>
          </div>
          <div className="box-data">
            <span>Blower Fan</span>
            <h1>{blowerFan}</h1>
            <p class="centered">Activates to spread the heat from PTC</p>
          </div>

        </div> */}

        { day >= 1 && day <= 2 ? (
          <div className="box-hide">

          <div className="box-icon">
            <FaFan/>
          </div>
          <div className="box-data">  
            <span>Exhaust Fan</span>
            <h1>{exhaustFan}</h1>
            { day >= 1 && day <= 2 ? (
              <span1 class="centered">Will not turn on in this phase</span1>
            ) : day === 3 || day === 4 ? (
              <span1 class="centered">Turns on when ambient temperature is more than 40 °C</span1>
            ) : (
              <span1 class="centered">Turns on when ambient temperature is more than 49 °C</span1>
            )}
          </div>

        </div>
        ) : (
          <div className="box">

          <div className="box-icon">
            <FaFan/>
          </div>
          <div className="box-data">  
            <span>Exhaust Fan</span>
            <h1>{exhaustFan}</h1>
            { day >= 1 && day <= 2 ? (
              <span1 class="centered">Will not turn on in this phase</span1>
            ) : day === 3 || day === 4 ? (
              <span1 class="centered" style={{margin: '10px'}}>Turns on when ambient temperature is more than 40 °C</span1>
            ) : (
              <span1 class="centered" style={{margin: '10px'}}>Turns on when ambient temperature is more than 49 °C</span1>
            )}
          </div>

        </div>
        )}
        
        {day === 1 || day === 2 ? (
          <div className="box-hide">
          <div className="box-icon">
            <RiSettings2Line/>
          </div>
          <div className="box-data">
            <span>Motor</span>
            <h1>{motor}</h1>
            { day === 1 || day === 2 ? (
              <span1 class="centered">Will not turn on in this phase</span1>
            ) : (
              <span1 class="centered">Operates the mixing process</span1>
            )}
            
          </div>

        </div>
        ) : (
          <div className="box">
          <div className="box-icon">
            <RiSettings2Line/>
          </div>
          <div className="box-data">
            <span>Motor</span>
            <h1>{motor}</h1>
            { day === 1 || day === 2 ? (
              <span1 class="centered">Will not turn on in this phase</span1>
            ) : day === 3 || day === 4 ? (
              <span1 class="centered" style={{margin: '10px'}}>The motor will operate once per day for mixing process</span1>
            ) : (
              <span1 class="centered" style={{margin: '10px'}}>The motor will operate twice per day for mixing process</span1>
            )}
            
          </div>

        </div>
        )}
        
        
      </div>
    </div>
  )
}

export default Dashboard
