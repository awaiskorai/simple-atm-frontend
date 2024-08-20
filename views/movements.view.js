const insertMovements = function (
  movements,
  movementsFormatted,
  nodeName,
  movementDates
) {
  movements.forEach((movement, count) => {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    let html = `<div class="movements__row">
              <div class="movements__type movements__type--${movementType}"> ${
      count + 1
    } ${movementType}</div>
              <div class="movements__date">${movementDates[count]}</div>
              <div class="movements__value">${movementsFormatted[count]}</div>
            </div>`;
    nodeName.insertAdjacentHTML('afterbegin', html);
  });
};
const insertMovement = function (movement, movementFormatted, date, count) {
  const movementType = movement > 0 ? 'deposit' : 'withdrawal';
  let html = `<div class="movements__row">
              <div class="movements__type movements__type--${movementType}"> ${
    count + 1
  } ${movementType}</div>
              <div class="movements__date">${date}</div>
              <div class="movements__value">${movementFormatted}</div>
            </div>`;
  return html;
};

const clearMovements = function (node) {
  node.innerHTML = '';
};

export { clearMovements, insertMovements, insertMovement };
