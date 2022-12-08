var currentValue = 27;
var maxValue = 36;
document.querySelector("#circular-progress").setAttribute("style", "--value:" + (currentValue / maxValue) * 100);
$("#circular-progress").html(currentValue + "/" + maxValue);