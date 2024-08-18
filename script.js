'use strict';
import Account from './models/Account.js';
import Currency from './models/Currency.js';
import CurrencyDatabase from './services/currenctdatabase.service.js';
import { accountsDB } from './services/accountsdatabase.service.js';
import Dates from './services/date.service.js';
import {
  transferMoney,
  checkBalance,
  checkDeposits,
  checkWithdrawals,
  checkInterests,
} from './services/movements.service.js';
import {
  insertMovement,
  insertMovements,
  clearMovements,
} from './views/movements.view.js';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const john = new Account(
  'john doe',
  [300, 500, -200, 3500, -750, -100, 150, 1400],
  1.3, // %
  5555
);

const emily = new Account(
  'emily clark',
  [6000, 3700, -100, -800, -3100, -900, 9000, -50],
  1.6,
  6666
);

const michael = new Account(
  'michael smith',
  [250, -150, 400, -250, -10, 100, 450, -400],
  0.8,
  7777
);

const anna = new Account('anna taylor', [500, 1100, 800, 100, 150], 1.1, 8888);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const usd = new Currency('USD', 'United States dollar');
const eur = new Currency('Eur', 'Euro');
const gbp = new Currency('GBP', 'Pound sterling');

const currenciesDB = new CurrencyDatabase();
accountsDB.addAcount(john);
accountsDB.addAcount(michael);
accountsDB.addAcount(emily);
accountsDB.addAcount(anna);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const loginForm = document.querySelector(`.login`);

/////////////////////////////////////////////////
let user;

const startCountDown = function (seconds) {
  let minutes = (seconds / 60).toFixed(0);
  let second = (seconds % 60).toFixed(0);
  const interval = setInterval(function () {
    second != 0 ? --second : (--minutes, (second = 60 - 1));
    labelTimer.textContent = `${minutes.toString().padStart(2, '0')}:${second
      .toString()
      .padStart(2, '0')}`;
    if (second == 0 && minutes == 0) {
      labelTimer.textContent = 'PLEASE LOG OUT. UNSAFE.';
      clearInterval(interval);
    }
    console.log(seconds);
  }, 1000);

  // clearInterval(interval);
};
const userLogged = function (e) {
  e.preventDefault();
  const login = inputLoginUsername.value.trim().toLowerCase();
  const pin = Number(inputLoginPin.value.trim());

  const acct = accountsDB.getAccountByUsername(login);
  if (pin === acct.pin) {
    containerApp.style.opacity = '100';
    labelDate.textContent = Dates.getDateNow();
    labelWelcome.textContent = `Welcome, ${acct.owner}`;
    loginForm.style.opacity = 0;
    startCountDown(5);
    //classList.toggle('hidden');
    clearMovements(containerMovements);
    insertMovements(acct.movements, containerMovements);
    labelBalance.textContent = checkBalance(acct.movements);
    labelSumIn.textContent = checkDeposits(acct.movements);
    labelSumOut.textContent = checkWithdrawals(acct.movements);

    labelSumInterest.textContent = checkInterests(acct.movements)(
      acct.interestRate
    );
    user = acct;
  }
};

const transferAction = function (e) {
  e.preventDefault();
  console.log(`Type of input transfer: ${typeof inputTransferAmount.value}`);
  const transferred = transferMoney(
    Number(inputTransferAmount.value),
    inputTransferTo.value,
    user
  );

  inputTransferAmount.value = '';
  inputTransferTo.textContent = '';
  labelBalance.textContent = checkBalance(user.movements);
  const containerMovements = insertMovement(
    user.movements.at(-1),
    user.movements.length
  );
  transferred && containerMovements.insertAdjacentHTML('afterbegin', html);
};
btnTransfer.addEventListener('click', transferAction);

console.log(accountsDB);
btnLogin.addEventListener('click', userLogged);
