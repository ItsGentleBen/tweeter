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
      $('.tweet-feed').prepend(newTweet);
    }
  }

  createTweetElement = function (tweet) {
    
    const timeAgo = timeago.format(tweet.created_at);

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
        <p>${timeAgo}</p>
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
    $.ajax({
      method: 'GET',
      url: '/tweets',
    })
    .then((data) => {
      renderTweets(data);
    });
  };


  const $form = $('#tweet-form');

  $form.on('submit', (event) => {
    event.preventDefault();
    const tweetData = $form.serialize();
    const tweetText = $('#tweet-text').val()
    
    if (tweetText.length > 140) {
      return alert("Tweet exceeds 140 character limit.")
    };

    if (tweetText === "" || tweetText === null) {
      return alert("Tweet cannot be empty.")
    };
    
   

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetData
    })
    .then(tweetData);
    console.log('tweet', tweetData);


  });

  loadTweets();
});