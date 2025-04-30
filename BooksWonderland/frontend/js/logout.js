// frontend/js/logout.js
$.get('../backend/logic/logout.php', function(response) {
    if (response.success) {
      alert(response.message);
      window.location.href = 'login.html';
    }
  });
  