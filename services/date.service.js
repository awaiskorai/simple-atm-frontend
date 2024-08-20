class Dates {
  static getDateNow() {
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate(); // Use getDate() instead of getUTCDate()
    const month = date.getMonth() + 1; // Add 1 to get the correct month (January is 0)

    return `${day}/${month}/${year}`;
  }

  static getDateNowLocale(locale = 'en-us') {
    const dateNow = new Date();
    const options = {
      day: 'numeric',
      weekday: 'long',
      month: '2-digit',
      hour: '2-digit',
      year: 'numeric',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat(locale, options).format(dateNow);
  }

  static formatFullDatesForMovementNonLocale(movementDates) {
    const dates = movementDates.map(date => {
      console.log(date);
      const formatDate = new Date(date);
      const year = formatDate.getFullYear();
      const day = formatDate.getDay();
      const month = formatDate.getMonth();
      const hour = formatDate.getHours();
      const minute = formatDate.getMinutes();
      const seconds = formatDate.getMilliseconds();
      const ms = formatDate.getMilliseconds();
      const time = formatDate.getTime();
      const timeZoneOffset = formatDate.getTimezoneOffset();
      return `${day}/${month}/${year} ${hour}:${minute},${seconds}:${ms} || Time: ${time} || Timezone Offset: ${timeZoneOffset}`;
    });

    return dates;
    console.log(dates);
  }

  static formatDatesForMovementNonLocale(movementDates) {
    const newMovementDates = movementDates.map(date => {
      const newDate = new Date(date);
      const year = newDate.getFullYear().toString().slice(2);
      const day = newDate.getDate().toString().padStart(2, 0);
      const month = (newDate.getMonth() + 1).toString().padStart(2, 0);
      const minutes = newDate.getMinutes().toString().padStart(2, 0);
      const hours = newDate.getHours();
      return `${day}/${month}/${year} at ${hours}:${minutes}`;
    });
    return newMovementDates;
  }

  static formatMovementDatesIntlLocale(
    movementDates,
    locale = 'en-us',
    options = {
      day: 'numeric',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    }
  ) {
    const newMovementDates = movementDates.map(date => {
      const newDate = new Date(date);
      const movementDayFromTimestamp = +newDate / (1000 * 60 * 60 * 24);
      const todaysTimestamp = +new Date() / (1000 * 60 * 60 * 24);
      const days = todaysTimestamp - movementDayFromTimestamp;

      if (days < 1) {
        return 'Today';
      } else if (days <= 2 && days > 1) {
        return 'Yesterday';
      } else if (days >= 2 && days <= 7) {
        return `${Math.floor(days)} days ago`;
      }

      return Intl.DateTimeFormat(locale, options).format(newDate);
    });
    return newMovementDates;
  }
  static formatSingleMovementDateIntLocale(
    movementDate,
    locale = 'en-us',
    options = {
      day: 'numeric',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    }
  ) {
    const newDate = new Date(movementDate);
    const movementDayFromTimestamp = +newDate / (1000 * 60 * 60 * 24);
    const todaysTimestamp = +new Date() / (1000 * 60 * 60 * 24);
    const days = todaysTimestamp - movementDayFromTimestamp;

    if (days < 1) {
      return 'Today';
    } else if (days <= 2 && days > 1) {
      return 'Yesterday';
    } else if (days >= 2 && days <= 7) {
      return `${Math.floor(days)} days ago`;
    }

    return Intl.DateTimeFormat(locale, options).format(newDate);
  }
}

export default Dates;
