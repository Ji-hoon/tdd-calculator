import { $totalElement } from "./index.js";
import { OPERATORS, MAXDIGITS } from "./constants.js";

export function handleDigitButton(e) {
  if (!e.target.classList.contains("digit")) {
    return;
  }
  const beforeText = $totalElement.innerText;
  const operator = $totalElement.innerText
    .split("")
    .find((value) => OPERATORS.includes(value));
  const digitsArray = beforeText.split(operator);
  const isInvalidDigits =
    digitsArray[digitsArray.length - 1].length > MAXDIGITS;

  if (isInvalidDigits) {
    alert("숫자는 최대 3자리 까지만 입력 가능합니다.");
    return;
  }

  const afterText =
    beforeText === "0" ? e.target.innerText : beforeText + e.target.innerText;

  $totalElement.innerText = afterText;
}
