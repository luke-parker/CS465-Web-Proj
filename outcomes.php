<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("dbs2.eecs.utk.edu", "lxc297", "DYr68U95hn4W9Dp+", "cosc465_lxc297");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// prevents random null strings
$conn->set_charset("utf8");

/* ------------------------------------ */
/* Update this query for each file  */

// Prepare query
$stmt = $conn->prepare("select ores.outcomeId, o.outcomeDescription
                        from OutcomeResults ores natural join Outcomes o
                        where ores.sectionId = ? and ores.major = ?
                        group by outcomeId
                        order by outcomeId;");

if (!$stmt) {
  echo $conn->errno . ' ' . $conn->error;
  die("Error preparing query\n");
}

// Bind variables
$stmt->bind_param("is", $param_sectionId, $param_major);

// Set paramters
$param_sectionId = $_GET['sectionId'];
$param_major = $_GET['major'];

// Execute

$stmt->execute();

// Bind result

$stmt->bind_result($outcomeId, $outcomeDescription);

// Get result

$json = array();

while ($stmt->fetch()) {
  $row['outcomeId'] = strval($outcomeId);
  $row['outcomeDescription'] = $outcomeDescription;

  $json[] = $row;
}

echo json_encode($json, JSON_PRETTY_PRINT);

$stmt->close();
$conn->close();

return $json;
?>
