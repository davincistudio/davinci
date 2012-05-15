var dvcInstance = new Object();
dvcInstance['enable'] = function(e){};
dvcInstance['visible'] = function(v){};

var dvcAudio = new Object();
dvcAudio['enable'] = function(e){};
dvcAudio['visible'] = function(v){};
dvcAudio['audio'] = function(){};
dvcAudio['play'] = function(){};
dvcAudio['isPlaying'] = function(){};
dvcAudio['pause'] = function(){};

var dvcButton = new Object();
dvcButton['enable'] = function(e){};
dvcButton['visible'] = function(v){};
dvcButton['text'] = function(){};

var dvcCarousel = new Object();
dvcCarousel['enable'] = function(e){};
dvcCarousel['visible'] = function(v){};
dvcCarousel['getCurPage'] = function(){};
dvcCarousel['setCurPage'] = function(pageNumber, duration, skipEvent){};
dvcCarousel['addPage'] = function(html, dynamicPage){};
dvcCarousel['getTotalPage'] = function(){};
dvcCarousel['removeAllPages'] = function(){};
dvcCarousel['refresh'] = function(){};

var dvcCarouselIndicator = new Object();
dvcCarouselIndicator['enable'] = function(e){};
dvcCarouselIndicator['visible'] = function(v){};
dvcCarouselIndicator['setTotalPage'] = function(p){};
dvcCarouselIndicator['setCurPage'] = function(p){};
dvcCarouselIndicator['removeAllPages'] = function(){};
dvcCarouselIndicator['refresh'] = function(){};

var dvcCollapseview = new Object();
dvcCollapseview['enable'] = function(e){};
dvcCollapseview['visible'] = function(v){};
dvcCollapseview['expand'] = function(e, noAnimation, animatedCallback){};

var dvcDivision = new Object();

var dvcFooter = new Object();
dvcFooter['enable'] = function(e){};
dvcFooter['visible'] = function(v){};
dvcFooter['refresh'] = function(){};

var dvcGrid = new Object();
dvcGrid['enable'] = function(e){};
dvcGrid['visible'] = function(v){};
dvcGrid['refresh'] = function(){};

var dvcHeader = new Object();
dvcHeader['enable'] = function(e){};
dvcHeader['visible'] = function(v){};
dvcHeader['refresh'] = function(){};

var dvcHtmlview = new Object();
dvcHtmlview['enable'] = function(e){};
dvcHtmlview['visible'] = function(v){};
dvcHtmlview['html'] = function(value, scrollviewWidth){};
dvcHtmlview['clear'] = function(){};

var dvcImage = new Object();
dvcImage['enable'] = function(e){};
dvcImage['visible'] = function(v){};
dvcImage['src'] = function(url){};
dvcImage['imageType'] = function(type){};

var dvcImageButton = new Object();
dvcImageButton['enable'] = function(e){};
dvcImageButton['visible'] = function(v){};
dvcImageButton['text'] = function(){};

var dvcLabel = new Object();
dvcLabel['enable'] = function(e){};
dvcLabel['visible'] = function(v){};
dvcLabel['textAlign'] = function(ta){};
dvcLabel['text'] = function(t){};

var dvcLayoutview = new Object();
dvcLayoutview['enable'] = function(e){};
dvcLayoutview['visible'] = function(v){};
dvcLayoutview['checked'] = function(v){};

var dvcListview = new Object();
dvcListview['enable'] = function(e){};
dvcListview['visible'] = function(v){};
dvcListview['addItems'] = function(items, posIndex){};
dvcListview['removeItem'] = function(index){};
dvcListview['removeAllItems'] = function(){};
dvcListview['setItems'] = function(items){};
dvcListview['getItemCount'] = function(){};
dvcListview['enable'] = function(lineIndex, e){};
dvcListview['checked'] = function(lineIndex, v){};
dvcListview['userData'] = function(lineIndex, d){};

var dvcPageBox = new Object();
dvcPageBox['enable'] = function(e){};
dvcPageBox['visible'] = function(v){};
dvcPageBox['changePage'] = function(_pageid, options){};
dvcPageBox['getActivePage'] = function(){};

var dvcPicker = new Object();
dvcPicker['enable'] = function(e){};
dvcPicker['visible'] = function(v){};
dvcPicker['scrollTo'] = function(y, duration){};
dvcPicker['getScrollPosition'] = function(){};
dvcPicker['addItems'] = function(html){};
dvcPicker['removeItemAll'] = function(){};
dvcPicker['getCount'] = function(){};
dvcPicker['getIndex'] = function(index){};
dvcPicker['setIndex'] = function(index){};

var dvcPopup = new Object();
dvcPopup['enable'] = function(e){};
dvcPopup['visible'] = function(v){};
dvcPopup['open'] = function(options){};
dvcPopup['close'] = function(){};
dvcPopup['isShown'] = function(){};
dvcPopup['reposition'] = function(popupLeft, anchorPos){};

var dvcProgress = new Object();
dvcProgress['enable'] = function(e){};
dvcProgress['visible'] = function(v){};
dvcProgress['value'] = function(percent){};

var dvcScrollview = new Object();
dvcScrollview['scrollTo'] = function(x, y, duration){};
dvcScrollview['getScrollPosition'] = function(){};

var dvcSlider = new Object();
dvcSlider['enable'] = function(e){};
dvcSlider['visible'] = function(v){};
dvcSlider['min'] = function(v){};
dvcSlider['max'] = function(v){};
dvcSlider['value'] = function(v){};

var dvcSwitch = new Object();
dvcSwitch['enable'] = function(e){};
dvcSwitch['visible'] = function(v){};
dvcSwitch['checked'] = function(v){};

var dvcTextarea = new Object();
dvcTextarea['enable'] = function(e){};
dvcTextarea['visible'] = function(v){};
dvcTextarea['text'] = function(value){};

var dvcTextfield = new Object();
dvcTextfield['enable'] = function(e){};
dvcTextfield['visible'] = function(v){};
dvcTextfield['text'] = function(value){};

var dvcTreeview = new Object();
dvcTreeview['enable'] = function(e){};
dvcTreeview['visible'] = function(v){};
dvcTreeview['drawTreeview'] = function(_datas){};
dvcTreeview['addNode'] = function(target, data, type){};
dvcTreeview['removeNode'] = function(target, isunwrap){};
dvcTreeview['removeAll'] = function(){};
dvcTreeview['getSelectedNode'] = function(type){};
dvcTreeview['getCheckedNodes'] = function(type){};
dvcTreeview['getItems'] = function(path){};

var dvcVideo = new Object();
dvcVideo['enable'] = function(e){};
dvcVideo['visible'] = function(v){};
dvcVideo['video'] = function(){};
dvcVideo['play'] = function(){};

var dvcCheckbox = new Object();
dvcCheckbox['enable'] = function(e){};
dvcCheckbox['visible'] = function(v){};
dvcCheckbox['text'] = function(t){};
dvcCheckbox['checked'] = function(v){};
dvcCheckbox['toggle'] = function(){};

var dvcRadioButton = new Object();
dvcRadioButton['enable'] = function(e){};
dvcRadioButton['visible'] = function(v){};
dvcRadioButton['text'] = function(t){};
dvcRadioButton['checked'] = function(v){};



/**
 * $.davinci.popup.open에 의한 생성된 popup 위젯
 * @augments $.mobile.dvcPagebox
 * @class dvcPopup
 */
$.mobile.dvcPopup = function() {
	
	/**
	 * $.davinci.popup.open에서 호출되고, Application에서는 호출되지 않음.
	 * @param {Object} options
	 *		<dl class="detailList">
	 * 		<dt><span class="light fixedFont">{Boolean}</span> <b>enable</b></dt><dd>: widget을 사용 할 수 있게 설정하거나 사용하지 않게 설정</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>pageid</b></dt><dd>: popup내에 포함할 page의 id</dd>
	 *		<dt><span class="light fixedFont">{Object}</span> <b>css</b></dt><dd>: popup의 css로 position과 dimension 등을 기입할 때 사용</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>modal</b></dt><dd>: true면 modal popup, false면 modaless popup, default는 false</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>transition</b></dt><dd>: 전환 효과 "none" | "slide" | "slideup" | "slidedown" | "fade" | "pop" | "flip", default는 "popup" </dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>overlay</b></dt><dd>: 투명도(0 ~ 100) 0이 가장 투명하고, 100이 가장 불투명하다. ,default는 0</dd>
	 *		<dt><span class="light fixedFont">{Function}</span> <b>onbeforeshow</b></dt><dd>: popup이 show되기 전에 호출될 callback function</dd>
	 *		<dt><span class="light fixedFont">{Function}</span> <b>onshow</b></dt><dd>: popup이 show된 후에 호출될 callback function</dd>
	 *		<dt><span class="light fixedFont">{Function}</span> <b>onbeforehide</b></dt><dd>: popup이 hide되기 전에 호출될 callback function</dd>
	 *		<dt><span class="light fixedFont">{Function}</span> <b>onhide</b></dt><dd>: popip이 hide된 후에 호출될 callback function</dd>
	 *		</dl>
	 * @returns {Boolean} enable상태이면 true, disable상태이면 false
	 */
	this.open =  function(options) {};
	/**
	 * popup을 close한다.
	 *
	 */
	this.close = function() {};
	/**
	 * popup을 show 여부를 확인한다.
	 *
	 * @return {Boolean}	popup이 show되었으면 true, 아니면 false
	 */
	this.isShown = function() {};
	/**
	 * popup의 left와 anchor의 위치를 변경한다.
	 *
	 * @param {Number} popupLeft	popup의 left
	 * @param {Number} anchorPos	anchor의 위치
	*/
	this.reposition = function(popupLeft, anchorPos) {};

};

/**
 * Widget의 base class
 * @class dvcBase
 */
$.mobile.dvcBase = function() {
	
		/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>enable</b></dt><dd>: widget을 사용 할 수 있게 설정하거나 사용하지 않게 설정</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>visible</b></dt><dd>: widget을 보여주거나 보이지 않도록 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
	
	/**
	 * widget의 enable상태를 set/get 한다.
	 * @param {Boolean} e undefined면 get으로 동작함, true면 enable, false면 disable
	 * @returns {Boolean} enable상태이면 true, disable상태이면 false
	 */
	this.enable =  function(e) {};
	
	/**
	 * widget의 visible상태를 set/get 한다.
	 * @param {Boolean} v undefined면 get으로 동작함, true면 visible, false면 invisible
	 * @returns {Boolean} visible상태이면 true, invisible상태이면 false
	 */
	this.visible = function(v) {};
};

/**
 * Button 위젯
 * @augments $.mobile.dvcBase
 * @class dvcButton
 */
$.mobile.dvcButton = function()  {
	/**
	 * button의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 button을 text를 set함.
	 * @returns {String} button의 text 문자열을 return한다.
	 */
	this.text = function(t) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: button에 들어가는 텍스트</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>buttonType</b></dt><dd>: button의 사용 용도에 따라 설정(none, ok, cancel, back) </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>upImage</b></dt><dd>: button을 누르기 전 이미지 </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>downImage</b></dt><dd>: button을 누른 후 이미지 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>borderWidths</b></dt><dd>: ‘upImage’ 또는 ‘downImage’를 넣었을 경우 이미지가 바로 안보이기 때문에'borderWidths’를설정하여 버튼 안에 배치하도록 설정(top right bottom left 순서) </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>upIcon</b></dt><dd>: button을 누르기 전 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>downIcon</b></dt><dd>: button을 누른 후 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>iconPos</b></dt><dd>: button에서 icon 위치 지정(left, right, top) </dd>
 	 *		<dt><span class="light fixedFont">{Number}</span> <b>iconMargin</b></dt><dd>: icon을 사용 후 ‘icon-pos: “top”’으로 지정 하였을 경우 사용 </dd>
 	 *		<dt><span class="light fixedFont">{Number}</span> <b>textMargin</b></dt><dd>: icon을 사용 후 ‘icon-pos: “top”’으로 지정 하였을 경우 사용 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};


/**
 * ImageButton 위젯
 * @augments $.mobile.dvcBase
 * @class dvcImageButton
 */
$.mobile.dvcImageButton = function() {
	/**
	 * button의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 button을 text를 set함.
	 * @returns {String} button의 text 문자열을 return한다.
	 */
	this.text = function(t) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: imagebutton에 들어가는 텍스트</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>upImage</b></dt><dd>: imagebutton을 누르기 전 이미지 </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>downImage</b></dt><dd>: imagebutton을 누른 후 이미지 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Checkbox 위젯
 * @augments $.mobile.dvcBase
 * @class dvcCheckbox
 */
$.mobile.dvcCheckbox = function()  {
	/**
	 * checkbox의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 checkbox의 text를 set함.
	 * @returns {String} checkbox의 text를 return한다.
	 */
	this.text = function(t) {};
	
	/**
	 * checkbox의 check상태를 set/get 한다.
	 * @param {Boolean} v undefined면 get으로 동작함, check하기 위해서는 true, check를 해제하기 위해서는 false를 set함.
	 * @returns {Boolean} checkbox의 check상태(true | false)를 return한다.
	 */	 
	this.checked = function(v) {};
	
	/**
	 * checkbox의 check상태를 toggle 한다.
	 */	 
	this.toggle = function() {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: checkbox에 들어가는 텍스트</dd>	 
	 *		<dt><span class="light fixedFont">{String}</span> <b>upImage</b></dt><dd>: checkbox를 누르기 전 이미지. downImage가 있고, upImage가 없을 경우에는 transparent가 됨. </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>downImage</b></dt><dd>: checkbox를 누른 후 이미지. </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>upImageChecked</b></dt><dd>: checkbox가 선택 되어있을 때의 이미지. 이 값이 없을 경우에는 이 상태에 downImage를 적용함. </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>downImageChecked</b></dt><dd>: checkbox가 선택 해제를 위해 눌렀을 때 이미지.  이 값이 없을 경우에는 이 상태에 downImage를 적용함. </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>upIcon</b></dt><dd>: checkbox을 누르기 전 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>downIcon</b></dt><dd>: checkbox을 누른 후 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>upIconChecked</b></dt><dd>: checkbox가 선택 되어있을 때의 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>downIconChecked</b></dt><dd>: checkbox가 선택 해제를 위해 눌렀을 때 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>iconPos</b></dt><dd>: checkbox에서 icon 위치 지정(left, right, top) </dd>
 	 *		<dt><span class="light fixedFont">{Number}</span> <b>iconMargin</b></dt><dd>: icon을 사용 후 ‘icon-pos: “top”’으로 지정 하였을 경우 사용 </dd>
 	 *		<dt><span class="light fixedFont">{Number}</span> <b>textMargin</b></dt><dd>: icon을 사용 후 ‘icon-pos: “top”’으로 지정 하였을 경우 사용 </dd>
 	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>checked</b></dt><dd>: checkbox의 선택 여부 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * RadioButton 위젯
 * @augments $.mobile.dvcBase
 * @class dvcRadioButton
 */
$.mobile.dvcRadioButton = function()  {
	/**
	 * radiobutton의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 radiobutton의 text를 set함.
	 * @returns {String} radiobutton의 text를 return한다.
	 */
	this.text = function(t) {};
	
	/**
	 * radiobutton의 check상태를 set/get 한다.
	 * @param {Boolean} v undefined면 get으로 동작함, check하기 위해서는 true, check를 해제하기 위해서는 false를 set함.
	 * @returns {Boolean} radiobutton의 check상태(true | false)를 return한다.
	 */	 
	this.checked = function(v) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: radiobutton에 들어가는 텍스트</dd>	 
	 *		<dt><span class="light fixedFont">{String}</span> <b>upImage</b></dt><dd>: radiobutton를 누르기 전 이미지. downImage가 있고, upImage가 없을 경우에는 transparent가 됨. </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>downImage</b></dt><dd>: radiobutton를 누른 후 이미지 </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>upImageChecked</b></dt><dd>: radiobutton가 선택 되어있을 때의 이미지. 이 값이 없을 경우에는 이 상태에 downImage를 적용함.</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>downImageChecked</b></dt><dd>: radiobutton가 선택 해제를 위해 눌렀을 때 이미지. 이 값이 없을 경우에는 이 상태에 downImage를 적용함.</dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>borderWidths</b></dt><dd>: ‘upImage’ 또는 ‘downImage’를 넣었을 경우 이미지가 바로 안보이기 때문에 'borderWidths’를 설정하여 버튼 안에 배치하도록 설정(top right bottom left 순서)</dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>upIcon</b></dt><dd>: radiobutton을 누르기 전 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>downIcon</b></dt><dd>: radiobutton을 누른 후 이미지 아이콘 </dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>upIconChecked</b></dt><dd>: radiobutton가 선택 되어있을 때의 아이콘. 이 값이 없을 경우에는 이 상태에 downIcon을 적용함.</dd> 	 
 	 *		<dt><span class="light fixedFont">{String}</span> <b>downIconChecked</b></dt><dd>: radiobutton가 선택 해제를 위해 눌렀을 때 이미지 아이콘. 이 값이 없을 경우에는 이 상태에 downIcon을 적용함.</dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>iconPos</b></dt><dd>: radiobutton에서 icon 위치 지정 (left, right, top)</dd>
 	 *		<dt><span class="light fixedFont">{Number}</span> <b>iconMargin</b></dt><dd>: icon을 사용 후 ‘icon-pos: “top”’으로 지정 하였을 경우 사용</dd>
 	 *		<dt><span class="light fixedFont">{Number}</span> <b>textMargin</b></dt><dd>: icon을 사용 후 ‘icon-pos: “top”’으로 지정 하였을 경우 사용 </dd>
 	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>checked</b></dt><dd>: radiobutton의 선택 여부 설정</dd>
 	 *		<dt><span class="light fixedFont">{String}</span> <b>groupName</b></dt><dd>: radiobutton의 그룹 명 설정</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * 하위의 Element를 접거나 펼칠때 사용하는 위젯
 * @augments $.mobile.dvcBase
 * @class dvcCollapseview 위젯
 */
$.mobile.dvcCollapseview = function()  {
	/**
	 * 하위 Element를 접거나 펼친다..
	 * @param {Boolean} v true면 펼치고, false면 접는다.
	 * @param {Boolean} fNoAnimation true면 Animation이 없이 접거나 펼친다.
	 * @param {Function} animatedCallback 펼치거나 접는 동작이 완료된 후에 호출되는 callback
	 */
	this.expand = function(e, noAnimation, animatedCallback) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>expand</b></dt><dd>: collapseview를 펼치거나 접도록 설정</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * 수평 분할을 위한 위젯
 * @augments $.mobile.dvcBase
 * @class dvcGrid 위젯
 */
$.mobile.dvcGrid = function() {
	this.refresh = function() {};
};

/**
 * Html 형식의 문서를 화면에 표시하기 위한 위젯
 * 이메일이나 게시판 등에서 사용할 수 있다.
 * @augments $.mobile.dvcBase
 * @class dvcHtmlview 위젯
 */
$.mobile.dvcHtmlview = function() {
	/**
	 * htmlview에 html을 설정한다.
	 * @param {String} value 설정할 html
	 * @param {Number} width htmlview의 width
	 */
	this.html = function(value, scrollviewWidth){};
	
	this.clear = function(){};
};

/**
 * 그림을 표시하기 위한 위젯
 * @augments $.mobile.dvcBase
 * @class dvcImage 위젯
 */
$.mobile.dvcImage = function() {
	
	/**
	 * image src의 url을 set/get 한다.
	 * @param {String} url undefined면 get으로 동작함, String이면 image src의 url로 set함.
	 * @returns {String} image의 url을 return한다.
	 */
	this.src = function(url) {};
	
	/**
	 * image의 type을 set 한다.
	 * @param {String} type "stretch" | "zoom" | "center"
	 */
	this.imageType = function(type) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>src</b></dt><dd>: image를 넣어 줄 이미지 저장위치 설정 </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>imageType</b></dt><dd>: image를 보여지는 타입에 따라 설정[tile, stretch, zoom, center, none]</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
	
};


/**
 * Label 위젯
 * @augments $.mobile.dvcBase
 * @class dvcLabel 위젯
 */
$.mobile.dvcLabel = function() {
	
	/**
	 * label의 text align을 set/get한다.
	 * @param {String} ta "center" | "left" | "right"
	 */
	this.textAlign = function(ta) {};
	
	/**
	 * label의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 label을 text를 set함.
	 * @returns {String} 문자열을 return한다.
	 */
	this.text = function(t) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: label에 들어가는 텍스트 </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>textAlign</b></dt><dd>: label에서 text의 위치 설정 (left, center, right) </dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>multiline</b></dt><dd>: label에서 너비의 사이즈가 일정하고 텍스트의 양이 늘어날 때 자동으로 높이를 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
	
};

/**
 * page의 상단에 위치하는 위젯
 * @augments $.mobile.dvcBase
 * @class dvcHeader 위젯
 */
$.mobile.dvcHeader = function() {
	/**
	 * dvcHeader의 height가 변경된 경우 호출해야 한다.
	 */
	this.refresh = function() {};
};

/**
 * page의 하단에 위치하는 위젯
 * @augments $.mobile.dvcBase
 * @class dvcFooter 위젯
 */
$.mobile.dvcFooter = function() {
	/**
	 * dvcFooter의 height가 변경된 경우 호출해야 한다.
	 */
	this.refresh = function() {};
};

/**
 * basic widget을 배치하기 위한 위젯
 * @augments $.mobile.dvcBase
 * @class dvcLayoutview 위젯
 */
$.mobile.dvcLayoutview = function() {
	
	/**
	 * layoutview의 check상태를 set/get 한다.
	 * @param {Boolean} v undefined면 get으로 동작함, check하기 위해서는 true, check를 해제하기 위해서는 false를 set함.
	 * @returns {Boolean} layoutview의 check상태(true | false)를 return한다.
	 */	 
	this.checked = function(v){};
	
	/**
	 * layoutview의 하위 또는 layoutview가 발생하는 click event에 대한 처리를 한다.
	 * @name $.mobile.dvcLayoutview#event:onclick
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @event
	 */
	
	/**
	 * layoutview의 하위 또는 layoutview가 발생하는 change event에 대한 처리를 한다.
	 * @name $.mobile.dvcLayoutview#event:onchange
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {String|Number} value 변경된 상태 값
	 * @event
	 */
	 
	/**
	 * layoutview의 하위 또는 layoutview가 발생하는 keyup event에 대한 처리를 한다.
	 * @name $.mobile.dvcLayoutview#event:onkeyup
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {String} value 입력된 문자열
	 * @event
	 */
	 
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>buttonType</b></dt><dd>: layoutview를 버튼으로 사용할 경우 타입 설정(none, link, button, checkbox, radio, checkboxradio)</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>checked</b></dt><dd>: layoutview에서 버튼타입이 checkbox, radio, checkboxradio일 경우 선택유무 설정(true, false)</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>groupName</b></dt><dd>: layoutview에서 버튼타입이 radio나 checkboxradio일 경우 그룹명 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};

};


/**
 * basic widget을 list형태로 배치하기 위한 위젯
 * @augments $.mobile.dvcBase
 * @class dvcListview 위젯
 */
$.mobile.dvcListview = function() {
	
	/**
	 * listview의 item을 추가한다.
	 * @param {Array|String} items 추가할 item 배열, 사용자 정의시에는 String을 사용한다.
	 * @param {Number} posIndex 추가할 item이 삽입될 위치, undefined일 경우에는 마지막에 추가된다.
	 * @example
	 * 추가되는 라인마다 userData를 설정하기 위해서는 예약된 subid인 "userData"를 사용한다.
	 * 
	 * var items = [];
	 * for&#40;var i &#061; 0; i &lt; 10; i&#43;&#43; &#41; { 
	 *     items.push&#40;{
	 *         label1: "item " &#43; i,
     *         userData: {	// 라인마다 필요한 data를 object형태로 저장한다.
     *             index : i &#42; 2
     *         }
     *    }&#41;;
     * }
     *
     * 해당 라인의 userData를 읽어오기 위해서는 userData()를 호출한다.
	 */
	this.addItems = function(items, posIndex) {};
	
	/**
	 * listview의 item을 제거한다.
	 * @param {Number} index 제거할 item의 index
	 */
	this.removeItem = function(index) {};

	/**
	 * listview의 item을 모두 제거한다.
	 */
	this.removeAllItems = function() {};
	
	/**
	 * listview의 item을 설정한다.
	 * addItems과 다르게 모든 item을 지운 상태에서 설정하게 된다.
	 * @param {Array|String} items 추가할 item 배열, 사용자 정의시에는 String을 사용한다.
	 */
	this.setItems = function(items) {};
	
	/**
	 * listview의 item을 갯수를 얻어온다.
	 */
	this.getItemCount = function() {};
	
	/**
	 * listview의 enable상태를 set/get 한다.
	 * @param {Number} lineIndex listview의 lineIndex, -1일 경우에는 전체listview에 해당한다.
	 * @param {Boolean} e undefined면 get으로 동작함, enable하기 위해서는 true, disable를 하기 위해서는 false를 set함.
	 * @returns {Boolean} listview의 enable상태(true | false)를 return한다.
	 */	 
	this.enable = function(lineIndex, e) {};
	
	/**
	 * listview의 check상태를 set/get 한다.
	 * @param {Number} lineIndex listview의 lineIndex
	 * @param {Boolean} v undefined면 get으로 동작함, check하기 위해서는 true, check를 해제하기 위해서는 false를 set함.
	 * @returns {Boolean} listview의 check상태(true | false)를 return한다.
	 */	 
	this.checked = function(lineIndex, v){};
	
	/**
	 * listview의 한 item에 대해 정보를 set/get한다.
	 * @param {Number} lineIndex listview의 lineIndex
	 * @param {Object} d undefined면 get으로 동작함, 저장할 정보.
	 * @returns {Boolean} listview의 해당라인의 정보를 return한다.
	 */	 
	 
	this.userData = function(lineIndex, d) {};
	
	/**
	 * listview의 하위 또는 listview가 발생하는 click event에 대한 처리를 한다.
	 * @name $.mobile.dvcListview#event:onclick
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @event
	 */	
	
	/**
	 * listview의 하위 또는 listview가 발생하는 change event에 대한 처리를 한다.
	 * @name $.mobile.dvcListview#event:onchange
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {String|Number} value 변경된 상태 값
	 * @event
	 */
	
	/**
	 * listview의 하위 또는 listview가 발생하는 keyup event에 대한 처리를 한다.
	 * @name $.mobile.dvcListview#event:onkeyup
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {String} value 입력된 문자열
	 * @event
	 */
	 
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>buttonType</b></dt><dd>: listview를 버튼으로 사용할 경우 타입 설정(none, button, radio, checkboxradio, chekbox)</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * 여러 item중 하나를 선택하기 위한 위젯
 * @augments $.mobile.dvcScrollview
 * @class dvcPicker 위젯
 */
$.mobile.dvcPicker = function() {
	
	/**
	 * picker 내부의 scroll의 y위치를 이동한다.
	 * @param {Number} y 이동할 y위치
	 * @param {Number} duration 이동시 Animation발생시간임, 0일 경우 Animation 발생하지 않음.
	 */
	this.scrollTo = function(y, duration) {};

	/**
	 * picker 내부의 scroll의 y위치를 얻어온다.
	 * @returns {Number} y 위치
	 */
	this.getScrollPosition = function()	{
		return {y: -this._sy };
	};
	
	/**
	 * picker에 item을 추가한다.
	 * @param {String} html picker에 표시될 item을 추가한다. item하나가 <li></li>로 쌓여있어야 한다.
	 */
	this.addItems = function(html) {};
	
	/**
	 * picker에 item을 모두 제거한다.
	 */
	this.removeItemAll = function() {};
	
	/**
	 * picker에 item을 모두 제거한다.
	 * @returns {Number} 전체 item의 수
	 */
	this.getCount = function() {};

	/**
	 * picker의 선택된 index를 얻어온다.
	 * @returns {Number} 선택된 index값
	 */
	this.getIndex = function(index) {};
	
	/**
	 * 해당되는 index로 이동한다.
	 * @param {Number} index 이동할 index
	 */
	this.setIndex = function(index) {};

};

/**
 * Progress 위젯
 * @augments $.mobile.dvcBase
 * @class dvcProgress 위젯
 */
$.mobile.dvcProgress = function() {
	/**
	 * progress의 value를 set/get 한다.
	 * @param {Number} percent undefined면 get으로 동작함, Number이면 현재 progress의 위치를 set함.
	 * @returns {Number} 현재 progress의 위치를 return한다.
	 */
	this.value = function(percent){};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{Number}</span> <b>value</b></dt><dd>: progress가 위치하는 값 설정 </dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>min</b></dt><dd>: progress에서 최소값 설정 </dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>max</b></dt><dd>: progress에서 최대값 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Slider 위젯
 * @augments $.mobile.dvcBase
 * @class dvcSlider 위젯
 */
$.mobile.dvcSlider = function() {
	/**
	 * slider의 범위 중 min을 set/get 한다.
	 * @param {Number} v undefined면 get으로 동작함, Number이면 현재 slider의 min을 set함.
	 * @returns {Number} 현재 slider의 min을 return한다.
	 */
	this.min = function(v){};
	
	/**
	 * slider의 범위 중 max을 set/get 한다.
	 * @param {Number} v undefined면 get으로 동작함, Number이면 현재 slider의 max을 set함.
	 * @returns {Number} 현재 slider의 max을 return한다.
	 */
	this.max = function(v){};

	/**
	 * slider의 value를 set/get 한다.
	 * @param {Number} percent undefined면 get으로 동작함, Number이면 현재 slider의 위치를 set함.
	 * @returns {Number} 현재 slider의 위치를 return한다.
	 */
	this.value = function(v) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{Number}</span> <b>handle</b></dt><dd>: slider에서 handle의 위치 값 설정</dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>min</b></dt><dd>: slider에서 최소값 설정</dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>max</b></dt><dd>: slider에서 최대값 설정</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};


/**
 * Switch 위젯
 * @augments $.mobile.dvcBase
 * @class dvcSwitch 위젯
 */
$.mobile.dvcSwitch = function() {
	/**
	 * switch의 check상태를 set/get 한다.
	 * @param {Boolean} v undefined면 get으로 동작함, check하기 위해서는 true, check를 해제하기 위해서는 false를 set함.
	 * @returns {Boolean} switch의 check상태(true | false)를 return한다.
	 */
	this.checked = function(v) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>checkedLabel</b></dt><dd>: switch가 선택되었을 경우 문자열 설정</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>uncheckedLabel</b></dt><dd>: switch가 선택되지 않았을 경우 문자열 설정</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>uncheckedLabel</b></dt><dd>: switch가 선택되지 않았을 경우 문자열 설정</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Scroll 위젯 (Scroll 하위의 view 위젯은 position:relative가 전제)
 * @augments $.mobile.scrollview
 * @class dvcScrollview 위젯
 */
$.mobile.dvcScrollview = function() {
	/**
	 * scrollview의 위치를 이동한다.
	 * @param {Number} x scrollview의 x 위치
	 * @param {Number} y scrollview의 y 위치
	 * @param {Number} Animation 효과 시간(mSec)으로, 값이 있을 경우에는 x, y값을 (+)양수로 표시
	 *                 Undefined 또는 0으로 Animation 없을 경우에는 x, y값을 (-)음수로 표시
	 */
	this.scrollTo = function(x, y, duration){};

	/**
	 * scrollview의 위치를 얻어온다.
	 * @returns {Object} {x, y}의 값을 얻어온다.
	 */
	this.getScrollPosition = function(){};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>direction</b></dt><dd>: scrollview의 scroll 방향 설정 (y, x, all)</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>showScrollBars</b></dt><dd>: scrollview의 scroll Bar를 보여주거나 보이지 않도록 설정</dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>scrollBodyWidth</b></dt><dd>: scrollview의 내부의 너비를 설정</dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>nextLoadingBarHeight</b></dt><dd>: loadingBar연동시에만 사용 default=0 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * page를 담을 수 있는 위젯
 * @augments $.mobile.dvcBase
 * @class dvcPagebox 위젯
 */
$.mobile.dvcPagebox = function() {
	/**
	 * pagebox의 페이지를 전환 한다.
	 * @param {String} _pageid 전환 할 page의 pageid
	 * @param {Object} options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>transition</b></dt><dd>: 전환 효과 "none" | "slide" | "slideup" | "slidedown" | "fade" | "pop" | "flip"</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>reverse</b></dt><dd>: true면 전환 효과의 반대, false면 전환 효과를 그대로 적용한다.</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>role</b></dt><dd>: By default we rely on the role defined by the @data-role attribute.</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>showLoadMsg</b></dt><dd>: loading message shows by default when pages are being fetched during changePage</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>fromPage</b></dt><dd>: 이미 보여지고 있었던 페이지의 pageid</dd>
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>allowSamePageTransition</b></dt><dd>: 같은 페이지로의 전환을 허용하는지의 여부</dd>
	 *		</dl>
	 */	 
	this.changePage = function( _pageid, options ) {};
	
	/**
	 *	pagebox의 activepage를 반환한다.
	 *	@returns {String} activepage의 pageid
	 */
	this.getActivePage = function() {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>pageid</b></dt><dd>: pagebox에 들어갈 page의 id 설정</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Textarea 위젯
 * @augments $.mobile.dvcBase
 * @class dvcTextarea 위젯
 */
$.mobile.dvcTextarea = function() {
	/**
	 * textarea의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 button을 text를 set함.
	 * @returns {String} textarea의 text 문자열을 return한다.
	 */
	this.text = function(value){};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: textarea에 입력할 문자열</dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Textfield 위젯
 * @augments $.mobile.dvcBase
 * @class dvcTextfield 위젯
 */
$.mobile.dvcTextfield = function() {
	/**
	 * textfield의 text를 set/get 한다.
	 * @param {String} t undefined면 get으로 동작함, String이면 button을 text를 set함.
	 * @returns {String} textfield의 text 문자열을 return한다.
	 */
	this.text = function(value) {};
	
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>inputType</b></dt><dd>: textfield에서 화면에 표시되는 타입 설정(text, password)</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>text</b></dt><dd>: textfield에 입력할 텍스트</dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>placeholder</b></dt><dd>: textfield에 들어가는 힌트 설정 </dd>
 	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>clearButton</b></dt><dd>: textfield에 입력된 문자의 전체삭제버튼 사용 유무 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Carousel 위젯
 * @augments $.mobile.dvcScrollview
 * @class dvcCarousel 위젯
 */
$.mobile.dvcCarousel = function() {
	/**
	 * 현재 Page의 index를 얻어온다.
	 * @returns {Number} 현재 page index (1부터 시작)
	 */
	this.getCurPage = function() {};
	/**
	 * 현재 페이지를 설정한다.
	 * @param {Number} pageNumber page의 index (1부터 시작)
	 * @param {Number} duration 설정시 이동될 때 slide효과 시간 (mSec 단위)
	 * @param {Boolean | Undefined} skipEvent true면 페이지 설정시 ev-change가 발생하지 않음. default값은 false
	 */
	this.setCurPage = function(pageNumber, duration, skipEvent) {};

	/**
	 * Page를 add한다.
	 * @param {String | jQueryObject} html page의 jQuery Object이거나, html 형식의 문자열
	 * @param {Boolean | Undefined} dynamicPage 동적으로 생성된 page를 add할 경우에는 true로 해주어야 함. default값은 false.
	 */
	this.addPage = function(html, dynamicPage) {};
	/**
	 * Page의 총 수를 얻어온다.
	 * @returns {Number} 총 page 수
	 */
	this.getTotalPage = function() {};
	/**
	 * Carousel에 포함된 모든 page를 제거한다.
	 */
	this.removeAllPages = function() {};
	
	/**
	 * 모든 page를 Add 후 호출해야한다.
	 * 화면 크기가 변경되었을 때 호출해야 한다.
	 */
	this.refresh = function() {};
	
	/**
	 * carousel의 페이지가 변경될 때  발생하는 change event에 대한 처리를 한다.
	 * @name $.mobile.dvcCarousel#event:onchange
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {Object} $page 해당 page의 jQuery Object
	 * @param {Number} nowPage 현재 page의 index
	 * @event
	 */
	 
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>infinite</b></dt><dd>: true면, carousel이 무한정으로 회전됨.  </dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>pageGap</b></dt><dd>: carousel에 들어있는 페이지 간의 간격 설정 </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>direction</b></dt><dd>: "x"면 수평, "y"면 수직 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Carousel에 포함한 page의 총갯수와 현재선택된 페이지를 표시하기 위한 위젯
 * @augments $.mobile.dvcBase
 * @class dvcCarouselIndicator 위젯
 */
$.mobile.dvcCarouselIndicator = function() {
	/**
	 * Page의 총 갯수를 설정한다.
	 * @param {Number} p page의 총 수
	 */
	this.setTotalPage = function(p) {};
	/**
	 * 현재 page를 설정한다.
	 * @param {Number} p page의 index
	 */	
	this.setCurPage = function(p) {};
	/**
	 * 모든 page를 제거한다.
	 */
	this.removeAllPages = function() {};
	/**
	 * 화면 크기가 변경되었을 때 호출해야 한다.
	 */
	this.refresh = function() {};
	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{Boolean}</span> <b>gap</b></dt><dd>: indicator에 item 간의 간격 설정</dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>itemWidth</b></dt><dd>: indicator에 item 너비 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Treeview 위젯
 * @augments $.mobile.dvcBase
 * @class dvcTreeview 위젯
 */
$.mobile.dvcTreeview = function() {
	/**
	 * treeview의 node를 추가한 후 그린다.
	 * @param {Array} _datas 추가할 node data
	 */	
	this.drawTreeview = function(_datas) {};
	/**
	 * 해당 target node에 node를 추가한 후 그린다.
	 * @param {Object} target target node
	 * @param {Array} data 추가할 노드의 data
	 * @param {String} type target node의 전에 추가할 경우 "before"(default), 아니면 "after"
	 */	
	this.addNode = function(target, data, type) {};
	/**
	 * target node를 제거한다.
	 * @param {Object} target 제거할 target node
	 * @param {Boolean} isunwrap 삭제할 node의 자식들을 상위 node에게 전달할 경우 true, 아니면 false(default)
	 */
	this.removeNode = function(target, isunwrap) {};
	/**
	 * 모든 node 삭제한다
	 */	
	this.removeAll = function()	{};
	/**
	 * 현재 선택된 node를 type에 맞게 반환한다
	 * @param {String} type 현재 선택된 node의 id반환 |"path": 현재 선택된 node의 path 반환 |생략(default): 현재 선택된 노드 반환
	 * @returns {Object|String|Number} 타입에 맞게 선택된 node 정보 반환(선택된 node 없을 경우 -1)
	 */	
	this.getSelectedNode = function(type) {};
	/**
	 * 현재 체크박스에 체크된 node를 type에 맞게 반환한다
	 * @param {String} type 현재 선택된 node의 data반환 |생략(default): 현재 선택된 node 반환	 
	 * @returns {Object|String} 타입에 맞게 체크된 node 정보 반환(체크된 node 없을 경우 null)
	 */	
	this.getCheckedNodes = function(type) {};
	/**
	 * 해당 path의 node data 반환한다
	 * @param {String} path 반환하려는 data를 가진 node의 path	 
	 * @returns {Array} 해당 path의 node data 반환(해당 node data가 없을 경우 node의 전체 data 반환)
	 */
	this.getItems = function(path) {};
	
	/**
	 * node의 checkbox의 값이 변경될 때  발생하는 change event에 대한 처리를 한다.
	 * @name $.mobile.dvcTreeview#event:onchange
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {String} ecTarget 해당 이벤트가 발생한 node의 path
	 * @param {String} ecValue 해당 이벤트가 발생한 checkbox의 value(true|false)
	 * @event
	 */
	 
	 /**
	 * node의 expend 값이 변경될 때  발생하는 ecclick event에 대한 처리를 한다.
	 * @name $.mobile.dvcTreeview#event:onecclick
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {Array} ecValue 해당 이벤트가 발생한 node의 data	 
	 * @event
	 */
	 
	 /**
	 * node의 text를 선택할 때 발생하는 click event에 대한 처리를 한다.
	 * @name $.mobile.dvcTreeview#event:onclick
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @param {Array} ecData 해당 이벤트가 발생한 node의 data
	 * @param {String} ecPath 해당 이벤트가 발생한 node의 path	 
	 * @event
	 */
	 
	 
	 /**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>treeType</b></dt><dd>: treeview를 어떠한 형태로 보여줄 지 설정(basic, check, depticon, all)</dd>
	 *		<dt><span class="light fixedFont">{Number}</span> <b>iconWidth</b></dt><dd>: treeview의 dept마다 icon 크기 설정 </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};


/**
 * Division 위젯
 * @augments $.mobile.widget
 * @class dvcDivision 위젯
 */
$.mobile.dvcDivision = function() {
	
	/**
	 * Division이 생성될 때 초기화를 위해 발생하는 event
	 * @name $.mobile.dvcDivision#event:ondvcdivisioninit
	 * @param {Object} e event Object
	 * @param {String} id event가 발생한 위젯의 id 또는 sub-id
	 * @event
	 */

};

/**
 * Audio 위젯
 * @augments $.mobile.dvcBase
 * @class dvcAudio
 */
$.mobile.dvcAudio = function() {
	/**
	 * HTMLAudioElement를 return한다.
	 * @returns {Object} HTMLAudioElement를 return한다.
	 */
	this.audio = function() {};

	/**
	 * audio를 재생한다.
	 */
	this.play = function() {};
	
	/**
	 * audio의 재생 상태를 return한다.
	 * @returns {Boolean} true면 재생 중, false면 정지
	 */
	this.isPlaying = function() {};

	/**
	 * audio를 정지 한다.
	 */
	this.pause = function() {};


	/**
	 * audio 재생이 완료됐을 때 발생하는 end event에 대한 처리를 한다.
	 * @name $.mobile.dvcAudio#event:onended
	 * @param {Object} e event Object
	 * @event
	 */

	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>src</b></dt><dd>: audio src의 url </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * Video 위젯
 * @augments $.mobile.dvcBase
 * @class dvcVideo
 */
$.mobile.dvcVideo = function() {
	/**
	 * HTMLVideoElement를 return한다.
	 * @returns {Object} HTMLVideoElement를 return한다.
	 */
	this.video = function() {};

	/**
	 * video를 재생한다.
	 */
	this.play = function() {};

	/**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>src</b></dt><dd>: video src의 url </dd>
	 *		<dt><span class="light fixedFont">{String}</span> <b>poster</b></dt><dd>: video poster의 url </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};

/**
 * jQuery Mobile의 page와 동일하다.
 * page내에 위젯을 배치하여 저작하게 된다.
 * @class page
 */
$.mobile.page = function() {
	/**
	 * Page가 생성될 때 초기화를 위해 발생하는 event
	 * @name $.mobile.Page#event:oninit
	 * @event
	 */
	
	/**
	 * Page가 보여지기 전에 발생하는 event
	 * @name $.mobile.Page#event:onbeforeshow
	 * @event
	 */
	
	/**
	 * Page가 보여질 때 발생하는 event
	 * @name $.mobile.Page#event:onshow
	 * @event
	 */
	
	/**
	 * Page가 사라지기 전에 발생하는 event
	 * @name $.mobile.Page#event:onbeforehide
	 * @event
	 */
	
	/**
	 * Page가 사라질 때 발생하는 event
	 * @name $.mobile.Page#event:onhide
	 * @event
	 */
	 
	/**
	 * Page에서 Android의 하드웨어 back키가 눌렸을 때 실행되는 event
	 * @name $.mobile.Page#event:onback
	 * @event
	 */
	 
	/**
	 * 화면 회전시 발생하는 event
	 * @name $.mobile.Page#event:onorientationchange
	 * @event
	 * @param {String} param 회전값["landscape"|"portrait"]
	 */
	 
	 /**
	 * 속성으로 설정할 수 있는 options
	 *		<dl class="detailList">
	 *		<dt><span class="light fixedFont">{String}</span> <b>transition</b></dt><dd>: 해당 page로 changePage()될 경우에 적용되는 transition </dd>
	 *		</dl>
	 * @type Object
	 */
	this.options = {};
};






var $ = {
		/**     
			@class UI framework에서 사용하는 static API
		*/
		davinci: {

			
			/**
			 * 페이지를 전환 한다.
			 * 
			 * @param {String} to 전환 할 page의 id
			 * @param {Object} options
			 *		<dl class="detailList">
			 *		<dt><span class="light fixedFont">{String}</span> <b>transition</b></dt><dd>: 전환 효과 "none" | "slide" | "slideup" | "slidedown" | "fade" | "pop" | "flip"</dd>
			 *		<dt><span class="light fixedFont">{Boolean}</span> <b>reverse</b></dt><dd>: true면 전환 효과의 반대, false면 전환 효과를 그대로 적용한다.</dd>
			 *		<dt><span class="light fixedFont">{Boolean}</span> <b>changeHash</b></dt><dd>: true</dd>
			 *		<dt><span class="light fixedFont">{Boolean}</span> <b>fromHashChange</b></dt><dd>: false</dd>
			 *		<dt><span class="light fixedFont">{String}</span> <b>role</b></dt><dd>: By default we rely on the role defined by the @data-role attribute.</dd>
			 *		<dt><span class="light fixedFont">{Undefined}</span> <b>duplicateCachedPage</b></dt><dd>: undefined</dd>
			 *		<dt><span class="light fixedFont">{Undefined}</span> <b>pageContainer</b></dt><dd>: undefined</dd>
			 *		<dt><span class="light fixedFont">{Boolean}</span> <b>showLoadMsg</b></dt><dd>: loading message shows by default when pages are being fetched during changePage</dd>
			 *		<dt><span class="light fixedFont">{Undefined}</span> <b>dataUrl</b></dt><dd>: undefined</dd>
			 *		<dt><span class="light fixedFont">{String}</span> <b>fromPage</b></dt><dd>: 이미 보여지고 있었던 페이지의 pageid</dd>
			 *		<dt><span class="light fixedFont">{Boolean}</span> <b>allowSamePageTransition</b></dt><dd>: 같은 페이지로의 전환을 허용하는지의 여부</dd>
			 *		</dl>
			 */
			changePage: function(to, options) {},
			
			/**
			 * body의 child인 page중에서 현재 활성화된 page id를 반환한다.
			 * 
			 * @returns {String} page id
			 */
			getActivePage: function() {},
			
			/**
			 * Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 */
			
			/**     
			@class popup에 대한 static API
			*/
			popup : {
				
				/**
				 * popup을 open한다.
				 *
				 * @param {String} id	popup에 사용할 id
				 * @param {Object} options
				 *		<dl class="detailList">
				 *		<dt><span class="light fixedFont">{String}</span> <b>pageid</b></dt><dd>: popup내에 포함할 page의 id</dd>
				 *		<dt><span class="light fixedFont">{Object}</span> <b>css</b></dt><dd>: popup의 css로 position과 dimension 등을 기입할 때 사용</dd>
				 *		<dt><span class="light fixedFont">{Boolean}</span> <b>modal</b></dt><dd>: true면 modal popup, false면 modaless popup, default는 false</dd>
				 *		<dt><span class="light fixedFont">{String}</span> <b>transition</b></dt><dd>: 전환 효과 "none" | "slide" | "slideup" | "slidedown" | "fade" | "pop" | "flip", default는 "popup"</dd>
				 *		<dt><span class="light fixedFont">{Number}</span> <b>overlay</b></dt><dd>: 투명도(0 ~ 100) 0이 가장 투명하고, 100이 가장 불투명하다. ,default는 0</dd>
				 *		<dt><span class="light fixedFont">{Function}</span> <b>onbeforeshow</b></dt><dd>: popup이 show되기 전에 호출될 callback function</dd>
				 *		<dt><span class="light fixedFont">{Function}</span> <b>onshow</b></dt><dd>: popup이 show된 후에 호출될 callback function</dd>
				 *		<dt><span class="light fixedFont">{Function}</span> <b>onbeforehide</b></dt><dd>: popup이 hide되기 전에 호출될 callback function</dd>
				 *		<dt><span class="light fixedFont">{Function}</span> <b>onhide</b></dt><dd>: popip이 hide된 후에 호출될 callback function</dd>
				 *		</dl>
				 * @return {$.mobile.dvcPopup} 생성한 popup의 instance
				 */
				open: function(id, options) {},
				/**
				 * popup을 close한다.
				 *
				 * @param {String} id	Close할 popup의 id
				 */
				close: function(id) {},
				/**
				 * popup을 show 여부를 확인한다.
				 *
				 * @param {String} id	show 되었는 지 확인할 popup의 id
				 * @return {Boolean}	popup이 show되었으면 true, 아니면 false
				 */
				isShown: function(id) {},
				/**
				 * anchor를 붙이기 위해 popup의 position을 보정한다.
				 *
				 * @param {Object} $el	button의 jQuery Object
				 * @param {Number} popupLeft	popup의 left
				 * @param {Number} popupWidth	popup의 Width
				 * @param {Number} popupHeight	popup의 popupHeight
				 * @param {String} popupType	"top" | "bottom"
				 * @return {Object}	보정된 좌표 {left, top, width, height, anchorPos, type }
				*/
				adjustPopupPos: function($el, popupLeft, popupWidth, popupHeight, popupType) {},
				/**
				 * popup의 left와 anchor의 위치를 변경한다.
				 *
				 * @param {String} id	위치를 변경할 popup의 id
				 * @param {Number} popupLeft	popup의 left
				 * @param {Number} anchorPos	anchor의 위치
				*/
				reposition: function(id, popupLeft, anchorPos) {}
				
			},
			
			
			
			
			
			
			
			
			
			
			/**
			 * Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcInstance} Widget의 instance
			 */
			getInstance : function (id, subid, lineIndex) {
				return dvcInstance;
			},
		
			/**
			 * dvcAudio Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcAudio} dvcAudio Widget의 instance
			 */
			getAudio : function (id, subid, lineIndex) {
				return dvcAudio;
			},
		
			/**
			 * dvcButton Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcButton} dvcButton Widget의 instance
			 */
			getButton : function (id, subid, lineIndex) {
				return dvcButton;
			},
		
			/**
			 * dvcCarousel Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcCarousel} dvcCarousel Widget의 instance
			 */
			getCarousel : function (id, subid, lineIndex) {
				return dvcCarousel;
			},
			
			/**
			 * dvcCarouselIndicator Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcCarouselIndicator} dvcCarouselIndicator Widget
			 */
			getCarouselIndicator : function (id, subid, lineIndex) {
				return dvcCarouselIndicator;
			},
		
			/**
			 * dvcCollapseview Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcCollapseview} dvcCollapseview Widget의 instance
			 */
			getCollapseview : function (id, subid, lineIndex) {
				return dvcCollapseview;
			},
		
			/**
			 * dvcDivision Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcDivision} dvcDivision Widget의 instance
			 */
			getDivision : function (id, subid, lineIndex) {
				return dvcDivision;
			},
		
			/**
			 * dvcFooter Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcFooter} dvcFooter Widget의 instance
			 */
			getFooter : function (id, subid, lineIndex) {
				return dvcFooter;
			},
		
			/**
			 * dvcGrid Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcGrid} dvcGrid Widget의 instance
			 */
			getGrid : function (id, subid, lineIndex) {
				return dvcGrid;
			},
		
			/**
			 * dvcHeader Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcHeader} dvcHeader Widget의 instance
			 */
			getHeader : function (id, subid, lineIndex) {
				return dvcHeader;
			},
		
			/**
			 * dvcHtmlview Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcHtmlview} dvcHtmlview Widget의 instance
			 */
			getHtmlview : function (id, subid, lineIndex) {
				return dvcHtmlview;
			},
		
			/**
			 * dvcImage Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcImage} dvcImage Widget의 instance
			 */
			getImage : function (id, subid, lineIndex) {
				return dvcImage;
			},
		
			/**
			 * dvcImageButton Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcImageButton} dvcImageButton Widget의 instance
			 */
			getImageButton : function (id, subid, lineIndex) {
				return dvcImageButton;
			},
		
			/**
			 * dvcLabel Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcLabel} dvcLabel Widget의 instance
			 */
			getLabel : function (id, subid, lineIndex) {
				return dvcLabel;
			},
		
			/**
			 * dvcLayoutview Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcLayoutview} dvcLayoutview Widget의 instance
			 */
			getLayoutview : function (id, subid, lineIndex) {
				return dvcLayoutview;
			},
		
			/**
			 * dvcListview Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcListview} dvcListview Widget의 instance
			 */
			getListview : function (id, subid, lineIndex) {
				return dvcListview;
			},
		
			/**
			 * dvcPageBox Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcPageBox} dvcPageBox Widget의 instance
			 */
			getPageBox : function (id, subid, lineIndex) {
				return dvcPageBox;
			},
		
			/**
			 * dvcPicker Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcPicker} dvcPicker Widget의 instance
			 */
			getPicker : function (id, subid, lineIndex) {
				return dvcPicker;
			},
		
			/**
			 * dvcPopup Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcPopup} dvcPopup Widget의 instance
			 */
			getPopup : function (id, subid, lineIndex) {
				return dvcPopup;
			},
		
			/**
			 * dvcProgress Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcProgress} dvcProgress Widget의 instance
			 */
			getProgress : function (id, subid, lineIndex) {
				return dvcProgress;
			},
		
			/**
			 * dvcScrollview Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcScrollview} dvcScrollview Widget의 instance
			 */
			getScrollview : function (id, subid, lineIndex) {
				return dvcScrollview;
			},
		
			/**
			 * dvcSlider Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcSlider} dvcSlider Widget의 instance
			 */
			getSlider : function (id, subid, lineIndex) {
				return dvcSlider;
			},
		
			/**
			 * dvcSwitch Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcSwitch} dvcSwitch Widget의 instance
			 */
			getSwitch : function (id, subid, lineIndex) {
				return dvcSwitch;
			},
		
			/**
			 * dvcTextarea Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcTextarea
			getTextarea : function (id, subid, lineIndex) {
				return dvcTextarea;
			},
		
			/**
			 * dvcTextfield Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcTextfield} dvcTextfield Widget의 instance
			 */
			getTextfield : function (id, subid, lineIndex) {
				return dvcTextfield;
			},
		
			/**
			 * dvcTreeview Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcTreeview} dvcTreeview Widget의 instance
			 */
			getTreeview : function (id, subid, lineIndex) {
				return dvcTreeview;
			},
		
			/**
			 * dvcVideo Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcVideo} dvcVideo Widget의 instance
			 */
			getVideo : function (id, subid, lineIndex) {
				return dvcVideo;
			},
			
			/**
			 * dvcCheckbox Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcCheckbox} dvcCheckbox Widget의 instance
			 */
			getCheckbox : function (id, subid, lineIndex) {
				return dvcCheckbox;
			},
		
			/**
			 * dvcRadioButton Widget의 instance를 반환한다.
			 * 
			 * @param {String} id : id 값을 넣는다. Basic Widget의 경우는 자신의 부모 중 가장 가까이에 있는 Container Widget의 id를 넣는다.
			 * @param {String|undefined} subid : Basic Widget의 경우 사용 한다. 자산의 subid를 넣는다.
			 * @param {Number|undefined} lineIndex : Listview의 경우에만 사용 한다. Listview의 lineIndex를 넣는다.
			 * @return {dvcRadioButton} dvcRadioButton Widget의 instance
			 */
			getRadioButton : function (id, subid, lineIndex) {
				return dvcRadioButton;
			}
		}
};



