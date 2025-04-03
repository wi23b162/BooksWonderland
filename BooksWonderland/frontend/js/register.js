// js/register.js
$('#registerForm').on('submit', function(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));
    $.ajax({
      url: 'http://localhost:8888/BooksWonderland/BooksWonderland-1/BooksWonderland/backend/logic/register.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        alert(response.message);
        if (response.success) window.location.href = 'login.html';
      }
    });
  });