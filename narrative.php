<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("dbs2.eecs.utk.edu", "lxc297", "DYr68U95hn4W9Dp+", "cosc465_lxc297");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

/* ------------------------------------ */
/* Update this query for each file  */

// Prepare query
$stmt = $conn->prepare("select n.strengths, n.weaknesses, n.actions
                        from OutcomeResults o
                        natural join Narratives n
                        where o.outcomeId = ? && o.sectionId = ? && o.major = ?
                        group by n.strengths
                        ;");

if (!$stmt) {
  echo $conn->errno . ' ' . $conn->error;
  die("Error preparing query\n");
}

// Bind variables
$stmt->bind_param("iis", $param_outcomeId, $param_sectionId, $param_major);

// Set paramters
$param_outcomeId = $_GET['outcomeId'];
$param_sectionId = $_GET['sectionId'];
$param_major = $_GET['major'];

// Execute

$stmt->execute();

// Bind result

$stmt->bind_result($strengths, $weaknesses, $actions);

// Get result

$json = array();

while ($stmt->fetch()) {
  $row['strengths'] = $strengths;
  $row['weaknesses'] = $weaknesses;
  $row['actions'] = $actions;

  $json[] = $row;
}

echo json_encode($json, JSON_PRETTY_PRINT);

$stmt->close();
$conn->close();

 ?>
