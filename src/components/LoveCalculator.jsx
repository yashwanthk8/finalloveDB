import React, { useState } from 'react';
import './LoveCalculator.css';

const LoveCalculator = () => {
  const [sname, setSname] = useState('');
  const [fname, setFname] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [result, setResult] = useState('');

  const calculateLovePercentage = () => {
    const url = `https://love-calculator.p.rapidapi.com/getPercentage?sname=${sname}&fname=${fname}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c7ff5542f0mshed3dee78b614073p1efc2cjsn52c09fdd2d3d',
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
      },
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        setPercentage(data.percentage);
        setResult(data.result);
        saveNamesToDatabase(sname, fname);
      })
      .catch(error => console.error('Error:', error));
  };

  const saveNamesToDatabase = (sname, fname) => {
    fetch('http://localhost:5001/save-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sname, fname }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="lovecalc">
      <h1>Love Calculator</h1>
      <label htmlFor="sname">Your Name:</label>
      <input
        type="text"
        id="sname"
        name="sname"
        value={sname}
        onChange={(e) => setSname(e.target.value)}
        required
      />
      <br />
      <label htmlFor="fname">Partner's Name:</label>
      <input
        type="text"
        id="fname"
        name="fname"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        required
      />
      <br />
      <button type="button" onClick={calculateLovePercentage}>
        Calculate
      </button>
      <div className="cont">
        <div id="result">
          {percentage !== null && <p>Love Percentage: {percentage}%</p>}
        </div>
        <div id="reason">
          {result && <p>Love result: {result}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoveCalculator;
