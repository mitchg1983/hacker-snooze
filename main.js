//declare JQuery DOM elements

const header = $(".header-box");

$(header).text("Test Header");

const storyBox = $(".story-box");

const post = $(".post");

let bestStories = [];

//fetch the bets stories on hackernews, should return an array
fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
  // Run the following after receiving a response from the API
  .then(function (rawData) {
    return rawData.json();
  })

  // Run the following after parsing the data form the response
  .then(function (data) {
    bestStories = data;


    //Only list the top 100 stories currently
    for (let i = 1; i <= bestStories.length; i++) {
      if (i <= 100) {
        populateMainList(i);
      }
    }
  });

//fetches each story in the topstories array, by their unique ID, and passes it to the
//makePost function which will display the info to the user
function populateMainList(storyId) {
  fetch(
    "https://hacker-news.firebaseio.com/v0/item/" +
      storyId +
      ".json?print=pretty"
  )
    .then(function (rawData) {
      return rawData.json();
    })

    .then(function (data) {
      // console.log(data);
      makePost(data);
    });
}

//Create new post for the user to see/interact with.
//data is s specific story here, fetched from the /item/ folder
function makePost(data) {
  if (data.type === "story") {
    //This div houses all the elements of the post
    const newPost = $('<li class="post">');

    //Assign this post a uniqe id
    $(newPost).attr("id", data.id);

    //This div houses the story and comment panel.
    const tempStoryPanel = $('<div class="ST_CO-panel">');

    //info panel will house hide, go to comments, score, etc...
    const storyInfoPanel = $('<div class="info-panel">');

    //Get the score of the story
    const storyScore = data.score;


    //Display that score to the user
    $(storyInfoPanel).html(storyScore + "points" + " <br/> " + "(click to hide)");

    $(storyInfoPanel).on("click", function () {

      $(newPost).addClass("hide-me");

      setTimeout(function () {
        $(newPost).addClass("hide-me-forever")
      }, 400);

    });

    //Add this panel to the story
    $(tempStoryPanel).append(storyInfoPanel);
    $(newPost).append($(storyInfoPanel));

    //will be text of story title, click to go to page
    const storyPanel = $('<div class="story-panel">');
    const storyName = data.title;


    //trim long story titles for mobile?
    if (storyName.length > 64) {
      console.log(newPost, "has a long title.");
    }

    $(storyPanel).text(storyName);


    //will open the news story in a tab on the user's browser, and shift focus to it
    $(storyPanel).on("click", function () {
      const storyURL = data.url;

      window.open(storyURL);

      
    });

    //Why do some of these use camelCase? Should be consistent.
    $(storyPanel).mouseover(function (){

      $(storyPanel).removeClass("hover-away");
      $(storyPanel).addClass("hover-big");

    })

    $(storyPanel).mouseout(function (){

      $(storyPanel).removeClass("hover-big");
      $(storyPanel).addClass("hover-away");

    })

    $(tempStoryPanel).append(storyPanel);

    //user who posted the story, comments # and click to view
    const commentsPanel = $('<div class="comments-panel cursor">');
    const userName = data.by;

    //the deful number of comments for a story is zero
    let storyComments = 0;

    //if there are any comments on the story, change the $ of commentes to match the total number
    if (data.kids != undefined) {
      storyComments = data.kids.length;


      //Will open a window with the story's comments
      $(commentsPanel).on("click", function (event) {
        const commentWindow = window.open(
          "",
          "commentWindow",
          "width=400, height=200"
        );

        const commentList = data.kids;

        for (const comment of commentList) {

          //'comment' here is actually the uniqueId of the the comment
          fetch(
            "https://hacker-news.firebaseio.com/v0/item/" +
              comment +
              ".json?print=pretty"
          )
            .then(function (rawData) {
              return rawData.json();
            })

            .then(function (comment) {
              commentWindow.document.write(comment.text);
              commentWindow.document.write("<br>");
              commentWindow.document.write("from:" + comment.by);
              commentWindow.document.write("<br>");
              commentWindow.document.write("time:" + comment.time);
              commentWindow.document.write("<br>");
              commentWindow.document.write("<br>");
            });
        }


      });
    }

    const commentClick = "submitted by:" + userName + "  -  " + storyComments + " comments";

    $(commentsPanel).mouseover(function (){

      $(commentsPanel).removeClass("comment-hover-away");
      $(commentsPanel).addClass("comment-hover");

    })

    $(commentsPanel).mouseout(function (){

      $(commentsPanel).removeClass("comment-hover");
      $(commentsPanel).addClass("comment-hover-away");


    })


    $(commentsPanel).text(
      commentClick
    );

    $(tempStoryPanel).append($(commentsPanel));

    //Add the div, with story & comments, to the post
    $(newPost).append($(tempStoryPanel));

    //Add the post to the display area.
    $(storyBox).append(newPost);
  } else {
    return;
  }
}

