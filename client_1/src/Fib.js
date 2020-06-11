import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {
  const [ indexes, setIndexes ] = useState([]);
  const [ values, setValues ] = useState({});
  const [ index, setIndex ] = useState('');

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');

    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const indexes = await axios.get('/api/values/all');

    setIndexes(indexes.data);
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const renderIndexes = () => indexes.map(({ number }) => number).join(', ');

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setIndex(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', { index });
    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label htmlFor="indexid" >Set index:</label >
        <input
          id="indexid"
          value={index}
          type="text"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>

        <h3>Indexes I have seen:</h3>
        { renderIndexes() }

        <h3>Calculated values:</h3>
        { renderValues() }
      </form >
    </div>
  );
};

export default Fib;
