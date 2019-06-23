> # Scraper
>## Scraping app using mongoose and 

This app scrapes a website, this program uses clickhole.com, and returns the title and link to each article on the page using mongoose models, and cheerio to find which data will be passed into the mongoose model. Extending the mongoose model functionality, this app also allows the user to attah notes to each article grabbed by cheerio, using a separate model and populate method. All data is persistant only until, with the help of the clear button provided, both the note and post collections are wiped, and you can start anew!

