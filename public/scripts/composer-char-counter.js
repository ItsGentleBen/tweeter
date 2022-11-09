$(document).ready(function() {
  $("textarea").on('input', function() {
    const maxChars = 140;
    const inputChars = $(this).val().length;
    const remainingChars = maxChars - inputChars;
    const charCounter = $(this).parent().find(".counter");

    $(charCounter).text(remainingChars);

    if (remainingChars < 0) {
      charCounter.addClass("over-limit");
    } else {
      charCounter.removeClass("over-limit");
    }
  });
});
