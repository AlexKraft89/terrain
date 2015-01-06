<?php
class TWorld {

	static function getMap($array){
		$floder = json_decode($array);
		$c = count($floder);
		$files  = array();
		while($c--){
			$files[$floder[$c]]['T'] = TFile::getFileToFloder('/world/'.$floder[$c].'/v');
		}
		print_r($files);
		exit();
	}
	static function _getQuard($x,$z){
		$name = ~~($x / 1000).'='.~~($z / 1000);
		$flodername =  '/world/'.$name;
	    if (TFile::floderExist($flodername)){
	    	return $name;
	    } else {
	    	return false;
	    }

	}
	static function saveTerrain($array,$x,$z,$n){
		$name = TString::translite($n);
		$nameFloder = TWorld::_getQuard($x,$z);
		if (!$nameFloder){
			die('not floder or not ctreat');
		}

		if (TFile::saveFile('/world/'.$nameFloder.'/v/','t-'.$name.'-'.$x.'-'.$z,$array,'map')){
			echo('true');
		} else {
			echo('false');
		}
	}
}


?>