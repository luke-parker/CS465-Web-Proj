var row = `
<tr class="plan_row">
    <td width="5%"><input class="i" type="number" min="0" max="100" placeholder="1"></td>
    <td width="60%"><textarea class="i txt" maxlength="400" rows="4"></textarea></td>
    <td width="10%"><button class="trash"><img src="trash.svg" alt="trash"></button></td>
</tr>
`;

$(document).ready(function() {
    $(".bttn.new").on("click", function() {
        $("#assessment tr:last").after(row);
    });

    $(document).on("click", ".trash", function() {
        $(this).closest(".plan_row").remove();
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
        var newline = "<div class=\"outcome\"><a href=\"#\">Outcome ##</a></div>";
        var firstline = "<div class=\"outcome first\"><a href=\"#\">Outcome ##</a></div>"
        if (this.status === 200) {
            var outcome = this.response;

            for (var i = outcome.length-1; i >= 0; i--) {
                var t = outcome[i]

                // add top border on the first element
                if (i == outcome.length-1) {
                    $("#select_course").after(firstline.replace("##", t.outcomeId));
                } else {
                    $("#select_course").after(newline.replace("##", t.outcomeId));
                }
            }
        } else {
            console.log("A CRITICAL ERROR HAS OCCURED!");
        }
      }

    // Fetch the outcomes using an ajax query
    // this could be wrapped in an on select function
    $("#select_course").change(fetchOutcomes);
    fetchOutcomes();
});
