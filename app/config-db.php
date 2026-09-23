<?php
// Opens the MySQL connection for every PHP page.
// Settings come from app/.env (copy app/.env.example), never from code.

if (!function_exists('viktorina_env')) {
    function viktorina_env(string $key, string $default = ''): string
    {
        static $values = null;
        if ($values === null) {
            $values = [];
            $file = __DIR__ . '/.env';
            if (is_readable($file)) {
                foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
                    $line = trim($line);
                    if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
                        continue;
                    }
                    [$name, $value] = array_map('trim', explode('=', $line, 2));
                    $values[$name] = trim($value, "\"'");
                }
            }
        }
        $fromServer = getenv($key);
        return $fromServer !== false ? $fromServer : ($values[$key] ?? $default);
    }
}

$dbname = viktorina_env('DB_DATABASE', 'viktorina');

$conn = mysqli_connect(
    viktorina_env('DB_HOST', 'localhost'),
    viktorina_env('DB_USER', 'root'),
    viktorina_env('DB_PASSWORD'),
    $dbname,
    (int) viktorina_env('DB_PORT', '3306')
);

if (!$conn) {
    die('Database connection failed. Check app/.env settings.');
}
mysqli_set_charset($conn, 'utf8mb4');
