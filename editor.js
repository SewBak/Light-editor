const textarea = document.getElementById("main-text");
const fonttrigger = document.getElementById("font-trigger");
const body = document.getElementsByTagName("body")[0];
var bC = fonttrigger.style.backgroundColor;
var c = fonttrigger.style.color;
var isFirefox = typeof InstallTrigger !== 'undefined';
if(isFirefox){
	alert("You are on an unsupported browser.\nThe buttons 'Undo' and 'Redo' in the 'Edit' section will not work.\nCTRL+Z and CTRl+Y still work (also avoid using TABs)")
}
function runTextAsJS(){
	eval(textarea.value);
}
function downloadFile(text, name, type, id) {
	text = text.replace(/\n/g, "\r\n");
	var a = document.getElementById(id);
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
}
function onHoverChangeStyle(){
	fonttrigger.style.backgroundColor = "#242424";
	fonttrigger.style.color = "#4a6eff";
	fonttrigger.style.borderRight = "2px solid #4a6eff"
}
function revertStyle(){
	fonttrigger.style.backgroundColor = bC;
	fonttrigger.style.color = c;
	fonttrigger.style.border = "2px solid transparent";
}
function checkKey(event){
	key = event.key;
	code = event.keyCode;
	if(key == "Tab" || code == 9){
		event.preventDefault();
		if(isFirefox) { 
			textarea.value += "\t";
		}
		else{
			document.execCommand('insertText', false, "\t");
		}
	}
	else if(key == "Enter" || code == 13){
		event.preventDefault();
		tabs = 0;
		i = textarea.selectionStart - 1;
		while(textarea.value[i] != "\n" && i >= 0){
			console.log(i);
			if(textarea.value[i] == "\t" || textarea.value[i] == "{"){
				tabs++;
			}
			else if(textarea.value[i] == "}"){
				tabs--;
			}
			i--;
		}
		if(isFirefox){
			textarea.value += "\n";
			for(i = 0; i < tabs; i++){
				textarea.value += "\t";
			}
		}
		else{
			document.execCommand('insertText', false, "\n");
			for(i = 0; i < tabs; i++){
				document.execCommand('insertText', false, "\t");
			}
		}
	}
} 
