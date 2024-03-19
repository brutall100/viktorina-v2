<?php
include '../../x_configDB.php'; 

$sql = "SELECT * FROM old_qna ORDER BY id DESC LIMIT 12";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>
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
<style>
    table {
        border-collapse: collapse;
        background-color: rgba(255, 255, 255, 0.5); 
        border-radius: 10px; 
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom:1px solid white;
       
    }

    td:first-child,
    td:last-child {
        border-bottom: none; 
    }
    th {
        background-color: rgba(255, 255, 255, 0.7); 
        text-align: center;
    }
    th:first-child{
        border-radius: 10px 0 0 0;
    }
    th:last-child {
        border-radius: 0 10px 0 0;
    }
    
    td{
        padding-top: 1em;
    }

</style>




