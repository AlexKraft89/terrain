<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');

if (isset($_POST['action'])){
	if ($_POST['action'] == "SaveTerrain"){
		$resp = TWorld::saveTerrain($_POST['string'],$_POST['x'],$_POST['z'],$_POST['name']);
	}
	if ($_POST['action'] == "Savemodel"){ 
		$resp = TWorld::Savemodel($_POST['string'],$_POST['x'],$_POST['z'],$_POST['name'],$_POST['file']);
	}
}
?>