<?php
class TWorld {

	static function getMap($array){
		$floder = json_decode($array);
		$c = count($floder);
		$files  = array();
		while($c--){
			$tr = TFile::getFileToFloder('/world/'.$floder[$c].'/v/');
			if ($tr != ''){
				foreach($tr as $file){
					if ($file !== ''){
						$fil = $_SERVER['DOCUMENT_ROOT'].$file;
						//die($fil);
						$dat = file_get_contents($fil);
						$data = (array)json_decode($dat);
			
						$URL = $_SERVER['DOCUMENT_ROOT'].$data['option']->materialURL;
						//die($URL);
						$material = (array)json_decode(file_get_contents($URL));
						$terrian =  array('G'=>$data,'M'=>$material);
						$files[$floder[$c]]['T'][] = $terrian;
					}
				}				
			}
		}
		return $files;

	}
	static function _getQuard($x,$z){
		$name = ~~($x / 2000).'='.~~($z / 2000);
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