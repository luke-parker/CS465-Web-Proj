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
$stmt = $conn->prepare("insert into OutcomeResults
                        values (?, ?, ?, ?, ?)
                        on duplicate key update numberOfStudents = ?;");

if (!$stmt) {
  echo $conn->errno . ' ' . $conn->error;
  die("Error preparing query\n");
}

// Bind variables
$stmt->bind_param("iisiii", $param_outcomeId, $param_sectionId, $param_major, $param_performanceLevel, $param_numberOfStudents, $param_numStudentsUpdate);

// Set paramters
$param_outcomeId = $_GET['outcomeId'];
$param_sectionId = $_GET['sectionId'];
$param_major = $_GET['major'];
$param_performanceLevel = $_GET['performanceLevel'];
$param_numberOfStudents = $_GET['numberOfStudents'];
$param_numStudentsUpdate = $_GET['numberOfStudents'];

// Execute

$stmt->execute();

$stmt->close();
$conn->close();

 ?>
