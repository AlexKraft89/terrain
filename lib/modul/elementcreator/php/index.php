<?
include_once($_SERVER['DOCUMENT_ROOT'].'/php/config.php');
header('Access-Control-Allow-Origin: *');
header("Content-type: application/json; charset=utf-8");
global $list;
function Scan($dir)
{
    if (!preg_match("/\.$/",$dir)){
       if (is_file($dir)){
       		if( substr($dir, -4) === "s.js"){
	       			$pdur =  substr($dir, 0, count($dir) - 5);
	       			if (file_exists($pdur.'j.png')){
	       				global $list;
	       				$lo = strlen($_SERVER['DOCUMENT_ROOT']);
	       				$list[] = substr($pdur,$lo);
	       			}
	       		}
       }
        else {
            $d=opendir("$dir");
            while(false !== ($file = readdir($d)))
                Scan("$dir/$file");
            closedir($d);
        }
    }
}
$File = $_SERVER['DOCUMENT_ROOT'].'/resource/model';
Scan($File);
print_r( json_encode($list) );





?>