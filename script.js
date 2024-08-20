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
  getALoan,
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
  5555,
  [
    '2024-08-18T14:00:00.000Z',
    '2024-08-17T14:00:00.000Z',
    '2024-08-16T14:00:00.000Z',
    '2024-08-15T14:00:00.000Z',
    '2024-08-14T14:00:00.000Z',
    '2024-08-13T14:00:00.000Z',
    '2024-08-12T14:00:00.000Z',
    '2024-08-11T14:00:00.000Z',
  ],
  'en-US'
);

const emily = new Account(
  'emily clark',
  [6000, 3700, -100, -800, -3100, -900, 9000, -50],
  1.6,
  6666,
  [
    '2024-08-10T14:00:00.000Z',
    '2024-08-09T14:00:00.000Z',
    '2024-08-08T14:00:00.000Z',
    '2024-08-07T14:00:00.000Z',
    '2024-08-06T14:00:00.000Z',
    '2024-08-05T14:00:00.000Z',
    '2024-08-04T14:00:00.000Z',
    '2024-08-03T14:00:00.000Z',
  ],
  'fr-FR' // French (France)
);

const michael = new Account(
  'michael smith',
  [250, -150, 400, -250, -10, 100, 450, -400],
  0.8,
  7777,
  [
    '2024-08-02T14:00:00.000Z',
    '2024-08-01T14:00:00.000Z',
    '2024-07-31T14:00:00.000Z',
    '2024-07-30T14:00:00.000Z',
    '2024-07-29T14:00:00.000Z',
    '2024-07-28T14:00:00.000Z',
    '2024-07-27T14:00:00.000Z',
    '2024-07-26T14:00:00.000Z',
  ],
  'es-ES' // Spanish (Spain)
);

const anna = new Account(
  'anna taylor',
  [500, 1100, 800, 100, 150],
  1.1,
  8888,
  [
    '2024-07-25T14:00:00.000Z',
    '2024-07-24T14:00:00.000Z',
    '2024-07-23T14:00:00.000Z',
    '2024-07-22T14:00:00.000Z',
    '2024-07-21T14:00:00.000Z',
  ],
  'de-DE' // German (Germany)
);

console.log(john);
console.log(emily);
console.log(michael);
console.log(anna);

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

const btnSort = document.querySelector('.btn--sort');
btnSort.classList.add('hidden');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const btnClose = document.querySelector('.form__btn--close');
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
      containerApp.style.opacity = 0;
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
    labelDate.textContent = Dates.getDateNowLocale(acct.locale);
    labelWelcome.textContent = `Welcome, ${acct.owner
      .split(' ')
      .map(item => item[0].toUpperCase().concat(item.slice(1)))
      .join(' ')}`;
    // loginForm.style.opacity = 0;
    startCountDown(600);
    //classList.toggle('hidden');
    clearMovements(containerMovements);
    const formattedDates = Dates.formatMovementDatesIntlLocale(
      acct.movementDates
    );
    const formattedMovements = CurrencyDatabase.formatCurrencyArray(
      acct.movements,
      acct.locale
    );
    console.log(formattedMovements);
    insertMovements(
      acct.movements,
      formattedMovements,
      containerMovements,
      formattedDates
    );

    labelBalance.textContent = CurrencyDatabase.formatCurrencySingle(
      checkBalance(acct.movements),
      acct?.locale
    );
    labelSumIn.textContent = CurrencyDatabase.formatCurrencySingle(
      checkDeposits(acct.movements),
      acct?.locale
    );
    labelSumOut.textContent = CurrencyDatabase.formatCurrencySingle(
      checkWithdrawals(acct.movements),
      acct?.locale
    );

    labelSumInterest.textContent = CurrencyDatabase.formatCurrencySingle(
      checkInterests(acct.movements)(acct.interestRate),
      acct.locale
    );
    user = acct;
  }
};

const transferAction = function (e) {
  e.preventDefault();
  console.log(`Type of input transfer: ${typeof inputTransferAmount.value}`);
  let dateNow = new Date().toISOString();
  const transferred = transferMoney(
    Number(inputTransferAmount.value),
    inputTransferTo.value,
    user,
    dateNow
  );
  dateNow = Dates.formatSingleMovementDateIntLocale(dateNow);
  inputTransferAmount.value = '';
  inputTransferTo.textContent = '';
  labelBalance.textContent = checkBalance(user.movements);

  const movementFormatted = CurrencyDatabase.formatCurrencySingle(
    user.movements.at(-1),
    user.locale
  );
  transferred &&
    containerMovements.insertAdjacentHTML(
      'afterBegin',
      insertMovement(
        user?.movements?.at(-1),
        movementFormatted,
        dateNow,
        user.movements.length
      )
    );
};
btnTransfer.addEventListener('click', transferAction);

console.log(accountsDB);
btnLogin.addEventListener('click', userLogged);

const closeAccount = function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = +inputClosePin.value;

  const indexOfAccountToBeDeleted =
    accountsDB.getAccountIndexByUsername(username);

  console.log(indexOfAccountToBeDeleted);

  if (username != user.username)
    throw new Error("Cannot close another person's account");
  if (pin === user.pin) {
    accountsDB.deleteAccount(indexOfAccountToBeDeleted);
    containerApp.style.opacity = 0;
  }
};
btnClose.addEventListener('click', closeAccount);

const requestForLoan = function (e) {
  e.preventDefault();

  const loanInput = +inputLoanAmount.value;
  getALoan(user.movements, loanInput, user.loans);
  console.log(user.loans);
  containerMovements.insertAdjacentHTML(
    'afterBegin',
    insertMovement(
      loanInput,
      (user?.movements?.length || 0) + (user?.loans?.length - 1 || 0)
    )
  );
};
btnLoan.addEventListener('click', requestForLoan);
