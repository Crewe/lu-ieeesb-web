<?php echo '<?xml version="1.0" encoding="utf-8"?>' ."\n"; ?>
<!DOCTYPE html 
	PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>
		Blip.fm/CBC Radio 3 servlet
	</title>
</head>

<body>
	<div>
<?php
	$listXml = file_get_contents('http://gdxrt.meteor.cbcradio3.com/playlist.xml');
	
	$listParser = xml_parser_create();
	xml_parser_set_option($listParser, XML_OPTION_CASE_FOLDING, 0);
	if (!xml_set_element_handler($listParser, 'startListElm', 'endElmDummy'))
		die("Failed to set XML handler.\n");
	if (!xml_parse($listParser, $listXml, true))
		echo("Failed to parse XML.\n");
	if (!xml_parser_free($listParser))
		echo("Failed to free XML parser.\n");
		
		
	function startListElm($parser, $name, $attribs)
	{
		if ($name == 'item')
		{
			if ($attribs['type'] == 'Song')
			{
				$trackUrl = 'http://radio3.cbc.ca/services/MusicWebService.asmx/GetPlaylist?permalink='.
					$attribs['permalink'];
					
				$trackXml = file_get_contents($trackUrl);
				
				$trackParser = xml_parser_create();
				xml_parser_set_option($trackParser, XML_OPTION_CASE_FOLDING, 0);
				if (!xml_set_element_handler($trackParser, 'startTrackElm', 'endElmDummy'))
					die("Failed to set XML handler.\n");
				if (!xml_parse($trackParser, $trackXml, true))
					echo "Failed to parse XML.\n";
				if (!xml_parser_free($trackParser))
					echo("Failed to free XML parser.\n");
			}
		}
	}
	
	function startTrackElm($parser, $name, $attribs)
	{
		if ($name == 'playlistitem')
		{
			echo '<a href="'.$attribs['audioUrl'].'">'.
				$attribs['band'].' - '.$attribs['song'].
				' ('.getTimeString($attribs['length']).') '.
				'-> '.$attribs['infoLink'].
				"</a><br/>\n";
		}
	}
	
	function endElmDummy($parser, $name) {
	}
	
	function getTimeString($seconds)
	{
		return sprintf('%d:%02d', $seconds / 60, $seconds % 60);
	}
?>
	</div>
</body>
</html>
