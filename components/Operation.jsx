//Component for Operation page
import { useState } from 'react';
import localforage from 'localforage';

const centerElement = 'block my-8 mx-auto';

const Operation = () => {
  const [value, setValue] = useState('');
  const [operation, setOperation] = useState('add');
  const [target, setTarget] = useState('balance');
  const [note, setNote] = useState('');

  function handleSubmit() {
    event.preventDefault();
    localforage
      .getItem('wallet')
      .then(wallet => {
        //if there is no wallet create new
        if (!wallet) {
          wallet = {};
          console.log('There is no wallet. Creating new');
        }
        //if there is a wallet pass wallet to then
        if (wallet[target] === 0 || wallet[target]) {
          return wallet;
        } else {
          //if there is no target for wallet initialize it
          wallet[target] = 0;
          return wallet;
        }
      }) //wallet is a copy of current wallet object in localforage
      .then(wallet => {
        if (operation === 'add') {
          wallet[target] += Number(value);
        } else {
          wallet[target] -= Number(value);
        }
        localforage
          .setItem('wallet', wallet)
          .then(() => {
            localforage
              .getItem('log')
              .then(log => {
                if (!log) {
                  log = [];
                  console.log('Creating new log');
                }
                const dateString = () => {
                  const thisTime = Date();
                  const timeArray = thisTime.split(' ');
                  const [day, month, date, year, time, ...other] = timeArray;
                  return `Change was made ${date} ${month} at ${time} (${day})`;
                };
                //create new entry based on current form values
                const entry = {
                  operation: operation,
                  target: target,
                  amount: value,
                  dateString: dateString(),
                  note: note
                };
                //add enrty to the log
                log.push(entry);
                //finally replace old log value with the new one
                localforage
                  .setItem('log', log)
                  .then(() => console.log('new entry added to the log'))
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    //clear inputs
    setValue('');
    setNote('');
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

  function handleNoteChange(event) {
    setNote(event.target.value);
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
        className={centerElement + ' appearance-none'}
        placeholder={'Enter amount'}
      />
      <textarea
        value={note}
        onChange={handleNoteChange}
        className={centerElement}
        name='note'
        id='note'
        cols='20'
        rows='6'
        placeholder={'Enter your note'}
      ></textarea>
      <button className={centerElement} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default Operation;
