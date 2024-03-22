<?php
include '../../x_configDB.php'; 

$sql = "SELECT * FROM x_vote ORDER BY id DESC LIMIT 12";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<div class="vote-container">'; // Start of vote-container

    while ($row = $result->fetch_assoc()) {
        echo '<div class="vote-entry">';
        echo '<div class="vote-left">'; // Left section
        echo '<p><strong>Vote ID:</strong> ' . $row["id"] . '</p>';
        echo '<p><strong>Username:</strong> ' . $row["usname"] . '</p>';
        echo '<p><strong>User ID:</strong> ' . $row["usid"] . '</p>';
        echo '<p><strong>Suggestion:</strong> ' . $row["suggestion"] . '</p>';
        echo '</div>'; // End of vote-left

        echo '<div class="vote-right">'; // Right section
        // Add buttons for Yes and No
        echo '<div class="vote-buttons">';
        echo '<button class="vote-yes">Yes</button>';
        echo '<button class="vote-no">No</button>';
        echo '</div>'; // End of vote-buttons
        echo '</div>'; // End of vote-right

        echo '</div>'; // End of vote-entry
    }

    echo '</div>'; // End of vote-container
} else {
    echo "No votes found.";
}
$conn->close();
?>


<style>
.vote-container {
    border: 1px solid green;

}

.vote-entry {
    margin-bottom: 10px;
    padding: 5px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: flex; 
    border: 1px solid blue;
    text-wrap: wrap;
}

.vote-left {
    flex: 3;
}

.vote-right {
    flex: 1;
    border: 1px solid black;
    display: flex; 
    justify-content: center; 
    align-items: center; 
}

.vote-entry p {
    text
}

.vote-entry p strong {
    font-weight: bold;
}

.vote-buttons {
    display: flex; 
    flex-direction: column;
    align-items: center; 
    border: 1px solid red;
}

.vote-buttons button {
    margin: .3em 0;
    width: 50px;
}

</style>



