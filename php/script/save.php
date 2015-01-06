<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');

if (isset($_POST['action'])){
	$resp = TWorld::saveTerrain($_POST['string'],$_POST['x'],$_POST['z'],$_POST['name']);
}
?>