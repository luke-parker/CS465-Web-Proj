        <div id="header">UTK ABET<img src="caret-down-fill.svg" alt="down arrow"><img src="person-fill.svg" alt="person"></div>

        <div id="container">
            <div id="nav">
                <span id="sec">Section:</span><br>

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

                <div class="outcome first"><a href="#">Outcome 2</a></div>
                <div class="outcome"><a href="#">Outcome 3</a></div>
                <div class="outcome"><a href="#">Outcome 5</a></div>
                <div class="outcome"><a href="#">Outcome 6</a></div>
            </div>
