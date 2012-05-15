

var count=0;
	
function Layoutview_0_onclick(e, id) {
	console.log("Layoutview_0_onclick");
	
	var change = $.davinci.getInstance("#Label_0");
	if(id=='Button_0'){
		var txt = (count%2==0) ? "Hello World!!" : "Welcome to DaVinci!!";
		change.text(txt);
		count++;
	}	
}