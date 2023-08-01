const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //


  // Create the main card container div with class "card"
  const card = document.createElement('div');
  card.classList.add('card');

  // Create the headline div with class "headline" and set its text content
  const headlineDiv = document.createElement('div');
  headlineDiv.classList.add('headline');
  headlineDiv.textContent = article.headline;

  // Create the author container div with class "author"
  const authorDiv = document.createElement('div');
  authorDiv.classList.add('author');

  // Create the image container div with class "img-container"
  const imgContainerDiv = document.createElement('div');
  imgContainerDiv.classList.add('img-container');

  // Create the author image element with the provided authorPhoto as the src attribute
  const authorImage = document.createElement('img');
  authorImage.src = article.authorPhoto;

  // Create the span element to display the author's name
  const authorNameSpan = document.createElement('span');
  authorNameSpan.textContent = `By ${article.authorName}`;

  // Append the elements in the correct hierarchy
  imgContainerDiv.appendChild(authorImage);
  authorDiv.appendChild(imgContainerDiv);
  authorDiv.appendChild(authorNameSpan);
  card.appendChild(headlineDiv);
  card.appendChild(authorDiv);

  // Add a click event listener to the card to log the headline to the console
  card.addEventListener('click', () => {
    console.log(article.headline);
  });

  return card;
};


const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  // Fetch the articles from the API endpoint
  fetch('http://localhost:5001/api/articles')
    .then((response) => response.json())
    .then((data) => {
      // Loop through each topic and its articles
      for (const topic in data.articles) {
        if (Object.hasOwnProperty.call(data.articles, topic)) {
          const articlesArray = data.articles[topic];

          // Create a card for each article and append it to the DOM
          articlesArray.forEach((article) => {
            const card = Card(article);
            const targetElement = document.querySelector(selector);
            targetElement.appendChild(card);
          });
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });
};





export { Card, cardAppender }
