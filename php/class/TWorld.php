<?php
class TWorld {

	protected function _getV($floder,$cub){
		$list = array();
			if ($floder != ''){
				foreach($floder as $arfile){
						$file = $arfile['PATH'].$arfile['FILE'];
						$fil = $_SERVER['DOCUMENT_ROOT'].$file;
						$dat = file_get_contents($fil);
						$data = (array)json_decode($dat);
						if (file_exists($_SERVER['DOCUMENT_ROOT']."/world/".$cub."/material/".$arfile['FILE'])){
							$URL = $_SERVER['DOCUMENT_ROOT']."/world/".$cub."/material/".$arfile['FILE'];
						} else {
							$URL = $_SERVER['DOCUMENT_ROOT'].$data['option']->materialURL;
						}
						//echo($URL);
						$material = (array)json_decode(file_get_contents($URL));
						$terrian =  array('G'=>$data,'M'=>$material);
						$list[] = $terrian;
					
				}				
			}
		return $list;
	}
	protected function _getM($floder){
		$list = array();
			if ($floder != ''){
				foreach($floder as $file){
					if ($file !== ''){
						$fil = $_SERVER['DOCUMENT_ROOT'].$file;
						$dat = file_get_contents($fil);
						$ar = (array)json_decode($dat);
						$ar['file'] = explode('.',$file)[0];
						$list[] = $ar;
					}

				}
			}
		return $list;
	}

	static function getMap($array,$ter){
		$floder = json_decode($array);
		$c = count($floder);
		$files  = array();
		while($c--){

			$files[$floder[$c]]['T'] = [];
			$files[$floder[$c]]['M'] = TWorld::_getM( TFile::getFileToFloder('/world/'.$floder[$c].'/m/')  );
			$files[$floder[$c]]['C'] = TWorld::_getM( TFile::getFileToFloder('/world/'.$floder[$c].'/c/')  );
		}

		$floder = json_decode($ter);
		$c = count($floder);
		while($c--){
			$files[$floder[$c]]['T'] = TWorld::_getV( TFile::getFileToFloder('/world/'.$floder[$c].'/v/',true),$floder[$c] );
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

		if (TFile::saveFile('/world/'.$x.'='.$z.'/v/','t-'.$name,$array,'map')){
			echo('true');
		} else {
			echo('false');
		}
	}

	static function Savemodel($array,$x,$z,$n,$file){
		//die($file);
		if (TFile::saveFile($file,'',$array,'model')){
			echo('true');
		} else {
			echo('false');
		}
	}
}


?>