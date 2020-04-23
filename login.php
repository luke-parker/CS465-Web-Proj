<?php
  session_start();

  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  $conn = new mysqli("dbs2.eecs.utk.edu", "lxc297", "DYr68U95hn4W9Dp+", "cosc465_lxc297");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  /* ------------------------------------ */
  /* Update this query for each file  */

  // Prepare query
  $stmt = $conn->prepare("select i.instructorId, s.sectionId, c.courseId, c.major, c.semester, c.year
            from Instructors i
            natural join Sections s
            natural join CourseOutcomeMapping c
            where i.email = ? && i.password = PASSWORD(?)
            group by s.sectionId, c.courseId, c.major, c.semester, c.year
            order by
                c.year DESC,
                c.semester ASC
            ;");

  if (!$stmt) {
    echo $conn->errno . ' ' . $conn->error;
    die("Error preparing query\n");
  }

  // Bind variables
  $stmt->bind_param("ss", $email, $password);

  // Set paramters
  $email = $_GET['email'];
  $password = $_GET['password'];

  // Execute

  $stmt->execute();

  // Bind result

  $stmt->bind_result($instructorId, $sectionId, $courseId, $major, $semester, $year);

  // Get result

  $json = array();

  while ($stmt->fetch()) {
    $row['instructorId'] = $instructorId;
    $row['sectionId'] = $sectionId;
    $row['courseId'] = $courseId;
    $row['major'] = $major;
    $row['semester'] = $semester;
    $row['year'] = $year;

    $json[] = $row;
  }

  $_SESSION['courses'] = $json;

  echo json_encode($json, JSON_PRETTY_PRINT);

  $stmt->close();
  $conn->close();

?>
