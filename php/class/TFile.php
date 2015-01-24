<?
class TFile {
	var  $list = array();
	static function floderExist($path){
		$floder = $_SERVER['DOCUMENT_ROOT'].$path;
		if (file_exists($floder)){
			return true;
		} else {
			if(mkdir($floder, 0777, true) && mkdir($floder.'/v/', 0777, true)){
				return true;
			} else {
				return false;
			}
		}
	}
	static function getFileToFloder($path,$ar = false){
		//die($path);
		$array = array();
		$floder = $_SERVER['DOCUMENT_ROOT'].$path;
		//echo($floder);
		if (file_exists($floder)){
			if ($handle = opendir($floder)) {
			    while (false !== ($file = readdir($handle))) { 
			    	if ($file !== '.' && $file !== '..'){
			    		if ($ar === false){
			        		array_push($array, $path.$file);
			        	} else {
			        		array_push($array, array('PATH' => $path, 'FILE' => $file));
			        	}
			    	}
			    }
			    closedir($handle); 
			    return $array;
			}
		}
	}
	static function saveFile($path,$name,$data,$r = 'x'){

		if (!file_exists($_SERVER['DOCUMENT_ROOT'].$path) && $name != '' ){
			mkdir($_SERVER['DOCUMENT_ROOT'].$path, 0777, true);
		}

		if (file_put_contents($_SERVER['DOCUMENT_ROOT'].$path.$name.'.'.$r, $data)){
			return true;
		} else {
			return false;
		}
	}
}
?>

