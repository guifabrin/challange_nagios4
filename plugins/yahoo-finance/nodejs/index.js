const yahooFinance = require('yahoo-finance');
var dateFormat = require('dateformat');

const reference = {
    ['-s']: 'symbol',
    ['-w']: 'warning',
    ['-c']: 'critical'
}
const values = {};
for (const arg of process.argv.slice(2)){
    const parameter = arg.slice(0,2);
    const value = arg.slice(2);
    values[reference[parameter]] = value;
}
var yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);
yahooFinance.historical({
  symbol: values.symbol,
  from: dateFormat(new Date, "yyyy-mm-dd"),
  to: dateFormat(new Date(), "yyyy-mm-dd")
}, function (err, quotes) {
    if (err){
        return;
    }
    const objQuoteToday = quotes[0];
    const nVariation = 100-objQuoteToday.open*100/objQuoteToday.close;
    if (nVariation>+values.critical){
        console.log(`CRITICAL - ${values.symbol} vale ${objQuoteToday.close} e variou ${nVariation}% nas últimas 24h`);
        process.exit(2);
    } else if (nVariation>+values.warning){
        console.log(`WARNING - ${values.symbol} vale ${objQuoteToday.close} e variou ${nVariation}% nas últimas 24h`);
        process.exit(1);
    } else {
        console.log(`OK - ${values.symbol} vale ${objQuoteToday.close} e variou ${nVariation}% nas últimas 24h`);
        process.exit(0);
    }
});