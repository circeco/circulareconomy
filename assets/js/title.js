$(function() {
  var text = $(".text");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 30) {
      text.removeClass("hidden");
    }if (scroll >= 150) {
      text.addClass("hidden");
    } else {
      text.removeClass("hidden");
    }
  });
});