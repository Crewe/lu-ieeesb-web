var map = null;

function initialize()
{
	if (!google.maps.BrowserIsCompatible())
		alert("Incompatible browser.");
	else
	{
		alert("Compatible browser.");
		map = new google.maps.Map2(document.getElementById("div-map"));
	}
}

function uninitialize()
{
	alert("teardown");
	google.maps.Unload();
}

google.load("maps", "2.x", {"other_params": "sensor=false"});
google.setOnLoadCallback(initialize);
