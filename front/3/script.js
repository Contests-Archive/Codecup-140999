const CHANGE_TYPE = {
  UP: "UP",
  DOWN: "DOWN",
};
const ERROR_TYPE = {
  NOT_FOUND: "NOT_FOUND",
  NOT_POSSIBLE: "NOT_POSSIBLE",
  INVALID_INPUT: "INVALID_INPUT",
};
let numbers = [4, 6, 10, 23, 0, 24, 30, 2];

const orderItems = () => {
  numbers.forEach((number) => {
    const element = document.createElement("span");
    element.textContent = number;
    numbersContainer.append(element);
  });
};

const removeItems = () => {
  numbers.forEach((number, index) => {
    const element = numbersContainer.firstChild;
    numbersContainer.removeChild(element);
  });
};

const numbersContainer = document.querySelector("#numbers-container");
orderItems();

const itemInput = document.querySelector("#item-input");
const countInput = document.querySelector("#count-input");
const errorContainer = document.querySelector("#error-container");
const radioUp = document.querySelector("#type-container").children[0];
const radioDown = document.querySelector("#type-container").children[1];

const submit = document.querySelector("#submit-btn");
submit.addEventListener("click", (event) => {
  if (errorContainer.querySelector("p")) {
    errorContainer.removeChild(errorContainer.querySelector("p"));
  }
  if (!itemInput.value || !countInput.value) {
    const element = document.createElement("p");
    element.textContent = ERROR_TYPE.INVALID_INPUT;
    element.id = "error";
    errorContainer.append(element);
  } else {
    if (
      numbers.find((number) => itemInput.value == Number(number)) === undefined
    ) {
      const element = document.createElement("p");
      element.textContent = ERROR_TYPE.NOT_FOUND;
      element.id = "error";
      errorContainer.append(element);
    } else {
      if (radioUp.checked) {
        if (
          numbers.length <=
          numbers.indexOf(Number(itemInput.value)) + Number(countInput.value)
        ) {
          const element = document.createElement("p");
          element.textContent = ERROR_TYPE.NOT_POSSIBLE;
          element.id = "error";
          errorContainer.append(element);
        } else {
          const oldIndex = numbers.indexOf(Number(itemInput.value));
          var item = numbers.splice(oldIndex, 1)[0];
          numbers.splice(oldIndex + Number(countInput.value), 0, item);
          removeItems();
          orderItems();
        }
      } else if (radioDown.checked) {
        if (
          numbers.indexOf(Number(itemInput.value)) - Number(countInput.value) <
          0
        ) {
          const element = document.createElement("p");
          element.textContent = ERROR_TYPE.NOT_POSSIBLE;
          element.id = "error";
          errorContainer.append(element);
        } else {
          const oldIndex = numbers.indexOf(Number(itemInput.value));
          var item = numbers.splice(oldIndex, 1)[0];
          numbers.splice(oldIndex - Number(countInput.value), 0, item);
          removeItems();
          orderItems();
        }
      }
    }
  }
});
