<?php
class User
{
  public static function all(PDO $pdo): array
  {
    $stmt = $pdo->query("SELECT id, vorname, nachname, email, is_admin, active FROM users");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function setActive(PDO $pdo, int $id, int $status): bool
  {
    $stmt = $pdo->prepare("UPDATE users SET active = ? WHERE id = ?");
    return $stmt->execute([$status, $id]);
  }

  public static function update(PDO $pdo, array $data): bool {
  $stmt = $pdo->prepare("UPDATE users SET vorname = ?, nachname = ?, email = ?, is_admin = ? WHERE id = ?");
  return $stmt->execute([
    $data['vorname'],
    $data['nachname'],
    $data['email'],
    $data['is_admin'],
    $data['id']
  ]);
}

}
