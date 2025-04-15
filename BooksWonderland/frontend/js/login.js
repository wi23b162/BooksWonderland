// js/login.js
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
        // Wenn Admin: z. B. admin.html, sonst index.html
        // window.location.href = response.isAdmin ? '../admin.html' : '../index.html';
        window.location.href = '../index.html';
      }
    }
  });
});
