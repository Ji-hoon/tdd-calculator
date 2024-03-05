import { $totalElement } from "./index.js";
import { OPERATORS } from "./constants.js";

export function handleOperationButton(e) {
  const displayValue = $totalElement.innerText;
  if (!e.target.classList.contains("operation")) {
    return;
  }
  if (displayValue === "0") {
    alert("숫자를 먼저 입력해주세요.");
    return;
  }

  // 기존 디스플레이 문자열의 길이를 구함
  const displayValueLength = displayValue.length;

  // 기존 문자열을 개별적으로 분해하여 오퍼레이터 배열에 존재하는 문자열과 동일한 오퍼레이터를 반환 (없다면 undefined)
  // 반환된 오퍼레이터가 있는지 기존 문자열에서 index를 찾음 (없다면 -1)
  const currentOperation = displayValue
    .split("")
    .find((value) => OPERATORS.includes(value));
  const currentOperationIndex = displayValue.indexOf(currentOperation);

  // currentOperationIndex 값이 0보다 크거나 기존 디스플레이 문자열의 길이 -1 값과 동일하지 않다면 (= 문자열 중앙에 있다면)
  //    => 얼럿 노출 (1개의 연산자만 사용토록 제한)
  if (
    currentOperationIndex >= 0 &&
    currentOperationIndex !== displayValueLength - 1
  ) {
    alert("연산자는 1개만 사용할 수 있습니다.");
    return;
  }
  // 1. currentOperationIndex가 음수라면 (오퍼레이터가 없다면)
  //    => 기존 문자열에 새로 클릭한 오퍼레이터를 추가
  // 2. currentOperationIndex 값이 0이 아니고 기존 디스플레이 문자열의 길이 -1 값과 동일하다면 (= 마지막 문자열)
  //    => 마지막 문자열을 새로 클릭한 오퍼레이터로 replace하여 반환
  const newValue =
    currentOperationIndex < 0
      ? displayValue + e.target.innerText
      : displayValue.replace(currentOperation, e.target.innerText);

  $totalElement.innerText = newValue;
}

export function handleResultButton() {
  const displayValue = $totalElement.innerText;
  const currentOperation = displayValue
    .split("")
    .find((value) => OPERATORS.includes(value));
  const numbers = displayValue.split(currentOperation);

  const result = () => {
    if (currentOperation === "+") {
      return parseInt(numbers[0]) + parseInt(numbers[1]);
    } else if (currentOperation === "-") {
      return parseInt(numbers[0]) - parseInt(numbers[1]);
    } else if (currentOperation === "X") {
      return parseInt(numbers[0]) * parseInt(numbers[1]);
    } else if (currentOperation === "/") {
      return Math.floor(parseInt(numbers[0]) / parseInt(numbers[1]));
    }
  };

  $totalElement.innerText = result();
}
