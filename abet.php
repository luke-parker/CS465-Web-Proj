<?php
    session_start();
    // include "nav.php";
    if (count($_SESSION['courses']) == 0) {
        header("Location: login.html");
        exit;
    }
?>
<!DOCTYPE html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="abet.js"></script>
        <link rel="stylesheet" type="text/css" href="abet.css">
        <title>UTK ABET</title>
    </head>

    <body>
      <?php include "nav.php"; ?>
            <div id="content">
                <div id="results">
                <h1>Results</h1>
                <hr>
                Please enter the number of students who do not meet expectations, meet expectations, and exceed expectations. You can type directly into the boxes--you do not need to use the arrows.
                <div class="outcome_description"></div>

                <table>
                    <tr>
                        <th>Not Meets Expectations</th>
                        <th>Meets Expectations</th>
                        <th>Exceeds Expecations</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td><input class="i" type="number" min="0" placeholder="0" id="notMeetsExpectations"></td>
                        <td><input class="i" type="number" min="0" placeholder="0" id="meetsExpectations"></td>
                        <td><input class="i" type="number" min="0" placeholder="0" id="exceedsExpectations"></td>
                        <td></td>
                    </tr>
                </table>
                <div class="bttn_clear" style="text-align: right">
                    <button class="bttn save" id="saveResults">Save Results</button>
                </div>
                <hr class="b">
                </div>
                <div id="plan">
                    <h1>Assessment Plan</h1>

                    <hr>

                    <ol>
                        <li>Please enter your assessment plan for each outcome. The weights are percentages from 0-100 and the weight should add up to 100%.</li>
                        <li>Always press "Save Assessments" when finished, even if you removed an assessment.
                            The trash can only removes an assessment from this screen--it does not remove it
                            from the database until you press "Save Assessments".
                        </li>
                    </ol>

                    <table id="assessment">
                        <tr class="plan_row">
                            <th>Weight (%)</th>
                            <th>Description</th>
                            <th>Remove</th>
                        </tr>
                        <tr class="plan_row">
                            <td width="5%"><input class="i" type="number" min="0" max="100" placeholder="1"></td>
                            <td width="60%"><textarea class="i txt" maxlength="400" rows="4"></textarea></td>
                            <td width="10%"><button class="trash"><img src="trash.svg" alt="trash"></button></td>
                        </tr>
                    </table>

                    <div class="bttn_clear" style="text-align: left">
                        <button class="bttn new" id="newAssessment">+ New</button>
                    </div>

                    <div class="bttn_clear" style="text-align: right">
                        <button class="bttn save" id="saveAssessments">Save Assessments</button>
                    </div>
                <hr class="b">
                </div>

                <div id="summary"><h1>Narrative Summary</h1><hr>
                <p>Please enter your narrative for each outcome, including the student strengths,
                for the outcome, student weaknesses for the outcome, and suggested actions for
                improving student attainment of each outcome.
                </p><br>
                <b>Strengths:</b><br>
                <textarea class="i txt" placeholder="None" maxlength="2000" id="strengths"></textarea><br>
                <b>Weaknesses:</b><br>
                <textarea class="i txt" placeholder="None" maxlength="2000" id="weaknesses"></textarea><br>
                <b>Actions:</b><br>
                <textarea class="i txt" placeholder="None" maxlength="2000" id="actions"></textarea>

                <div class="bttn_clear" style="text-align: right">
                    <button class="bttn save" id="saveNarrative">Save Narrative</button>
                </div>
                </div>
            </div>
        </div>
    </body>
</html>
