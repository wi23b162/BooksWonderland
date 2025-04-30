
$('#loginForm').on('submit', function(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(this));
  $.ajax({
    url: "http://localhost:8888/BooksWonderland/backend/logic/login.php",
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      alert(response.message);
      if (response.success) {
      }
    }
  });
});
