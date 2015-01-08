<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');

if (isset($_POST['action'])){
	$map = TWorld::getMap($_POST['array']);
	print_r(json_encode($map));
}
?>