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
$stmt = $conn->prepare("insert into Narratives
                        values (?, ?, ?, ?, ?, ?)
                        on duplicate key update strengths=?, weaknesses=?, actions=?;");

if (!$stmt) {
  echo $conn->errno . ' ' . $conn->error;
  die("Error preparing query\n");
}

// Bind variables
$stmt->bind_param("isissssss", $param_sectionId, $param_major, $param_outcomeId, $param_strengths, $param_weaknesses, $param_actions,
                            $param_strengthsUpdate, $param_weaknessesUpdate, $param_actionsUpdate);

// Set paramters
$param_outcomeId = $_GET['outcomeId'];
$param_sectionId = $_GET['sectionId'];
$param_major = $_GET['major'];
$param_strengths = $_GET['strengths'];
$param_weaknesses = $_GET['weaknesses'];
$param_actions = $_GET['actions'];
$param_strengthsUpdate = $param_strengths;
$param_weaknessesUpdate = $param_weaknesses;
$param_actionsUpdate = $param_actions;

// Execute

$stmt->execute();

$stmt->close();
$conn->close();

 ?>
