
function run() {

portfolio = parseInt(document.getElementById("portfolioInput").value);
period = parseInt(document.getElementById("periodInput").value);

if (validInputs() == false) {
    document.getElementById("output").innerHTML = "Invalid";
} else {
    document.getElementById("regressionEquation").innerHTML = "Using linear regression on S&P 500 historical data...";
    document.getElementById("output").innerHTML = "Total value of your account if you invested $" + String(portfolio) + " in S&P 500 in " + String(2021 - period) + ":\n" + findReturns(portfolio, period);
    document.getElementById("projection").innerHTML = "Total value of your account if you invest $" + String(portfolio) + " in S&P 500 in 2022 for "+ String(period) + " years:\n" + findReturnsFromRegression(portfolio, period);
}

}

function findReturnsFromRegression(portfolio, period) {
    const slope = 0.000844342737420077;
    const intercept = 0.03969691146190804;
    var returns = [];
    for (let i = 0; i < 94; i++) {
        returns.push(intercept + slope*(94 + i));
    }
    portfolio = parseInt(document.getElementById("portfolioInput").value);
    period = parseInt(document.getElementById("periodInput").value);
    value = portfolio;
    for(i = 0; i < period; i++){
        value *= (1 + returns[i]);
    }
    return '$' + value.toFixed(2);
}

function validInputs() {

    portfolio = parseInt(document.getElementById("portfolioInput").value);
    period = parseInt(document.getElementById("periodInput").value);
    
    
    if (!Number.isInteger(portfolio) || !Number.isInteger(period) || period < 1 || portfolio < 0 || period > 94) {
        return false;
    } else {
        return true;
    }
    
}

function findReturns(){
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

function developModel(){
  
    //Get input arrays
    const x = new Array(94);
    for (i = 0; i < 94 ; i++){
        x[i] = i + 1;
    }

    var x_values = x;
    var y_values = [.3788, -.1191, -.2848, -.4707, -.1515, .4659, -.0594, .4137, .2792, -.3859, .2521, -.0545, -.1529, -.1786, .1243, .1945, .1380, .3072, -.1187, 0.0, -.0065, .1026, .2178, .1646, .1178, -.0662, .4502, .2640, .0262, -.1431, .3806, .0848, -.0297, .2313, -.1181, .1889, .1297, .0906, -.1309, .2009, .0766, -.1136, .0010, .1079, .1563, -.1737, -.2972, .3155, .1915, -.1150, .0106, .1231, .2577, -.0973, .1476, .1727, .0140, .2633, .1462, .0203, .1240, .2725, -.0656, .2631, .0446, .0706, -.0154, .3411, .2026, .3101, .2667, .1953, -.1014, -.1304, -.2337, .2638, .0899, .0300, .1362, .0353, -.3849, .2345, .1278, 0.0, .1341, .2960, .1139, -.0073, .0954, .1942, -.0624, .2888, .1626, .2689];
    
    //Get slope, intercept and R2 score
    var regressor = linearRegression(x_values, y_values);
  
    //Plot the chart
    // plotRegressionChart(x_values, y_values, regressor['y_hat'], regressor['r2']);
  
    //Write the regression equation to the screen
    document.getElementById("regressionEquation").innerHTML = "<b>Regression Equation: </b> "+String(regressor['slope'])+"*x + "+String(regressor['intercept']);
    
  }

  function linearRegression(x_values, y_values){
        
    //Create the regressor object to store the equation's data
    var regressor = {};
    
    //Set variables we'll need to get the slope and intercept; we need to find the equation in the format y = m*x+b where m is the slope and b is the intercept
    var x_mean = x_values.reduce((a, b) => a + b, 0)/x_values.length;
    var y_mean = y_values.reduce((a, b) => a + b, 0)/y_values.length;
    
    //Equations to solve for slope: 
    var slope = 0, slope_numerator = 0, slope_denominator = 0;
    for(i=0; i<x_values.length; i++){
      slope_numerator += (x_values[i]-x_mean)*(y_values[i]-y_mean);
      slope_denominator += Math.pow((x_values[i]-x_mean),2)
    }
    
    slope = slope_numerator/slope_denominator;
    regressor['slope'] = slope;
    
    //Equation to solve for intercept
    var intercept = y_mean - x_mean*slope;
    regressor['intercept'] = intercept;
  
    
    //Get y_hat, or predicted values of y based on x_values
    //Loop through x_values, and run the elements through the lr equation to get predictions
    var y_hat = [];
    for(i=0; i<x_values.length; i++){
      y_hat.push(x_values[i]*regressor['slope']+regressor['intercept']);
    }
    regressor['y_hat'] = y_hat;
    
    
    //Now to find the r2 score
    var residual_sum_of_squares = 0, total_sum_of_squares = 0, r2 = 0;
    
    for(i=0; i<y_values.length; i++){
        residual_sum_of_squares+= Math.pow((y_hat[i]-y_values[i]),2);
        total_sum_of_squares += Math.pow((y_hat[i]-y_mean),2);
    }
    
    r2 = 1- residual_sum_of_squares/total_sum_of_squares;
    
    //Add to regressor object
    regressor['r2'] = r2;
          
    return regressor;
          
  }


