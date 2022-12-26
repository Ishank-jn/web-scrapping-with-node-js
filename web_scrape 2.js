const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");


const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {   // check if response is successful
    const $ = cheerio.load(html);

    // Select all the list items in plainlist class
    const listItems = $(".wikitable ul li");
    // Stores data for all countries
    const countries = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const country = { name: "", iso3: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      country.name = $(el).children("a").text();
      country.iso3 = $(el).children("span").text();
      // Populate countries array with country data
      countries.push(country);
    });
    
    // Logs countries array to the console
    console.dir(countries);
    // Write countries array in countries.json file
    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });

  } else { 
    console.log(error);
  }
});