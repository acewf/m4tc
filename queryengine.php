<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
include('class.base32.php5');
//header('Access-Control-Allow-Origin: http://www.passatemponatalprize.com/');
//header('Access-Control-Allow-Origin: http://passatemponatalprize.com/');
header('Access-Control-Allow-Methods: POST');
// Create connection
$con=mysqli_connect('hostingmysql50.amen.pt',"PM260_prize","prize_pixelkiller","pixelkiller_net_prize");
//$con=mysqli_connect('127.0.0.1:3306',"root","","prizesonea");
$email=$_POST["email"];
$b = new Base32;
$b->setCharset(Base32::csSafe);
// Check connection
if (mysqli_connect_errno($con))
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
	/*mysql_select_db("pixelkiller_net_prize");*/
	$valueQuery = "INSERT INTO newslettermftc (  email) VALUES (  '$email')";
	$return = mysqli_query($con,$valueQuery);


	if ($return==0) {		
		echo "Email já existe na base de dados";
	} else {
		echo "Email Registado";
	}
}
?>