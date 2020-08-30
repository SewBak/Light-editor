const textarea = document.getElementById("main-text");
const body = document.getElementsByTagName("body")[0];
const fonttrigger = document.getElementById("font-trigger");
const finddiv = document.getElementById("find-div");
var bC = fonttrigger.style.backgroundColor;
var c = fonttrigger.style.color;
var isFirefox = typeof InstallTrigger !== 'undefined';
window.continueArr = false;
window.arrcount = -1;
window.found = [];
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
function showObj(id){
	obj = document.getElementById(id);
	obj.style.display = "block";
}
function hideObj(id){
	obj = document.getElementById(id);
	obj.style.display = "none";
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
		if(arrcount >= found.length){
			arrcount = 0;
			continueArr = false;
			textarea.selectionStart = textarea.selectionEnd;
		}
		if(continueArr){
			textarea.setSelectionRange(found[arrcount][0], found[arrcount][1] + 1);
			arrcount++;
			return;
		}
		scroll = false;
		initial = textarea.selectionStart;
		if(textarea.value[textarea.selectionStart] == undefined){
			scroll = true;
		}
		event.preventDefault();
		tabs = 0;
		i = textarea.selectionStart - 1;
		while(textarea.value[i] != "\n" && i >= 0){
			if(textarea.value[i] == "\t" || textarea.value[i] == "{"){
				tabs++;
			}
			else if(textarea.value[i] == "}"){
				tabs--;
			}
			i--;
		}
		if(isFirefox){
			textbefore = textarea.value.substring(0, textarea.selectionStart);
			textafter = textarea.value.substring(textarea.selectionStart, textarea.value.length);
			textbetween = "";
			textbetween += "\n";
			for(i = 0; i < tabs; i++){
				textbetween += "\t";
			}
			textarea.value = textbefore + textbetween + textafter;
			textarea.selectionStart = textbefore.length + textbetween.length;
			textarea.selectionEnd = textarea.selectionStart;
		}
		else{
			document.execCommand('insertText', false, "\n");
			for(i = 0; i < tabs; i++){
				document.execCommand('insertText', false, "\t");
			}
		}
		if(scroll){
			textarea.scrollTop = textarea.scrollHeight;
		}
	}
}
function find(str,event, input){
	str = str.toLowerCase();
	if ((event.keyCode == 13 || event.key == "Enter") && laststr != str){
		event.preventDefault();
		arrcount = 0;
		continueArr = false;
		txt = textarea.value;
		strarr = [];
		window.found = [];
		inword = false;
		start = 0;
		end = 0;
		j = 0;
		for(i = 0; i < txt.length; i++){
			if(txt[i].toLowerCase() != str[j]){
				start = 0;
				j = 0;
				continue;
			}
			else{
				if(j == 0){
					start = i;
				}
				else if(j == str.length - 1){
					end = i;
					found.push([start,end]);
					start = 0;
					j = 0;
					continue;
				}
				j++;
			}
		}
		textarea.focus();
		textarea.setSelectionRange(found[0][0], found[0][1] + 1);
		if(typeof found[1] != "undefined"){
			arrcount = 1;
			continueArr = true;
		}
	}
	window.laststr = str;
}
