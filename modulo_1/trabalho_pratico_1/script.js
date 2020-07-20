window.addEventListener('load', onLoad);

function onLoad() {
  document
    .querySelector('#inputRed')
    .addEventListener('change', handleRangeChange);
  document
    .querySelector('#inputGreen')
    .addEventListener('change', handleRangeChange);
  document
    .querySelector('#inputBlue')
    .addEventListener('change', handleRangeChange);

  handleRangeChange();
}

function handleRangeChange() {
  var divResult = document.querySelector('#divColorResult');
  var rCode = document.querySelector('#inputRed').value;
  var gCode = document.querySelector('#inputGreen').value;
  var bCode = document.querySelector('#inputBlue').value;

  document.querySelector('#inputRedValue').value = rCode;
  document.querySelector('#inputGreenValue').value = gCode;
  document.querySelector('#inputBlueValue').value = bCode;

  divResult.style = `background-color: rgb(${rCode},${gCode},${bCode})`;
}
