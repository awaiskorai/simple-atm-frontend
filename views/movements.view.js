const insertMovements = function (movements, nodeName) {
  movements.forEach((movement, count) => {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    let html = `<div class="movements__row">
              <div class="movements__type movements__type--${movementType}"> ${
      count + 1
    } ${movementType}</div>
              <div class="movements__date">3 days ago</div>
              <div class="movements__value">${Math.abs(movement)}€</div>
            </div>`;
    nodeName.insertAdjacentHTML('afterbegin', html);
  });
};
const insertMovement = function (movement, count) {
  const movementType = movement > 0 ? 'deposit' : 'withdrawal';
  let html = `<div class="movements__row">
              <div class="movements__type movements__type--${movementType}"> ${
    count + 1
  } ${movementType}</div>
              <div class="movements__date">3 days ago</div>
              <div class="movements__value">${Math.abs(movement)}€</div>
            </div>`;
  return html;
};

const clearMovements = function (node) {
  node.innerHTML = '';
};

export { clearMovements, insertMovements, insertMovement };
