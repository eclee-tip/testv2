import React from 'react'
import '../style/team.css'
import louis from '../images/y.PNG'
import lee from '../images/a.PNG'
import poy from '../images/x.PNG'
import taws from '../images/z.PNG'

const About = () => {
  const teamMembers = [
    {
      name: 'Louis Angelo del Rosario',
      position: 'Computer Engineering',
      major: 'Intelligent Systems',
      image: louis,
    },
    {
      name: 'Eugene Christopher Lee',
      position: 'Computer Engineering',
      major: 'Systems Administration',
      image: lee,
    },
    {
      name: 'John Lloyd D. Ponce',
      position: 'Computer Engineering',
      major: 'Intelligent Systems',
      image: poy,
    },
    {
      name: 'Joshua Taway',
      position: 'Computer Engineering',
      major: 'Data Science',
      image: taws,
    }
  ];

  return (
    <div>
      <h1 className='font-candara'>About</h1>
      <br></br>
      <div className='box-margin'>
      <div className='box-data1'>
        <div className='text-margin'>
          <div style={{textAlign: 'justify', textJustify: 'inter-word'}}>
        <span1>CacaoTech is a system that can do fermentation and drying process of cacao beans. It is created to help small scale farmers in terms of production.</span1>
        <br></br>
        <span1>PamCak is a company that specializes in offering hardware solutions for the agriculture industry, with a particular focus on supporting cacao farmers. PamCak is dedicated to giving farmers the resources they require to succeed in the agricultural sector because it acknowledges the value of cacao farming to the agricultural sector. The company is based in Taytay, Rizal, and it was established in August of 2022.</span1>
        <br></br>
        <span1>CacaoTech, the company's first product, is an automated heating system for fermentation and drying cacao. It is equipped with several sensors, such as temperature, moisture, and pH, to monitor these parameters daily; a PTC ceramic heater that produces the heat; a blower fan for better airflow inside the system; an exhaust fan to prevent high heat; and a web application where the temperature, moisture, and pH data are displayed as well as the status of the other components.</span1>
        </div>
        </div>
      </div>
      </div>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    <div className="team-section">
      <h2 className='font-candara'>Our Team</h2>
      <br></br>
      <div className="team-members">
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <p>{member.major}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default About