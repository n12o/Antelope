//Component for Index page
import { useState } from 'react';

const Operation = () => {
  const [value, setValue] = useState('');

  function handleSubmit() {
    event.preventDefault();
    localStorage.setItem('balance', value);
    setValue('');
  }

  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <>
      <input
        value={value}
        onChange={handleChange}
        type='number'
        name='set'
        id='balance'
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Operation;
