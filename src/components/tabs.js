const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  // Create the main container div with class 'topics'
  const topic = document.createElement('div');
  topic.classList.add('topics');

  // Iterate through the topics array and create a tab for each element
  topics.forEach((topicItem) => {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.textContent = topicItem;
    topic.appendChild(tab);
  });



  // retuen the main container div
  return topic;
}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `http://localhost:5001/api/topics` (test it with a console.log!).
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //

  //fetch the topics from the api endpoint
  fetch('http://localhost:5001/api/topics')
    .then((response) => response.json())
    .then((data) => {

      // extrace the topics array from the response data
      const topicsArray = data.topics;

      // create the tabs using the Tabs component with the fetched topics
      const tabsMarkup = Tabs(topicsArray);

      // get the dom element that matches the given selector
      const targetElement = document.querySelector(selector);

      // append the tabs to the target element
      targetElement.appendChild(tabsMarkup);
    })

    .catch((error) => {
      console.error('Error feteching topics:', error);
    });

}

export { Tabs, tabsAppender }
