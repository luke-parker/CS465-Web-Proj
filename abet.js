var selectedOutcomeId = 0;
var outcomeMap = {};
var params = {};
var assessmentId = 20;
var row = `
<tr class="plan_row">
    <td width="5%"><input class="i" type="number" min="0" max="100" placeholder="1"></td>
    <td width="60%"><textarea class="i txt" maxlength="400" rows="4"></textarea></td>
    <td width="10%"><button class="trash"><img src="trash.svg" alt="trash"></button></td>
</tr>
`;

var populateResults = function(outcomeId, major, paramString) {
    var xhttp = new XMLHttpRequest();
    console.log(paramString)
    xhttp.addEventListener("load", function() {
        if (this.status === 200) {
            var data = this.response;
            $(".outcome_description").empty();
            $(".outcome_description").append("<b>Outcome " + outcomeId + " - " + major + ": </b>");
            $(".outcome_description").append("<span>" + outcomeMap[outcomeId] + "</span>");

            if (data.length == 0) {
                console.log("No data left :(")
                for (var i = 0; i < 3; i++) {
                    $("td input").eq(i).val(0);
                }
            } else {
                // Expect back 'description' and 'numberOfStudents'
                $("td input").eq(0).val(data[0].numberOfStudents);
                $("td input").eq(1).val(data[1].numberOfStudents);
                $("td input").eq(2).val(data[2].numberOfStudents);
            }
            sumResults();
        } else {
            console.log("ERROR IN RESULTS QUERY RESPONSE")
        }
    });

    xhttp.responseType = "json";

    xhttp.open("GET", "results.php?" + paramString);
    xhttp.send(null);
};

var populateAssessments = function(paramString) {
    var xhttp = new XMLHttpRequest();

    xhttp.addEventListener("load", function() {
        if (this.status === 200) {
            var data = this.response;

            // Get assessmentDescription and weight
            for (var i = 0; i < data.length; i++) {
                $("assessment").append(row);
                $(".plan_row:last .i:first").val(data[i].weight);
                $(".plan_row:last .i.txt").val(data[i].assessmentDescription);
            }
        } else {
            console.log("ERROR IN ASSESSMENT QUERY RESPONSE")
        }
    });

    xhttp.responseType = "json";

    xhttp.open("GET", "assessment.php?" + paramString);
    xhttp.send(null);
};

var populateSummaries = function(paramString) {
    var xhttp = new XMLHttpRequest();

    xhttp.addEventListener("load", function() {
        if (this.status === 200) {
            var data = this.response;
            
            if (data == null || data.length == 0) {
                console.log("Wiping out old summaries")
                for (var i = 0; i < 3; i++) {
                    $("#summary textarea").eq(i).empty();
                }
            } else {
                // Get strengths, weaknesses, and actions
                $("#summary textarea").eq(0).val(data.strengths);
                $("#summary textarea").eq(1).val(data.weaknesses);
                $("#summary textarea").eq(2).val(data.actions);
            }
        } else {
            console.log("ERROR IN NARRATIVE QUERY RESPONSE")
        }
    });
    
    xhttp.responseType = "json";
    
    xhttp.open("GET", "narrative.php?" + paramString);
    xhttp.send(null);
};

var sendResults = function(local_params) {
    var xhttp = new XMLHttpRequest();
    var paramString = jQuery.param(local_params);

    xhttp.addEventListener("load", function() {
        if (this.status === 200) {
            console.log("Save successful!")
        } else {
            console.log("ERROR IN SAVING RESULTS!")
        }
    });
        
    xhttp.open("GET", "updateResults.php?" + paramString);
    xhttp.send(null);
};

var saveResults = function() {
    for (var i = 0; i < 3; i++) {
        var local_params = params;
        local_params["performanceLevel"] = i+1;
        local_params["numberOfStudents"] = $("td input").eq(i).val();

        sendResults(local_params);
    }
};

var saveAssessments = function() {
    var local_params = params;
    local_params["assessmentId"] = assessmentId;
    assessmentId++;
    // local_params["assessmentDescription"] = ;
    // local_params["weight"] = ;
    // $(".plan_row:last .i:first").val();
    // $(".plan_row:last .i.txt").val();
    // this is gonna require a for loop and probably that .at() thing
};

var saveNarrative = function() {
    var local_params = params;
    local_params["strengths"] = $("#summary textarea").eq(0).val();
    local_params["weaknesses"] = $("#summary textarea").eq(1).val();
    local_params["actions"] = $("#summary textarea").eq(2).val();

    var paramString = jQuery.param(local_params);
    var xhttp = new XMLHttpRequest();

    xhttp.addEventListener("load", function() {
        if (this.status === 200) {
            console.log("Save successful!")
        } else {
            console.log("ERROR IN SAVING NARRATIVE!")
        }
    });
        
    xhttp.open("GET", "updateNarrative.php?" + paramString);
    xhttp.send(null);
};

var sumResults = function() {
    $("td").eq(3).empty();

    var sum = 0;
    for (var i = 0; i < 3; i++) {
        sum += parseInt($("td input").eq(i).val());
    }
    $("td").eq(3).html(sum);
};

$(document).ready(function() {
    $("#saveResults").click(saveResults);
    $("#saveAssessments").click(saveAssessments);
    $("#saveNarrative").click(saveNarrative);

    $("td input").on("change", sumResults);

    $(".bttn.new").on("click", function() {
        $("#assessment tr:last").after(row);
    });

    $(document).on("click", ".trash", function() {
        $(this).closest(".plan_row").remove();
    });

    // When an outcome is clicked, populate that outcome's information
    $(document).on("click", ".outcome", function() {
        // console.log("Outcome switched to " + $(this).find("label").html());
        var outcomeStr = $(this).find("label").html()
        selectedOutcomeId = parseInt(outcomeStr.substr(outcomeStr.indexOf(" ")+1, outcomeStr.length));

        // Grab outcomeId, sectionId, and major
        var outcomeId = selectedOutcomeId;
        var sectionString = $("#select_course option:selected").text();
        var major = sectionString.substr(sectionString.lastIndexOf(" ")+1, sectionString.length);
        var sectionId = $("#select_course option:selected").val();

        params = {
            "outcomeId":outcomeId,
            "sectionId":sectionId,
            "major":major
        };

        var paramString = jQuery.param(params);

        // Pass the outcome ID to the following Ajax queries.
        populateResults(outcomeId, major, paramString);
        populateAssessments(paramString);
        populateSummaries(paramString);
    });

    var fetchOutcomes = function() {
        var xhttp = new XMLHttpRequest();

        var selected = $("#select_course option:selected");
        var text = selected.text();
        var sectionId = selected.val();
        var major = text.substr(text.lastIndexOf(" ")+1, text.length);

        // now encoded them for the query
        var sectionIdQuery = "sectionId="+encodeURIComponent(sectionId);
        var majorQuery = "major="+encodeURIComponent(major);

        xhttp.addEventListener("load", buildOutcomes);
        xhttp.responseType = "json";

        xhttp.open("GET", "outcomes.php?" + sectionIdQuery + "&" + majorQuery);
        xhttp.send(null);

        // Remove old outcome list, if there are any there
        $(".outcome").remove();
    }

      function buildOutcomes() {
        var newline = "<div class=\"outcome\"><label id=\"outcome_\">Outcome #</label></div>";
        var firstline = "<div class=\"outcome first\"><label id=\"outcome_\">Outcome #</a></div>";
        if (this.status === 200) {
            var outcome = this.response;

            outcomeMap = [];
            for (var i = 0; i < outcome.length; i++) {
                var t = outcome[i]
                outcomeMap[t.outcomeId] = t.outcomeDescription

                // add top border on the first element
                if (i == 0) {
                    var line = firstline.replace(/#/g, t.outcomeId);
                    line = line.replace(/_/g, i);
                    $("#select_course").after(line);
                } else {
                    var line = newline.replace(/#/g, t.outcomeId);
                    line = line.replace(/_/g, i);
                    $(".outcome.first").after(line);
                }
            }

            // var outcomeLabels = document.getElementsByClassName("outcome");
            // for (i = 0; i < outcomeLabels.length; i++) {
            //     outcomeLabels[i].onclick = function() {
            //         console.log("outcome clicked. index: " + i);
            //         // selectedOutcomeId = outcomeLabels[i].text();
            //         console.log("Outcome switched to " + outcomeMap[i]);
            //
            //         // Pass the outcome ID to the following Ajax queries.
            //         // populateResults();
            //         // populateAssessments();
            //         // populateSummaries();
            //     }
            // }

        } else {
            console.log("A CRITICAL ERROR HAS OCCURED!");
        }
      }

    // Fetch the outcomes using an ajax query
    // this could be wrapped in an on select function
    $("#select_course").change(fetchOutcomes).change(function() {
        // populate the zeroth outcome's data
    });
    fetchOutcomes();
});
