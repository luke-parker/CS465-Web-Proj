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

    // Fetch the outcomes using an ajax query
    // this could be wrapped in an on select function
    var xhttp = new XMLHttpRequest();

    var selected = $("#select_course option:selected");
    var text = selected.text();
    var sectionId = selected.val();
    var major = text.substr(text.lastIndexOf(" ")+1, text.length);

    // now encoded them for the query
    var sectionIdQuery = "sectionId="+encodeURIComponent(sectionId);
    var majorQuery = "major="+encodeURIComponent(major);

    xhttp.responseType = "json";
    var result;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         console.log(this.responseText);
         result = JSON.parse(this.responseText);

         if (Array.isArray(result) && result.length == 0) {
           fail();
         } else {
           buildOutcomes();
         }
       }
      };

      xhttp.open("GET", "outcomes.php?" + sectionIdQuery + "&" + majorQuery);
      xhttp.send(null);

      function fail() {
          console.log("A CRITICAL ERROR HAS OCCURED!");
      }

      function buildOutcomes() {

      }
});
