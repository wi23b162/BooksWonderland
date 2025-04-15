$(document).ready(function () {
    $.get('../backend/logic/menuHandler.php', function (html) {
      $('#nav').html(html);
    });
  });
  