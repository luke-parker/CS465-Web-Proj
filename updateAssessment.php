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
  $stmt = $conn->prepare("insert into Assessments
                          values (?, ?, ?, ?, ?, ?)
                          on duplicate key update sectionId=?, assessmentDescription=?, weight=?, outcomeId=?, major=?;");

  if (!$stmt) {
    echo $conn->errno . ' ' . $conn->error;
    die("Error preparing query\n");
  }

  // Bind variables
  $stmt->bind_param("iisiisisiis",
            $param_assessmentId, $param_sectionId, $param_assessmentDescription, $param_weight, $param_outcomeId, $param_major,
            $param_sectionIdUpdate, $param_assessmentDescriptionUpdate, $param_weightUpdate, $param_outcomeIdUpdate, $param_majorUpdate);

  // Set paramters
  $param_assessmentId = $_GET['assessmentId'];
  $param_sectionId = $_GET['sectionId'];
  $param_assessmentDescription = $_GET['assessmentDescription'];
  $param_weight = $_GET['weight'];
  $param_outcomeId = $_GET['outcomeId'];
  $param_major = $_GET['major'];
  $param_sectionIdUpdate = $param_sectionId;
  $param_assessmentDescriptionUpdate = $param_assessmentDescription;
  $param_weightUpdate = $param_weight;
  $param_outcomeIdUpdate = $param_outcomeId;
  $param_majorUpdate = $param_major;

  // Execute

  $stmt->execute();

  $stmt->close();
  $conn->close();

?>
