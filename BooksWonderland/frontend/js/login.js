$('#loginForm').on('submit', function (e) {
  e.preventDefault();

  const $button = $(this).find('button[type="submit"]');
  $button.prop('disabled', true);

  const formData = Object.fromEntries(new FormData(this));

  $.ajax({
    url: "../backend/logic/login.php",
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(formData),
    success: function (response) {
      console.log("Antwort vom Server:", response);
      alert(response.message);
      if (response.success) {
        window.location.href = 'index.html';
      } else {
        $button.prop('disabled', false);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Fehler beim Login:", textStatus, errorThrown);
      console.error("Antwort vom Server:", jqXHR.responseText);
      alert("Ein Fehler ist aufgetreten.");
      $button.prop('disabled', false);
    }
  });
});
