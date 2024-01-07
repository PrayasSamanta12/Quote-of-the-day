//It is used for intant loading of getQuote method whwnever HTML page is loaded
document.addEventListener('DOMContentLoaded', getQuote);

function getQuote() {
    //Fetching of Random Quotes from API
    fetch('https://api.quotable.io/random')
        //The response of the API processed with response.json() which parses the response into json 
        .then(response => response.json())
        //Random Quote is diaplayed using displayQuote method
        .then(data => {
            displayQuote(data);
            console.log(data);
        })
        //If any kind of error occurs during fetching or execution this catch block will execute 
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
}

function displayQuote(quote) {
    const quoteTextElement = document.getElementById('quoteText');
    const quoteAuthorElement = document.getElementById('quoteAuthor');

    quoteTextElement.innerHTML = `"${quote.content}"`;
    quoteAuthorElement.innerHTML = `- ${quote.author}`;
}

//function to fetch a quote by a specific author
function getQuoteByAuthor(author) {
    //Fetching of quotes of that psrticular author
    fetch(`https://api.quotable.io/quotes?author=${author}`)
        .then(response => response.json())
        .then(data => {
            // Display a random quote by the specified author
            //data.result defining the array of quotes and radomindex indicates any random index of the array data.result
            const randomindex = Math.floor(Math.random() * data.results.length);
            const quote = data.results[randomindex];
            displayQuote(quote);
        })
        .catch(error => {
            console.error(`Error fetching quotes by ${author}:`, error);
        });
}

//function to handle the search by author
function searchByAuthor() {
    const authorSearchInput = document.getElementById('authorSearch');
    const authorName = authorSearchInput.value.trim();

    //if the search input is not empty, fetch and display a quote by the specified author
    if (authorName !== '') {
        getQuoteByAuthor(authorName);
    } else {
        //if the search input is empty, fetch and display a random quote
        if (confirm("You have not given any name so random quote will be generated"))
            getQuote();
        else
            return;
    }
}