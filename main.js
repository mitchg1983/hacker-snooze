//declare JQuery DOM elements

const header = $(".header-box");

$(header).text("Test Header");

const storyBox = $(".story-box");

const post = $(".post");




//fetch the bets stories on hackernews, should return an array
fetch("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty")


  // Run the following after receiving a response from the API
  .then(function (rawData) {
    return rawData.json();})


  // Run the following after parsing the data form the response
  .then(function (data) {

    for (let i = 1; i <= data.length; i++) {

      if (i <= 30) {
              populateMainList(i);
      }}})



//fetches each story in the topstories array, by their unique ID, and passes it to the
//nakePost function which will display the info to the user
function populateMainList(storyId) {


  fetch("https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json?print=pretty")

    .then(function (rawData) {
      return rawData.json();
    })

    .then(function (data) {
      makePost(data);
    })}




//Create new post for the user to see/interact with.
//data is s specific story here, fetched from the /item/ folder
function makePost(data) {


  if (data.type === "story") {


    //This div houses all the elements of the post
    const newPost = $('<div class="post">');


    //Assign this post a uniqe id
    $(newPost).attr("id", data.id);


    //This div houses the story and comment panel.
    const tempStoryPanel = $('<div class="ST_CO-panel">');


    //info panel will house hide, go to comments, score, etc...
    const storyInfoPanel = $('<div class="info-panel">');


    //Get the score of the story
    const storyScore = data.score;

    //Display that score to the user
    $(storyInfoPanel).text(storyScore);


    //Add this panel to the story
    $(tempStoryPanel).append(storyInfoPanel);
    $(newPost).append($(storyInfoPanel));


    //will be text of story title, click to go to page
    const storyPanel = $('<div class="story-panel">');
    const storyName = data.title;
    $(storyPanel).text(storyName);
    $(tempStoryPanel).append(storyPanel);


    //user who posted the story, comments # and click to view


    //Add the div, with story & comments, to the post
    $(newPost).append($(tempStoryPanel));


    //Add the post to the display area.
    $(storyBox).append(newPost);
  } else {
    return}}