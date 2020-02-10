//Component for Operation page
import { useState } from 'react';
import localforage from 'localforage';

const centerElement = 'block my-8 mx-auto';

const Operation = props => {
  const [value, setValue] = useState(0);
  const [operation, setOperation] = useState('add');
  const [target, setTarget] = useState('balance');
  const [note, setNote] = useState('');

  function handleValueChange(event) {
    let input = event.target.value;
    //Checks if value is blank or not a number
    if (input === '') {
      //Sets to zero in case someone tries to remove single digit
      if (value.length === 1) {
        setValue(0);
      } else {
        setValue(value);
        props.fireAlert('isNaN');
      }
      return;
    }
    //This needed to set new value in place of initial '0'
    if (input[0] === '0') {
      setValue(input.replace('0', ''));
      return;
    }
    //Value cannot be negative
    if (input < 0) {
      setValue(value);
      props.fireAlert('negative');
      return;
    }
    //Value is validated and ready to be updated
    setValue(input);
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

  function handleSubmit() {
    event.preventDefault();

    update()
      .then(() => props.fireAlert('success'))
      .catch(err => props.fireAlert(err));

    //clear inputs
    setValue('');
    setNote('');
  }

  function checkRequired() {
    if (value && operation && target) {
      return true;
    } else {
      return false;
    }
  }

  const update = async () => {
    //Validate form
    const validated = checkRequired();
    if (!validated) {
      throw 'not validated';
    }
    //Get wallet
    let wallet = await localforage.getItem('wallet');
    if (!wallet) {
      wallet = {};
    }
    if (!wallet[target]) {
      wallet[target] = 0;
    }
    console.log(wallet[target]);
    //Validate action
    if (operation === 'remove') {
      if (wallet[target] === 0) {
        throw 'less than zero';
      } else if (wallet[target] - Number(value) < 0) {
        throw 'less than zero';
      } else {
        wallet[target] -= Number(value);
      }
    } else if (operation === 'add') {
      wallet[target] += Number(value);
    } else {
      throw 'invalid operation';
    }
    //Get log
    let log = await localforage.getItem('log');
    if (!log) {
      log = [];
    }
    //Add to log
    const dateString = () => {
      const thisTime = Date();
      const timeArray = thisTime.split(' ');
      const [day, month, date, year, time, ...other] = timeArray;
      return `Change was made ${date} ${month} at ${time} (${day})`;
    };
    const entry = {
      operation: operation,
      target: target,
      amount: value,
      dateString: dateString(),
      note: note
    };
    log.unshift(entry);
    //Add to storage
    return Promise.all([updateWallet(wallet), updateLog(log)]);
  };

  const updateWallet = async wallet => {
    return localforage.setItem('wallet', wallet);
  };

  const updateLog = async log => {
    return localforage.setItem('log', log);
  };

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
          step='0.01'
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
