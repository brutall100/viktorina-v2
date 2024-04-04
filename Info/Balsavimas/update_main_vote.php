<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
$user_id = $_SESSION['user_id'] ?? "";

include '../../x_configDB.php'; 

// First SQL query to fetch data from the primary database
$sql = "SELECT x_vote_suggestion.*, COUNT(x_vote.vote_suggest_id) AS yes_vote_count,
               x_vote_main.vote_type
        FROM x_vote_suggestion
        LEFT JOIN x_vote ON x_vote_suggestion.id = x_vote.vote_suggest_id
        LEFT JOIN x_vote_main ON x_vote_suggestion.id = x_vote_main.vote_suggest_id AND x_vote_main.user_id = '$user_id'
        GROUP BY x_vote_suggestion.id
        ORDER BY yes_vote_count DESC, x_vote_suggestion.id DESC
        LIMIT 1";

$result = $conn->query($sql);

$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = array(
            "id" => $row["id"],
            "usname" => $row["usname"],
            "usid" => $row["usid"],
            "suggestion" => $row["suggestion"],
        );
    }
} else {
    $response["error"] = "No votes found.";
}

// Second SQL query to count the occurrences of each vote type from x_vote_main
$sql2 = "SELECT vote_type, COUNT(*) AS vote_count FROM x_vote_main GROUP BY vote_type";
$result2 = $conn->query($sql2);
$response2 = array();

if ($result2->num_rows > 0) {
    while ($row = $result2->fetch_assoc()) {
        $response2[] = array(
            "vote_type" => $row["vote_type"],
            "vote_count" => $row["vote_count"]
        );
    }
} else {
    // Don't set an error message here, as it might interfere with the JSON response
}

// Combine both responses into one JSON object
$json_response = array("votes" => $response, "vote_types" => $response2);

//// If it's a POST request, handle the vote
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['suggestionId']) && isset($_POST['voteType'])) {
        $suggestionId = mysqli_real_escape_string($conn, $_POST['suggestionId']);
        $voteType = mysqli_real_escape_string($conn, $_POST['voteType']);

        // Check if the user has already voted for this suggestion
        $checkSql = "SELECT * FROM x_vote_main WHERE vote_suggest_id = '$suggestionId' AND user_id = '$user_id'";
        $checkResult = $conn->query($checkSql);
        if ($checkResult->num_rows > 0) {
            // Update the existing vote record
            $updateSql = "UPDATE x_vote_main SET vote_type = '$voteType' WHERE vote_suggest_id = '$suggestionId' AND user_id = '$user_id'";
            if(mysqli_query($conn, $updateSql)) {
                echo json_encode(array("success" => true));
            } else {
                echo json_encode(array("success" => false, "error" => "Failed to update vote: " . mysqli_error($conn)));
            }
        } else {
            // Insert a new vote record
            $insertSql = "INSERT INTO x_vote_main (vote_suggest_id, vote_type, user_id) VALUES ('$suggestionId', '$voteType', '$user_id')";
            if(mysqli_query($conn, $insertSql)) {
                echo json_encode(array("success" => true));
            } else {
                echo json_encode(array("success" => false, "error" => "Failed to vote: " . mysqli_error($conn)));
            }
        }
        exit(); // Stop further execution
    } else {
        echo json_encode(array("success" => false, "error" => "Suggestion ID or vote type is missing."));
        exit(); // Stop further execution
    }
}

echo json_encode($json_response);

$conn->close();
?>






