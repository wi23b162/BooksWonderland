// js/register.js
$('#registerForm').on('submit', function(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(this));
  $.ajax({
    url: "http://localhost:8888/BooksWonderland/backend/logic/register.php",
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      console.log(response);
      alert(response?.message ?? "Unbekannter Fehler");
      if (response.success) window.location.href = 'login.html';
    }
  });
});