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
$stmt = $conn->prepare("DELETE from Assessments
                        WHERE assessmentId = ?;");

if (!$stmt) {
  echo $conn->errno . ' ' . $conn->error;
  die("Error preparing query\n");
}

// Bind variables
$stmt->bind_param("i", $param_assid);

// Set paramters
$param_assid = $_GET['assessmentId'];

// Execute
$stmt->execute();
$stmt->close();
$conn->close();

?>
