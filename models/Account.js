let counter = 0;
class Account {
  #owner;
  #movements;
  #interestRate;
  #pin;
  #id;
  #username;
  constructor(
    owner,
    movements = [],
    interestRate = 10,
    pin,
    movementDates = [],
    locale = 'en-us'
  ) {
    this.#id = this.generateId();
    this.#owner = owner;
    this.#movements = movements;
    this.#interestRate = interestRate;
    this.#pin = pin;
    this.#username = this.generateUserName(owner);
    this.movementDates = movementDates;
    this.locale = locale;
    this.loans = [];
  }

  generateId() {
    counter += 1;
    return `User---${counter}`;
  }
  get id() {
    return this.#id;
  }
  get owner() {
    return this.#owner;
  }
  set owner(value) {
    this.#owner = value;
  }
  get movements() {
    return this.#movements;
  }
  set movements(value) {
    this.#movements = value;
  }
  get interestRate() {
    return this.#interestRate;
  }
  set interestRate(value) {
    this.#interestRate = value;
  }
  get pin() {
    return this.#pin;
  }
  set pin(value) {
    this.#pin = value;
  }
  generateUserName(value) {
    const finalUserName = value
      .trim()
      .toLowerCase()
      .split(' ')
      .reduce((acc = '', uName) => (acc += uName.at(0)), '');
    // let finalUsername = '';
    // username.forEach(element => {
    //   finalUsername += element.at(0);
    // });
    // let finalUsername = '';
    // finalUsername = username.map(uName => uName[0] ).join('').toLowerCase();

    return finalUserName;
  }

  get username() {
    return this.#username;
  }
}

export default Account;
