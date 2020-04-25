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
  $stmt = $conn->prepare("select p.description, o.numberOfStudents
                          from OutcomeResults o
                          natural join PerformanceLevels p
                          where o.outcomeId = ? && o.sectionId = ? && o.major = ?
                          order by p.performanceLevel
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

  $stmt->bind_result($description, $numberOfStudents);

  // Get result

  $json = array();

  while ($stmt->fetch()) {
    $row['description'] = $description;
    $row['numberOfStudents'] = $numberOfStudents;

    $json[] = $row;
  }

  echo json_encode($json, JSON_PRETTY_PRINT);

  $stmt->close();
  $conn->close();

?>
