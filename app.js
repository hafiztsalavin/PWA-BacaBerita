if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
  }

const main = document.querySelector ('main');
//const sourceSelector = document.querySelector('#btn');
//const defaultSource = 'the-washington-post';


/*window.addEventListener('load', async e =>{
    updateNews();
    });*/

async function updateNews() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=bebcf14cc496450bbbd17dd3d8730346`);
    const json = await res.json();

    main.innerHTML = json.articles.map (createArticle).join ('\n');    
}
async function updateNewsUS() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=bebcf14cc496450bbbd17dd3d8730346`);
    const json = await res.json();

    main.innerHTML = json.articles.map (createArticle).join ('\n');    
}

function createArticle (article){
    return `
    <div class = "article">
        <a href = "${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
        </a>
    </div>
    `;
}
// if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('/sw.js')
//     .then(function (){
//         console.log('SW registered');
//     });
