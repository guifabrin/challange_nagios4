<?php
require "vendor/autoload.php";
use Scheb\YahooFinanceApi\ApiClient;
use Scheb\YahooFinanceApi\ApiClientFactory;
use GuzzleHttp\Client;

// Create a new client from the factory
$client = ApiClientFactory::createApiClient();
$reference = [
    "-s" => "symbol",
    "-w" => "warning",
    "-c" => "critical"
];
$values = [];
for ($i=1; $i < $argc; $i++) {
    $parameter = substr($argv[$i], 0,2);
    $value = substr($argv[$i], 2);
    $values[$reference[$parameter]] = $value;
}

$symbol = $values["symbol"];
$quotes = $client->getHistoricalQuoteData(
    $symbol,
    ApiClient::INTERVAL_1_DAY,
    new \DateTime("today"),
    new \DateTime("today")
);

$objQuoteToday = $quotes[0];
$close = $objQuoteToday->getClose();
$nVariation = 100-$objQuoteToday->getOpen()*100/$close;
if ($nVariation>1*$values["critical"]){
    echo "CRITICAL - $symbol vale $close e variou $nVariation% nas últimas 24h\n";
    exit(2);
} else if ($nVariation>1*$values["warning"]){
    echo "WARNING - $symbol vale $close e variou $nVariation% nas últimas 24h\n";
    exit(1);
} else {
    echo "OK - $symbol vale $close e variou $nVariation% nas últimas 24h\n";
    exit(0);
}