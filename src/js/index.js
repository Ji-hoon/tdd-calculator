import { handleDigitButton } from "./handleDigit.js";
import {
  handleOperationButton,
  handleResultButton,
} from "./handleOperation.js";

export const $totalElement = document.querySelector("#total");

function App() {
  const $digitButtons = document.querySelector(".digits");
  const $operationButtons = document.querySelector(".operations");
  const $modifierButtons = document.querySelector(".modifiers");

  $digitButtons.addEventListener("click", handleDigitButton);
  $operationButtons.addEventListener("click", (e) => {
    if (e.target.innerText.includes("=")) {
      handleResultButton();
      return;
    }
    handleOperationButton(e);
  });
  $modifierButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("modifier")) {
      $totalElement.innerText = "0";
    }
  });
}

App();
