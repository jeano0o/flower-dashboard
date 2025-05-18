import React, { useEffect, useState } from 'react';
import './Flower.css';
import axios from 'axios';

const sheetURL =
  'https://docs.google.com/spreadsheets/d/1pKoSFnCSPoOqAT2gywsGYkHdhnDzY8bBZEaN4uiigTY/gviz/tq?tqx=out:json';

const Flower = () => {
  const [petals, setPetals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(sheetURL);
        const json = JSON.parse(res.data.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const petalData = rows
          .map((row) => ({
            ticker: row.c[0]?.v,
            roi: parseFloat(row.c[1]?.v || 0),
            theme: row.c[2]?.v,
            mood: row.c[3]?.v,
            thesis: row.c[4]?.v,
          }))
          .filter((p) => p.ticker && p.theme);

        setPetals(petalData);
      } catch (err) {
        setError('Could not load flower data.');
      }
    }

    fetchData();
  }, []);

  const colors = {
    'Spice World': '#ff70a6',
    "That’s Rich": '#e63946',
    'The Emperor Has No Clothes': '#000000',
    'GothGloss': '#4b0082',
    'Technologis Broicus': '#56ccf2',
    'Dark Green Fund': '#219653',
  };

  return (
    <div className="flower-box">
      {error && <p>{error}</p>}
      {!error &&
        petals.map((petal, idx) => (
          <div
            key={idx}
            className="petal"
            title={`${petal.ticker}: ${petal.thesis || 'no thesis yet'}`}
            style={{
              backgroundColor: colors[petal.theme] || '#ccc',
              transform: `rotate(${idx * 15}deg) scale(${1 + petal.roi / 100})`,
              opacity: 0.9 + petal.roi / 100,
            }}
          >
            {petal.ticker}
          </div>
        ))}
    </div>
  );
};

export default Flower;
