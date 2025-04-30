$(document).ready(function () {
    $.get('BooksWonderland/backend/logic/menuHandler.php', function (html) {
    }).fail(function() {
      console.error("Fehler beim Laden des Menüs.");
  });
  });
  