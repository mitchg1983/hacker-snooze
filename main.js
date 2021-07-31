const header = $(".header-box");

const storyBox = $(".story-box");

$(header).text("Test Header");

const post = $(".post");




const mainList = [];




//Create new post for the user to see/interact with. obj is the storyAPI, idNum is the unique
//story id.
function makePost (obj, idNum) {

    //This div houses all the elements of the post
    const newPost = $('<div class="post">');

    //Assign this post a uniqe id
    $(newPost).attr("id", idNum);

    $(newPost).append($('<div class="info-panel">'));

    //This div houses the story and comment panel.
    const tempStoryPanel = $('<div class="ST_CO-panel">');

        $(tempStoryPanel).append('<div class="story-panel">');
        $(tempStoryPanel).append('<div class="comments-panel">');

    //Add the div, with story & comments, to the post
    $(newPost).append($(tempStoryPanel));

    //I think here, I should add the post to the array,
    //Then use a different function, to add the posts to the display area.
    //This could help with sorting.
    //
    //Add the post to the display area.
    $(storyBox).append(newPost);

} 




