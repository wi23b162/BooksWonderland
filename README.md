# Books Wonderland – Sprint 1

## Inhalte
- Registrierung
- Passwortverschlüsselung
- Login mit Cookie
- Dynamisches Menü (AJAX)
- Admin-User (manuell)
- Frontend mit jQuery, Backend in PHP

## Setup
1. Datenbank anlegen (`bookswonderland`)
2. Tabelle `users` erstellen
3. Projekt lokal unter `localhost:8888` ausführen
4. `dbaccess.php` anpassen (Port 8889)

## Team 05
- AI, JB

## Sprint 1 abgeschlossen

### Features:
- Benutzerregistrierung inkl. Validierung und Passwortverschlüsselung
- Admin-User-Unterstützung
- Login mit Session + optionalem Cookie (Eingeloggt bleiben)
- Logout mit Session- & Cookie-Reset
- Dynamische Navigation via JS

# Books Wonderland – Sprint- und Backlog-Übersicht

## Sprint 1: Benutzerverwaltung (Registrierung, Login, Session)

| BW   | Funktion           | Dateien |
|------|--------------------|---------|
| BW-1 | Registrierung      | `register.html`, `register.js`, `backend/logic/register.php` |
| BW-2 | Login              | `login.html`, `login.js`, `backend/logic/login.php` |
| BW-3 | Session prüfen     | `backend/logic/sessionStatus.php`, `menuHandler.js` |
| BW-4 | Logout             | `backend/logic/logout.php`, `menuHandler.js` |

---

## Sprint 2: Produktübersicht und Warenkorb

| BW    | Funktion                        | Dateien |
|-------|---------------------------------|---------|
| BW-5  | Produktübersicht anzeigen       | `products.html`, `products.js`, `backend/logic/getProducts.php` |
| BW-6  | Produktdetails (Modal)          | `invoice.html`, `invoice.js`, `backend/logic/getInvoice.php` |
| BW-8  | Warenkorb anzeigen              | `cart.html`, `cart.js` |
| BW-9  | Gutschein einlösen              | `gutschein.html`, `gutschein.js`, `backend/logic/checkVoucher.php` |
| BW-10 | Drag & Drop in Warenkorb        | `products.js`, `cart.js` |
| BW-11 | Gutscheinfeld im Warenkorb      | `cart.html`, `cart.js` |
| BW-12 | Versand und Steuern anzeigen    | `cart.js` |

---

## Sprint 3: Checkout, Zahlung, Profilverwaltung, Rechnungen

| BW    | Funktion                            | Dateien |
|-------|-------------------------------------|---------|
| BW-13 | Produktsuche                        | `products.html`, `products.js` |
| BW-14 | Bestellung abschicken               | `checkout.html`, `checkout.js`, `backend/logic/submitOrder.php` |
| BW-15 | Zahlungsmethode wählen              | `payment.html`, `payment.js`, `backend/logic/savePaymentMethod.php` |
| BW-16 | Gutschein im Checkout anwenden      | `checkout.js`, `backend/logic/applyVoucher.php` |
| BW-17 | Bestellhistorie anzeigen            | `invoicelist.html`, `invoicelist.js`, `backend/logic/getInvoices.php` |
| BW-18 | Rechnung anzeigen                    | `invoice.html`, `invoice.js`, `backend/logic/getInvoice.php` |
| BW-19 | Kontodaten bearbeiten               | `profil.html`, `profil.js`, `backend/logic/getProfile.php`, `backend/logic/updateProfile.php` |
| BW-20 | Zahlungsinfo anzeigen/verwalten     | `payment.html`, `backend/logic/getPaymentMethod.php` |


# Books Wonderland – Erklärung aller Backlog Work Items (BW)

## Sprint 1 – Benutzerverwaltung

### BW-1: Registrierung
Der Benutzer kann ein neues Konto anlegen, indem er Vorname, Nachname, Benutzername, E-Mail und Passwort eingibt.  
**Dateien:** `register.html`, `register.js`, `register.php`

### BW-2: Login
Der Benutzer kann sich mit E-Mail oder Benutzername und Passwort einloggen.  
**Dateien:** `login.html`, `login.js`, `login.php`

### BW-3: Session prüfen
Beim Seitenaufruf wird geprüft, ob der Benutzer eingeloggt ist – z. B. für personalisierte Navigation („Hallo, Max“).  
**Dateien:** `sessionStatus.php`, `menuHandler.js`

### BW-4: Logout
Der Benutzer kann sich ausloggen. Dabei wird die Session beendet und Cookies ggf. gelöscht.  
**Dateien:** `logout.php`, `menuHandler.js`


## Sprint 2 – Produktübersicht und Warenkorb

### BW-5: Produktübersicht anzeigen
Alle verfügbaren Bücher werden mit Bild, Titel, Autor, Preis etc. dargestellt.  
**Dateien:** `products.html`, `products.js`, `getProducts.php`

### BW-6: Produktdetails anzeigen
Beim Klick auf „Details“ öffnet sich ein Modal mit detaillierter Beschreibung und weiteren Infos.  
**Dateien:** `products.js`, `invoice.js`, `getInvoice.php`

### BW-8: Warenkorb anzeigen
Nutzer sehen ihren Warenkorb mit Produktname, Menge und Preis. Änderungen sind möglich.  
**Dateien:** `cart.html`, `cart.js`

### BW-9: Gutschein einlösen
Der Nutzer kann einen Gutscheincode eingeben. Der Code wird validiert und gespeichert.  
**Dateien:** `gutschein.js`, `checkVoucher.php`, `applyVoucher.php`

### BW-10: Drag & Drop in den Warenkorb
Produkte lassen sich per Drag & Drop in den Warenkorb ziehen.  
**Dateien:** `products.js`, `cart.js`

### BW-11: Gutschein im Warenkorb anwenden
Im Warenkorb kann ein eingelöster Gutschein sichtbar gemacht und berücksichtigt werden.  
**Dateien:** `cart.html`, `cart.js`

### BW-12: Versand & Steuern anzeigen
Im Warenkorb wird zusätzlich Versand (z. B. 3,90 €) und österreichische Buchsteuer (10 %) angezeigt.  
**Dateien:** `cart.js`


## Sprint 3 – Checkout, Zahlung, Profilverwaltung, Rechnungen

### BW-13: Produktsuche
Benutzer können nach einem Buchtitel oder Autor suchen. Die Produktliste wird live gefiltert.  
**Dateien:** `products.html`, `products.js`

### BW-14: Bestellung abschließen
Mit Klick auf „Zur Kassa“ wird die Bestellung abgeschickt. Daten landen im Backend.  
**Dateien:** `checkout.html`, `checkout.js`, `submitOrder.php`

### BW-15: Zahlungsmethode wählen
Auswahl zwischen Kreditkarte, Rechnung und Sofortüberweisung. Methode wird gespeichert.  
**Dateien:** `payment.html`, `payment.js`, `savePaymentMethod.php`

### BW-16: Gutschein im Checkout verwenden
Gutschein kann beim Checkout berücksichtigt werden. Rabatt wird automatisch angezeigt.  
**Dateien:** `checkout.js`, `applyVoucher.php`

### BW-17: Bestellhistorie anzeigen
Nutzer sehen ihre bisherigen Bestellungen (Rechnungen) in einer Tabelle mit Link zu Details.  
**Dateien:** `invoicelist.html`, `invoicelist.js`, `getInvoices.php`

### BW-18: Rechnung anzeigen
Nach dem Checkout kann der Nutzer die vollständige Rechnung (inkl. Adresse, MwSt, Gutschein) einsehen und drucken.  
**Dateien:** `invoice.html`, `invoice.js`, `getInvoice.php`

### BW-19: Kontodaten bearbeiten
Nutzer können Adresse, Stadt, PLZ, Bundesland etc. im Profil aktualisieren.  
**Dateien:** `profil.html`, `profil.js`, `getProfile.php`, `updateProfile.php`

### BW-20: Zahlungsinfo anzeigen und ändern
Der Nutzer kann seine aktuell gespeicherte Zahlungsmethode anzeigen und ändern.  
**Dateien:** `payment.html`, `getPaymentMethod.php`, `savePaymentMethod.php`
