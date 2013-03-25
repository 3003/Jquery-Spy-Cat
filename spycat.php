<?PHP 
//start or resume session
session_start();

//connect to database
mysql_connect("localhost", "root", "") or die(mysql_error());
mysql_select_db("testing") or die(mysql_error());
	
//define vars
$ip = mysql_real_escape_string(htmlentities($_SERVER['REMOTE_ADDR']));
$pmove = mysql_real_escape_string($_POST['move']);
$pscroll = mysql_real_escape_string($_POST['scroll']);
$pclick = mysql_real_escape_string($_POST['click']);
$pwindow = mysql_real_escape_string($_POST['window']);
	
//click update check to only update when content changes
if(!isset($_SESSION['click_update_check'])){
	$_SESSION['click_update_check'] = "";
}
	
//add clicker ID to clickers
if(!isset($_SESSION['clicker_id'])){
	$sql = "INSERT INTO clickers (clicker_ip, clicker_dox) VALUES ('$ip','')";
	mysql_query($sql);
	$_SESSION['clicker_id'] = mysql_insert_id();
}

// if first moves		
if(count(explode(",", $pmove)) <= 4){	
	$sql = "INSERT INTO clicks 
			(click_move, click_scroll, click_click, click_viewport, click_clicker_id) 
			VALUES 
			('".$pmove."', '".$pscroll."', '".$pclick."', '".$pwindow"', '".$_SESSION['clicker_id']."')";
	mysql_query($sql);
	$_SESSION['click_id'] = mysql_insert_id();
} else {
	//check if need to update
	if ($_SESSION['click_update_check'] !== $pmove.$pscroll.$pclick){
		$sql = "UPDATE clicks SET click_move = '".$pmove."', click_scroll = '".$pscroll."', click_click = '".$pclick."' WHERE click_id = ".$_SESSION['click_id'];
		mysql_query($sql);
		$_SESSION['click_update_check'] = $pmove.$pscroll.$pclick;
	}
}
?>