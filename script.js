
function run() {

portfolio = parseInt(document.getElementById("portfolioInput").value);
period = parseInt(document.getElementById("periodInput").value);
risk = parseInt(document.getElementById("riskInput").value);

if (validInputs() == false) {
    document.getElementById("output").innerHTML = "Invalid";
} else {
    document.getElementById("output").innerHTML = "Amount if you invested in S&P 500 that many years ago:\n" + findReturns(portfolio, period);
}

}

function validInputs() {

    portfolio = parseInt(document.getElementById("portfolioInput").value);
    period = parseInt(document.getElementById("periodInput").value);
    risk = parseInt(document.getElementById("riskInput").value);
    
    if (!Number.isInteger(portfolio) || !Number.isInteger(period) || !Number.isInteger(risk) || risk < 1 || risk > 5 || period < 1 || portfolio < 0 || period > 94) {
        return false;
    } else {
        return true;
    }
    
}

function findReturns(portfolio, period){
    portfolio = parseInt(document.getElementById("portfolioInput").value);
    period = parseInt(document.getElementById("periodInput").value);
    const returns = [.3788, -.1191, -.2848, -.4707, -.1515, .4659, -.0594, .4137, .2792, -.3859, .2521, -.0545, -.1529, -.1786, .1243, .1945, .1380, .3072, -.1187, 0.0, -.0065, .1026, .2178, .1646, .1178, -.0662, .4502, .2640, .0262, -.1431, .3806, .0848, -.0297, .2313, -.1181, .1889, .1297, .0906, -.1309, .2009, .0766, -.1136, .0010, .1079, .1563, -.1737, -.2972, .3155, .1915, -.1150, .0106, .1231, .2577, -.0973, .1476, .1727, .0140, .2633, .1462, .0203, .1240, .2725, -.0656, .2631, .0446, .0706, -.0154, .3411, .2026, .3101, .2667, .1953, -.1014, -.1304, -.2337, .2638, .0899, .0300, .1362, .0353, -.3849, .2345, .1278, 0.0, .1341, .2960, .1139, -.0073, .0954, .1942, -.0624, .2888, .1626, .2689];
    value = portfolio;
    startingYear = 94 - period;
    for(i = startingYear; i < 94; i++){
        value *= (1 + returns[i]);
    }
    return '$' + value.toFixed(2);
}

