class Dates {
  static getDateNow() {
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate(); // Use getDate() instead of getUTCDate()
    const month = date.getMonth() + 1; // Add 1 to get the correct month (January is 0)

    return `${day}/${month}/${year}`;
  }
}

export default Dates;
