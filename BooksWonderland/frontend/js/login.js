// frontend/js/login.js
$('#loginForm').on('submit', function(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(this));
  $.ajax({
    url: "../backend/logic/login.php",
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      alert(response.message);
      if (response.success) {
        window.location.href = 'index.html';
      }
    }
  });
});