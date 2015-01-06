<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');

if (isset($_POST['action'])){
	TWorld::getMap($_POST['array']);
}
?>