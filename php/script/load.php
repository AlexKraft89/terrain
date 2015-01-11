<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: application/json; charset=utf-8");
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');

if (isset($_GET['action'])){
	$map = TWorld::getMap($_GET['array']);
	print_r(json_encode($map));
}
?>