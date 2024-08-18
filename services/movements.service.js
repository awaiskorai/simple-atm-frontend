const transferMoney = function (transferValue, transferTo, transferer) {
  if (!(typeof Number(transferValue) === 'number') && transferTo > 0)
    throw new Error('Input Valid Number');
  if (checkBalance(transferer.movements) < transferValue) {
    throw new Error('Transfer cannot be more than balance');
  }
  let transferToUser = accountsDB.getAccountByUsername(transferTo);
  if (transferToUser && transferToUser != user.username) {
    transferer.movements.push(-transferValue);
    transferToUser.movements.push(transferValue);
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
  const total = movements.reduce((acc, mov) => (acc += mov));

  return function (interest) {
    return total * interest;
  };
};

export {
  checkDeposits,
  checkBalance,
  transferMoney,
  checkWithdrawals,
  checkInterests,
};
