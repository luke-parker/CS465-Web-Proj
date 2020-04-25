var selectedOutcomeId = 0;
var outcomeMap = {};
var row = `
<tr class="plan_row">
    <td width="5%"><input class="i" type="number" min="0" max="100" placeholder="1"></td>
    <td width="60%"><textarea class="i txt" maxlength="400" rows="4"></textarea></td>
    <td width="10%"><button class="trash"><img src="trash.svg" alt="trash"></button></td>
</tr>
`;

var populateResults = function(outcomeId, major, paramString) {
    var xhttp = new XMLHttpRequest();

    xhttp.addEventListener("load", function() {
        if (this.status === 200) {
            var data = this.response;
            console.log("received good data!");
            console.log(data)

            // Expect back 'description' and 'numberOfStudents'
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].description);
                console.log(data[i].numberOfStudents);

                $(".outcome_description").append("<b>Outcome " + outcomeId + " - " + major + ": </b>");
                $(".outcome_description").append("<span>" + outcomeMap[outcomeId] + "</span>");
            }
        } else {
            console.log("ERROR IN RESULTS QUERY RESPONSE")
        }
    });

    xhttp.responseType = "json";

    xhttp.open("GET", "results.php?" + paramString);
    xhttp.send(null);
};

var populateAssessments = function() {
    var xhttp = new XMLHttpRequest();
};

var populateSummaries = function() {
    var xhttp = new XMLHttpRequest();
};

$(document).ready(function() {
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

        var params = {
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
        var newline = "<div class=\"outcome\"><label>Outcome #</label></div>";
        var firstline = "<div class=\"outcome first\"><label>Outcome #</a></div>"
        if (this.status === 200) {
            var outcome = this.response;

            outcomeMap = [];
            for (var i = 0; i < outcome.length; i++) {
                var t = outcome[i]
                outcomeMap[t.outcomeId] = t.outcomeDescription

                // add top border on the first element
                if (i == 0) {
                    $("#select_course").after(firstline.replace(/#/g, t.outcomeId));
                } else {
                    $(".outcome.first").after(newline.replace(/#/g, t.outcomeId));
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
