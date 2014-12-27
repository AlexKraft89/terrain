<?
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');
$material = '/resource/texture/';
$res = TFile::getFileToFloder($material);
$r = array();
foreach ($res as $felr){
	$fel = explode('.', $felr);
	if ($fel[1] === 'jpg' || $fel[1] === 'png' || $fel[1] === 'bmp' || $fel[1] === 'tga'){
		array_push($r, array("FILE" => $felr));
	}	
}
print_r(json_encode($r));
?>