/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets){
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').append(newTweet);
    }
  }

  createTweetElement = function (tweet) {

    const $tweet = $(`
      <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}">
          <span>${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p class="contents">${tweet.content.text}</p>
      <footer>
        <p>${tweet.created_at}</p>
        <div class="action-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
      </div>
      </footer>
    </article>`);

    return ($tweet);
  };

  loadTweets = function () {

  };


  const $form = $('#tweet-form');

  $form.on('submit', (event) => {
    event.preventDefault();

    const tweetData = $form.serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetData
    })
    .then(tweetData);
    console.log('tweet', tweetData);

  });

  // Test / driver code (temporary). Eventually will get this from the server.
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  // renderTweets(data);
});