document.getElementById("submit").onclick = function() {
    console.log("submitting password");
    var newPassword = document.getElementById("newPassword").value;
    if (document.getElementById("confirmPassword").value != newPassword) {
        document.getElementById("passwordError").style.display = 'block';
    } else {
        sendPasswordReset();
    }
};

function sendPasswordReset(password) {
    var xhttp = new XMLHttpRequest();

    var emailQuery = "email=" + encodeURIComponent($_SESSION["email"]);
    var passwordQuery = "password=" + encodeURIComponent(newPassword);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            document.getElementById("passwordError").style.display = 'none';
            document.getElementById("passwordSucceeded").style.display = 'block';
        }
    }
}
