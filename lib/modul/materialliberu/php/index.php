<?
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');
$texturePath = '/resource/texture/';
$materialPath = '/resource/material/';

if ($_GET['action'] === "gettexture"){
	
	$res = TFile::getFileToFloder($texturePath);
	$r = array();
	foreach ($res as $felr){
		$fel = explode('.', $felr);
		if ($fel[1] === 'jpg' || $fel[1] === 'png' || $fel[1] === 'bmp' || $fel[1] === 'tga'){
			array_push($r, array("FILE" => $felr));
		}	
	}
	print_r(json_encode($r));
	return;
}


if ($_GET['action'] === "getmaterial"){
	
	$res1 = TFile::getFileToFloder($materialPath.'/MeshBasicMaterial/');
	$res2= TFile::getFileToFloder($materialPath.'/MeshNormalMaterial/');
	$res3 = TFile::getFileToFloder($materialPath.'/MeshPhongMaterial/');
	$res = array_merge($res1, $res2);
	$r = array_merge($res, $res3);
	$material = array();
	foreach($r as $url){
		$material[] = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].$url));
	}

	print_r(json_encode($material));
	return;
}






if ($_GET['action'] === "savetexture"){

	$materilaoption = array('alphaTest' => 0,	
							'blendDst' => 205,
							'blendEquation' => 100,
							'blendSrc' => 204,
							'blending' =>1,
							'combine' => 0,
							'depthTest' => false,
							'depthWrite' => true,
							'fog' => true,
							'morphTargets' => false,
							'name' => $_GET['n'],
							'opacity' => 1,
							'overdraw' => 0,
							'shading' => 2,
							'side' => 0,
							'skinning' => false,
							'transparent' => false,
							'visible' => true,
							'wireframe' => false);
	$name = TString::translite($_GET['n']);
	$path = $materialPath.$_GET['t'].'/';
	$array = array('NAME' => $_GET['n'],
				   'TYPE' => $_GET['t'], 
				   'IMG' => $_GET['img'],
				   'matrialoptions' => $materilaoption);

	$res = TFile::saveFile($path,$name, json_encode($array),'mat');
	if ($res){
		echo 'ok';
	} else {
		echo json_encode($res);
	}
}
?>