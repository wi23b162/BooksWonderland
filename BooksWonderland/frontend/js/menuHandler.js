$(document).ready(function () {
  $.get('BooksWonderland/backend/logic/menuHandler.php', function (html) {
    $('#nav').html(html); // wichtig: ins HTML einfügen!
  }).fail(function () {
    console.error("Fehler beim Laden des Menüs.");
  });
});
