<?
spl_autoload_register ('autoload');
function autoload ($className) {
  
  $fileName = $_SERVER['DOCUMENT_ROOT'].'/php/class/'.$className . '.php';
  
	if (file_exists($fileName)) 
			{ 
 				 include_once($fileName);
			} 
  } 
?>