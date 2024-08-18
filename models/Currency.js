class Currency {
  #id;
  #acronym;
  #currency;
  constructor(acronym, currency) {
    this.#id = this.generateKey();
    this.#acronym = acronym;
    this.#currency = currency;
  }

  generateKey() {
    this.#id = 'Currency---${id}';
  }
  get id() {
    return this.#id;
  }
  get acronym() {
    return this.#id;
  }
  get currency() {
    return this.#id;
  }
}

export default Currency;
