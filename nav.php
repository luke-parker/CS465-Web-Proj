        <div id="header">UTK ABET
            <div class="dropdown" id="userMenu">
              <img src="caret-down-fill.svg" alt="down arrow"><img src="person-fill.svg" alt="person">
              <div class="dropdown-content">
                <a href="password.php" id="changePassword">Change password</a>
                <a href="login.html id="logout"">Logout</a>
              </div>
            </div>
        </div>

        <div id="container">
            <div id="nav">
                <span id="sectionMenu">Section:</span><br>

                <select id="select_course">
                    <?php
                        // First, build the string up
                        for ($i = 0; $i < count($_SESSION['courses']); $i++) {
                            $row = $_SESSION['courses'][$i];
                            $str = $row['courseId'] . " " . $row['semester'] . " " . $row['year'] . " " . $row['major'];
                            echo("<option value=\"" . $row['sectionId'] . "\">" . $str . "</option>");
                        }
                    ?>
                </select>
            </div>
