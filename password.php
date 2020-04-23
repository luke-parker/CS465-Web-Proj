<?php
    session_start();
    // include "nav.php";
?>
<!DOCTYPE html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="password.css">
        <title>UTK ABET</title>
    </head>

    <body>
        <?php include "nav.php"; ?>
        <div id="content">
            <div id="title">
                <h1>Change password</h1>
            </div>
            <div class="info_box">
                <p>Basic Info</p>
                <label for="name"><?php echo "<b>Name:</b> " . $_SESSION["name"]; ?></label>
                <label for="email"><?php echo "<b>Email:</b> " . $_SESSION["email"]; ?></label>
            </div>

            <div class="reset_box">
                <p>Change password</p>
                
            </div>
        </div>
    </div>
    </body>

</html>
