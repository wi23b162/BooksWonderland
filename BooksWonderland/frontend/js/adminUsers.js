// admin-users.js – nur für Benutzerverwaltung

$(document).ready(function () {
  console.log("✅ adminUsers.js geladen");

  // Benutzer laden
  function loadUsers() {
    $.get("../backend/logic/getUsers.php", function (users) {
      const table = $("#admin-user-table tbody");
      table.empty();
      users.forEach((user) => {
        table.append(`
          <tr>
            <td>${user.id}</td>
            <td>${user.vorname} ${user.nachname}</td>
            <td>${user.email}</td>
            <td>${user.is_admin ? "Admin" : "Benutzer"}</td>
            <td>${user.active ? "Aktiv" : "Deaktiviert"}</td>
            <td>
              <button class="btn btn-sm btn-info edit-user" data-id="${user.id}" data-vorname="${user.vorname}" data-nachname="${user.nachname}" data-email="${user.email}" data-admin="${user.is_admin}">Bearbeiten</button>
            </td>
            <td>
              <button class="btn btn-sm btn-${user.active ? "danger" : "success"} toggle-user" data-id="${user.id}" data-active="${user.active}">
                ${user.active ? "Deaktivieren" : "Aktivieren"}
              </button>
            </td>
          </tr>
        `);
      });
    });
  }

  loadUsers();

  // Modal mit Nutzerdaten füllen
  $("#admin-user-table").on("click", ".edit-user", function () {
    $("#edit-user-id").val($(this).data("id"));
    $("#edit-vorname").val($(this).data("vorname"));
    $("#edit-nachname").val($(this).data("nachname"));
    $("#edit-email").val($(this).data("email"));
    $("#edit-is-admin").val($(this).data("admin"));
    $("#editUserModal").modal("show");
  });

  // Änderungen speichern
  $("#edit-user-form").on("submit", function (e) {
    e.preventDefault();
    const user = {
      id: $("#edit-user-id").val(),
      vorname: $("#edit-vorname").val().trim(),
      nachname: $("#edit-nachname").val().trim(),
      email: $("#edit-email").val().trim(),
      is_admin: $("#edit-is-admin").val()
    };

    $.ajax({
      url: "../backend/logic/updateUser.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function (res) {
        if (res.success) {
          $("#editUserModal").modal("hide");
          loadUsers();
        } else {
          alert("❌ Fehler: " + res.message);
        }
      },
      error: function () {
        alert("❌ Serverfehler beim Speichern");
      }
    });
  });

  // Aktivieren / Deaktivieren
  $("#admin-user-table").on("click", ".toggle-user", function () {
    const userId = $(this).data("id");
    const newStatus = $(this).data("active") ? 0 : 1;

    $.ajax({
      url: "../backend/logic/toggleUser.php",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ id: userId, active: newStatus }),
      success: function (res) {
        if (res.success) {
          loadUsers();
        } else {
          alert("❌ Fehler: " + res.message);
        }
      },
      error: function () {
        alert("❌ Serverfehler beim Ändern des Status");
      }
    });
  });
});
