<?php
include '../../x_configDB.php'; 

$sql = "SELECT * FROM old_qna ORDER BY id DESC LIMIT 20";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table border='1'>
            <tr>
                <th>id</th>
                <th>Klausimas</th>
                <th>Atsakymas</th>
            </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>".$row["old_id"]."</td>
                <td>".$row["old_question"]."</td>
                <td>".$row["old_answer"]."</td>
            </tr>";
    }
    echo "</table>";
} else {
    echo "No data found.";
}

$conn->close();
?>
