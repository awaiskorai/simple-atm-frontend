import { accountsDB } from './accountsdatabase.service.js';
const transferMoney = function (transferValue, transferTo, transferer, date) {
  if (!(typeof Number(transferValue) === 'number') || transferValue <= 0)
    throw new Error('Input Valid Number');
  if (checkBalance(transferer.movements) < transferValue) {
    throw new Error('Transfer cannot be more than balance');
  }
  let transferToUser = accountsDB.getAccountByUsername(transferTo);
  console.log(transferer.username);
  console.log(transferToUser.username);
  if (transferToUser && transferToUser?.username != transferer?.username) {
    transferer.movements.push(-transferValue);
    transferer.movementDates.push(date);
    transferToUser.movements.push(transferValue);
    transferToUser.movementDates.push(date);
    return true;
  } else {
    alert('Invalid User or Cannot Send to self');
  }
  transferToUser = null;
};
const checkBalance = function (movements) {
  return movements.reduce((acc, mov) => (acc += mov));
};

const checkDeposits = function (movements) {
  return movements.reduce((acc, mov) => {
    if (mov >= 0) {
      acc += mov;
    }
    return acc;
  });
};

const checkWithdrawals = function (movements) {
  return movements.reduce((acc, mov) => {
    if (mov <= 0) {
      acc += Math.abs(mov);
    }
    return acc;
  });
};

const checkInterests = function (movements) {
  const total = movements.reduce((acc, mov) => (mov > 1 ? (acc += mov) : acc));

  return function (interest) {
    return Math.round((total * interest) / 100);
  };
};
const getWithdrawals = function (movements) {
  movements.map(function (value, index) {
    if (value < 0) return value;
  });

  return movements.filter(value => value < 0);
};

const getDeposits = function (movements) {
  movements.map(function (value, index) {
    if (value > 0) return value;
  });
  return movements.filter(obj => obj >= 0);
};

const getALoan = function (movements, loanRequested, loans) {
  const healthBalance = movements.reduce((acc, mov) => (acc += mov), 0);
  if (loanRequested > healthBalance * 0.15)
    throw new Error("Credit Rating not satisfied. Loan won't be processed");

  loans.push(loanRequested);
};
const sortMovementsAndDates = function (movements = [], movementDates = []) {
  movements.sort(function (a, b) {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  });
};
export {
  checkDeposits,
  checkBalance,
  transferMoney,
  checkWithdrawals,
  checkInterests,
  getWithdrawals,
  getDeposits,
  getALoan,
};
