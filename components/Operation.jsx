//Component for Index page
import { useState } from 'react';
import localforage from 'localforage';

const centerElement = 'block my-8 mx-auto';

const Operation = () => {
  const [value, setValue] = useState('');
  const [operation, setOperation] = useState('add');
  const [target, setTarget] = useState('balance');

  function handleSubmit() {
    event.preventDefault();
    localforage
      .getItem('wallet')
      .then(wallet => {
        if (!wallet) {
          wallet = {};
          console.log('there is no wallet. Creating new');
        }
        if (wallet[target] === 0 || wallet[target]) {
          console.log('wallet has a target');
          return wallet;
        } else {
          console.log('initializing new target value', wallet[target]);
          wallet[target] = 0;
          return wallet;
        }
      })
      .then(wallet => {
        if (operation === 'add') {
          wallet[target] += Number(value);
          localforage
            .setItem('wallet', wallet)
            .then(() => {
              console.log('added to wallet');
              addEntry(operation, target, value);
            })
            .catch(err => console.log(err));
        } else {
          wallet[target] -= Number(value);
          localforage
            .setItem('wallet', wallet)
            .then(() => {
              console.log('removed from wallet');
              addEntry(operation, target, value);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    setValue('');
  }

  function addEntry(operation, target, amount) {
    localforage
      .getItem('log')
      .then(log => {
        if (!log) {
          log = [];
          console.log('creating new log');
        }
        return log;
      })
      .then(log => {
        const dateString = () => {
          const thisTime = Date();
          const timeArray = thisTime.split(' ');
          const [day, month, date, year, time, ...other] = timeArray;
          return `Change was made ${date} ${month} at ${time} (${day})`;
        };

        const entry = {
          operation: operation,
          target: target,
          amount: amount,
          dateString: dateString()
        };
        log.push(entry);
        localforage
          .setItem('log', log)
          .then(() => console.log('new entry added to the log'))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleOperationChange(event) {
    setOperation(event.target.value);
  }
  function handleTargetChange(event) {
    setTarget(event.target.value);
  }

  return (
    <>
      <select
        onChange={handleOperationChange}
        value={operation}
        name='operation'
        id='operation'
        className={centerElement}
      >
        <option value='add'>Add</option>
        <option value='remove'>Remove</option>
      </select>
      <select
        onChange={handleTargetChange}
        value={target}
        name='target'
        id='target'
        className={centerElement}
      >
        <option value='balance'>Balance</option>
        <option value='debt'>Debt</option>
        <option value='loan'>Loan</option>
      </select>
      <input
        value={value}
        onChange={handleValueChange}
        type='number'
        name='set'
        id='balance'
        className={centerElement}
      />
      <button className={centerElement} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default Operation;
