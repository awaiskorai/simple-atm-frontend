class AccountDatabase {
  constructor() {
    this.accounts = [];
  }
  addAcount(account) {
    if (account) this.accounts.push(account);
  }

  getAccountByUsername(username) {
    const acc = this.accounts.find(acc => acc.username === username);
    if (acc) {
      console.log(acc);
      return acc;
    }
    return null;
  }
  getAccount(id) {
    const acc = this.accounts.find(acc => acc.id === id);
    if (acc) {
      return acc;
    }
    return null;
  }
  updateAccount(id, account) {
    const accIndex = this.accounts.findIndex(acc => acc.id === id);
    if (acc) {
      return (this.accounts[accIndex] = account);
    }
  }

  getAccountIndexByUsername(username) {
    const index = this.accounts.findIndex(acc => acc.username === username);
    return index;
  }

  deleteAccount(index) {
    const deleteAccount = this.accounts.splice(index, 1);
    return deleteAccount;
  }
}
const accountsDB = new AccountDatabase();
export { accountsDB };
