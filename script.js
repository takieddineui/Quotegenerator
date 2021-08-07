const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const Loader = document.getElementsByClassName('loader');


let apiquotes=[];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
  
  // Remove Loading Spinner
  function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }

function printquote(){
    loading();
    const quote= apiquotes[Math.floor(Math.random()*apiquotes.length)];
    if (!quote.author) {authorText.textContent="UNKNOWN";}
    else{ authorText.textContent = quote.author;}

    if (quote.text.length >120){quoteText.classList.add('long-quote');}
    else{quoteText.classList.remove('long-quote');}
    quoteText.textContent=quote.text;
    complete();
    
}

async function getquotes(){
    loading();
    const apiurl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiurl);
        apiquotes = await response.json();
        printquote();
    } catch (error) {
        getquotes();
    }

}
//tweet button
function tweetquote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',printquote);

twitterBtn.addEventListener('click', tweetquote);




getquotes();
//complete();
