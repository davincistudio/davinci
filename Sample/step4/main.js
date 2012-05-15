
//--Header_0_onclick - start
function Header_0_onclick(e, id) {
	if(id == 'btnNext1'){
		$.davinci.changePage("#pgSecond",{"transition":"slide"});
	}
}
//--Header_0_onclick - end

//--Layoutview_0_onclick - start
var count=0;
function Layoutview_0_onclick(e, id) {
	var change = $.davinci.getInstance("#Label_0");
	if(id=='btnChange'){
		var davinciLabel = (count%2==0) ? "Hello World!!" : "Welcome to DaVinci!!";
		change.text(davinciLabel);			
		count++;
	}	
}	
//--Layoutview_0_onclick - end

//--Header_1_onclick - start
function Header_1_onclick(e, id) {
	if(id == 'btnBack1'){
		$.davinci.changePage("#pgMain",{"transition":"slide","reverse":true});
	}
	else if(id=='btnNext2'){
		$.davinci.changePage("#pgThird");	
	}
}

//--Header_1_onclick - end

//--Header_2_onclick - start
function Header_2_onclick(e, id) {
	if(id=='btnBack2'){
		$.davinci.changePage("#pgSecond",{"transition":"slide","reverse":true});	
	}
}
//--Header_2_onclick - end
	
//--pgThird_onpageshow - start
function pgThird_onpageshow() {
	var list=$.davinci.getInstance("#lstvItem");
	var items = [];
	for ( var i = 0; i < 50; i++) {
	items.push({
		lblItem: "item"+i
			});
	}	
	list.addItems( items );
}
//--pgThird_onpageshow - end

	