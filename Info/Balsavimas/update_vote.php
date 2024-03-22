<?php
include '../../x_configDB.php'; 

$sql = "SELECT * FROM x_vote ORDER BY id DESC LIMIT 12";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Vote ID: " . $row["id"]. " - Username: " . $row["usname"]. " - User ID: " . $row["usid"]. " - Suggestion: " . $row["suggestion"]. "<br>";
    }
} else {
    echo "No votes found.";
}

$conn->close();
?>
<style>

</style>


<!-- "<tr>
                <td>".$row["old_id"]."</td>
                <td>".$row["old_question"]."</td>
                <td>".$row["old_answer"]."</td>
            </tr>"; -->







<!-- 
            if ($result->num_rows > 0) {
    echo "<table>
            <tr>
                <th>id</th>
                <th>Balsuojam?</th>
                <th>Autorius</th>
            </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>";
    }
    echo "</table>";
} else {
    echo "No data found.";
} -->