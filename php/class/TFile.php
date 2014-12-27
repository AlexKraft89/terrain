<?
class TFile {
	static function getFileToFloder($path){
		//die($path);
		$array =array();
		$floder = $_SERVER['DOCUMENT_ROOT'].$path;
		if ($handle = opendir($floder)) {
		    while (false !== ($file = readdir($handle))) { 
		    	if ($file !== '.' && $file !== '..'){
		        	array_push($array, $path.$file);
		    	}
		    }
		    closedir($handle); 
		    return $array;
		}
	}
}
?>

