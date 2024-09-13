// const apiKey ='0c2a4594654f48449d5c2970826eb543'
// const blogContainer = document.getElementById("blog-container")
// const searchField = document.getElementById('search-input')
// const searchButton = document.getElementById('search-button')

// async function fecthRandomNews (){
//   try{
//     const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
//     const response = await fetch(apiUrl)

//     const data = await response.json();
//     // console.log(data)
//     return data.articles;

//   } catch(error){
//     console.error("Error fetching random news", error)
//     return[]

//   }
// }

// searchButton.addEventListener("click", async ()=>{
//   const query = searchField.value.trim()

//   if(query !==""){
//     try{
//       const articles = await fecthNewsQuery(query)
//       displayBlog(articles)

//     }catch(error){
//       console.log("Error fetching  news by query", error)

//     }
//   }
// })

// async function fecthNewsQuery(query){
//   try{
//     const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
//     const response = await fetch(apiUrl)

//     const data = await response.json();
//     // console.log(data)
//     return data.articles;

//   } catch(error){
//     console.error("Error fetching random news", error)
//     return[]

//   }

// }

// function displayBlog(articles){
//   blogContainer.innerHTML =""
//   articles.forEach((articles) => {
//     const blogCard = document.createElement("div")
//     blogCard.classList.add("blog-card")
//     const img = document.createElement("img")
//     img.src = articles.urlToImage
//     img.alt = articles.title
//     const title = document.createElement("h2")
//     const truncatedTitle = articles.title.length >30? 
//     articles.title.slice(0,30) +"...":articles.title
//     title.textContent = truncatedTitle;
//     const description = document.createElement("p")

//     // const truncatedDes = articles.description.length > 120? 
//     // articles.description.slice(0, 120) +"..." : articles.description
//     // title.textContent = truncatedDes;
//     // description.textContent = truncatedDes;

//     blogCard.appendChild(img);
//     blogCard.appendChild(title);
//     blogCard.appendChild(description);
//     blogCard.addEventListener("click", ()=>{
//       window.open(articles.url, "_blank")
//     });
//     blogContainer.appendChild(blogCard);
    
//   });

// }

// (async ()=>{
//   try{
//     const articles = await fecthRandomNews()
//     displayBlog(articles);

//   }catch(error){
//     console.log("Error fetching random news",error)

//   }
// })();
NEWS_API_KEY = '0c2a4594654f48449d5c2970826eb543'
const apiKey = NEWS_API_KEY; // Use environment variables for security
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetch random news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {  // Check if response is OK
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.articles || [];  // Handle possible undefined data

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

// Fetch news based on search query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {  // Check if response is OK
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.articles || [];  // Handle possible undefined data

    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

// Display blog articles
function displayBlog(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? 
            article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        description.textContent = article.description || "No description available.";

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

// Event listener for search button
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlog(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

// Fetch and display random news on page load
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error) {
        console.log("Error fetching random news", error);
    }
})();
