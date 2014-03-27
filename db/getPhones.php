<?php
require 'connectDB.php';
$query = 'SELECT * FROM phones';
$res = mysql_query ($query);

$mas = array();
while ($var = mysql_fetch_array($res)) {
    $mas[] = $var;
}
echo json_encode ($mas);
?>