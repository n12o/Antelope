//Component for Operation page
import { useState } from 'react';
import localforage from 'localforage';

const centerElement = 'block my-8 mx-auto';

const Operation = props => {
  const [value, setValue] = useState('');
  const [operation, setOperation] = useState('add');
  const [target, setTarget] = useState('balance');
  const [note, setNote] = useState('');

  function checkRequired() {
    if (value && operation && target) {
      return true;
    } else {
      return false;
    }
  }

  const updateWallet = async () => {
    const validated = checkRequired();
    console.log(validated);
    if (!validated) {
      throw 'not validated';
    }
    let wallet = await localforage.getItem('wallet');
    //create new wallet if there is no wallet
    if (!wallet) {
      wallet = {};
    }
    //create new target if there is no target
    if (!wallet[target]) {
      wallet[target] = 0;
    }
    //update target value based on operation
    if (operation === 'add') {
      wallet[target] += Number(value);
    } else {
      wallet[target] -= Number(value);
    }
    //return promise of success or failure to add to wallet
    return await localforage.setItem('wallet', wallet);
  };

  const updateLog = async () => {
    const validated = checkRequired();
    if (!validated) {
      throw 'not validated';
    }
    let log = await localforage.getItem('log');
    //create new log if there is no log present
    if (!log) {
      log = [];
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
    //return promise of success or failure of updating the log
    return localforage.setItem('log', log);
  };

  function handleSubmit() {
    event.preventDefault();

    Promise.all([updateWallet(), updateLog()])
      .then(() => {
        props.onClick('success');
      })
      .catch(err => {
        props.onClick(err);
      });

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
      <form>
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
          required
          value={value}
          onChange={handleValueChange}
          type='number'
          name='set'
          id='balance'
          className={centerElement + ' appearance-none'}
          placeholder={'Enter amount: required'}
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
      </form>
    </>
  );
};

export default Operation;
