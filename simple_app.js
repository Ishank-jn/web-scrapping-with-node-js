const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('scrape.csv');

// Write Headers
writeStream.write(`Names \n`);

const markup = '<ul class="usernames"><li>janedoe</li><li>maxweber</li><li>greengoblin</li<li>maxweber34</li><li>alpha123</li><li>chrisjones</li><li>amelia</li><li>mrjohn34</li><li>matjoe212</li><li>eliza</li><li>commando007</li></ul>' 
 
const $ = cheerio.load(markup); // Load markup and initialize Cheerio 
 
const usernames = $('.usernames li'); // Get all list items 
 
const usernamesWithDigits = []; 
 
usernames.each((index, el) => { 
	const regex = /\d/; // Search for usernames that contain digits 
	const hasNumber = $(el).text().match(regex); 
	if (hasNumber !== null) { 
		usernamesWithDigits.push(hasNumber.input)
    writeStream.write(`${hasNumber.input} \n`);

	} 
}) 

console.log(usernamesWithDigits) // Log usernames that contain digits to the console.