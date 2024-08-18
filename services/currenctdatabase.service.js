class CurrencyDatabase {
  constructor() {
    this.currencies = new Map();
  }
  addCurrency(currency) {
    if (currency) this.currencies.set(currency.id, currency);
  }
  getCurrency(id) {
    const curr = this.currencies.has(id);
    if (curr) {
      return this.currencies.get(id);
    }
    return null;
  }
  updateCurrency(id, updateCurr) {
    const curr = this.currencies.has(id);
    if (curr) {
      return this.currencies.set(id, updateCurr);
    }
  }

  movementConvertor(movements, currencyFrom, currencyTo, exchangeRate) {
    if (movements instanceof Array != true)
      throw new Error(
        'This function only accepts array of movements in numbers'
      );
    const newMovements = movements.map(item, index => {
      return typeof item == 'number'
        ? item * Number(exchangeRate).toFixed(2)
        : 0;
    });
    return { currencyFrom, currencyTo, newMovements };
  }

  movementConvertorForOf(movements, currencyFrom, currencyTo, exchangeRate) {
    if (movements instanceof Array != true) {
      throw new Error(
        'This function only accepts array of movements in numbers'
      );
    }

    const newMovements = [];
    for (const [index, value] of movements.entries()) {
      newMovements.push(value * exchangeRate);
    }

    return { currencyFrom, currencyTo, newMovements };
  }
}

export default CurrencyDatabase;
