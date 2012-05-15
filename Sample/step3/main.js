
var count=0;	
//--layvMain_onclick - start
function layvMain_onclick(e, id) {
console.log("layvMain_onclick");	
	var change = $.davinci.getInstance("#lblDaVinci");
	
	if(id=='btnChange'){
		var davinciLabel = (count%2==0) ? "Hello World!!" : "Welcome to DaVinci!!";
		change.text(davinciLabel);			
		count++;
	}	
}
//--layvMain_onclick - end








//--hdrMain_onclick - start
function hdrMain_onclick(e, id) {
if(id == 'btnNext_1'){
	
		$.davinci.changePage("#pgSecond",{"transition":"slide"});
		
	}

}
//--hdrMain_onclick - end




//--hrdSecond_onclick - start
function hrdSecond_onclick(e, id) {
if(id == 'btnBack_1'){
	
		$.davinci.changePage("#pgMain",{"transition":"slide","reverse":true});
	
	}
}
//--hrdSecond_onclick - end

	