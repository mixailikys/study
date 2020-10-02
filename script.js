window.onload = init;

let elements = [];

let number = 1;
//document.addEventListener('click', handleClick);

function init(){
    var button = document.getElementById("add");
    var del = document.getElementById("del");
    const increaseNumbers = document.getElementById("sort1");
    const decreaseNumbers = document.getElementById("sort2");
    const increaseAlphabet = document.getElementById("sort3");
    const decreaseAlphabet = document.getElementById("sort4");
    button.onclick = addElement;
    increaseNumbers.addEventListener('change', increaseNumbersFunc);
    decreaseNumbers.addEventListener('change', decreaseNumbersFunc);
    increaseAlphabet.addEventListener('change', increaseAlphabetFunc);
    decreaseAlphabet.addEventListener('change', decreaseAlphabetFunc);
}

// function handleClick (event) {
// 	if (event.target.id == 'del') {
// 		console.log('надо чето удалить');
// 		return;
// 	}
// 	if (event.target.className == 'redact') {
// 		console.log('надо чето отредачить');
// 	}
// }

function addElement() {
    var textInput = document.getElementById("input");
    if(textInput.value == ""){
    	alert("Пустое текстовое поле");
    } else {
    	var ul = document.getElementById("list");
    	var li = document.createElement("li");
    	var del = document.createElement("input");
    	var redact = document.createElement("input");
    	li.innerHTML = "<span class=number>" + number + "</span>" + " " + "<span class=text>" + textInput.value + "</span>";
    	ul.appendChild(li);
    	li.appendChild(del);
    	li.appendChild(redact);
    	li.setAttribute("id", number)
    	li = {"number": number, "text": textInput.value};  	
    	textInput.value = "";

    	del.setAttribute("type", "button");
    	del.setAttribute("value", "X");
    	del.setAttribute("id", "del");
    	del.onclick = deleteElement;

    	redact.setAttribute("type", "button");
    	redact.setAttribute("value", "Редактировать");
    	redact.setAttribute("class", "redact");
    	redact.onclick = editElement;

    	elements.push(li);

    	number = number + 1;
    }
}

function deleteElement() {

	let index = this.parentElement.id - 1;
	console.log(elements);
	console.log(index);
	elements.splice(index, 1);
	this.parentElement.parentElement.removeChild(this.parentElement);
}

function editElement() {
	var text = this.parentElement.getElementsByClassName("text")[0];
	var del = this.parentElement.querySelector("#del");
	var li = this.parentElement;
	text.style.display = 'none';
	del.style.display = 'none';
	this.style.display = 'none';

	var input = document.createElement("input");
	li.appendChild(input);
	input.setAttribute("type", "text");
	input.setAttribute("value", text.textContent);
	input.setAttribute("class", "input")

	var confirm = document.createElement("input");
	li.appendChild(confirm);
	confirm.setAttribute("type", "button");
	confirm.setAttribute("value", "Подтвердить");
	confirm.setAttribute("class", "confirm");

	var cancel = document.createElement("input");
	li.appendChild(cancel);
	cancel.setAttribute("type", "button");
	cancel.setAttribute("value", "Отмена");
	cancel.setAttribute("class", "cancel")

	confirm.onclick = confirmEditing;
	cancel.onclick = cancelEditing;
}

function cancelEditing() {
	var li = this.parentElement;
	var text = li.getElementsByClassName("text")[0];
	var del = li.querySelector("#del");
	var redact = li.getElementsByClassName("redact")[0];
	text.style.display = 'inline-block';
	del.style.display = 'inline-block';
	redact.style.display = 'inline-block';

	var input = li.getElementsByClassName("input")[0];
	var confirm = li.getElementsByClassName("confirm")[0];
	var cancel = li.getElementsByClassName("cancel")[0];

	input.remove();
	confirm.remove();
	cancel.remove();
}

function confirmEditing() {
	var li = this.parentElement;
	var del = li.querySelector("#del");
	var text = li.getElementsByClassName("text")[0];
	var redact = li.getElementsByClassName("redact")[0];
	text.style.display = 'inline-block';	
	del.style.display = 'inline-block';
	redact.style.display = 'inline-block';

	var input = li.getElementsByClassName("input")[0];
	var confirm = li.getElementsByClassName("confirm")[0];
	var cancel = li.getElementsByClassName("cancel")[0];

	text.textContent = input.value;

	input.remove();
	confirm.remove();
	cancel.remove();
}

function increaseNumbersFunc() {
	elements.sort(function(a, b) {
		if (a.number > b.number) {
			return 1;
		}
		if (a.number < b.number) {
			return -1;
		}
		if (a.number == b.number){
			return 0;
		}
	});
	finalFunc();
}

function decreaseNumbersFunc() {
	elements.sort(function(a, b) {
		if (a.number > b.number) {
			return -1;
		}
		if (a.number < b.number) {
			return 1;
		}
		if (a.number == b.number){
			return 0;
		}
	});
	finalFunc();
}

function increaseAlphabetFunc() {
	elements.sort(function(a,b) {
		if (a.text > b.text) {
			return 1;
		}
		if (a.text < b.text) {
			return -1;
		}
		if (a.text == b.text) {
			return 0;
		}
	});
	finalFunc();
}

function decreaseAlphabetFunc() {
	elements.sort(function(a,b) {
		if (a.text > b.text) {
			return -1;
		}
		if (a.text < b.text) {
			return 1;
		}
		if (a.text == b.text) {
			return 0;
		}
	});
	finalFunc();
}

function finalFunc() {
	let ul = document.getElementById("list");
	ul.innerHTML = "";

    for (let i = 0; i < elements.length; i++) {
    	let li = document.createElement("li");
	    let del = document.createElement("input");
	    let redact = document.createElement("input");
	    ul.appendChild(li);

    	li.innerHTML = "<span class=number>" + elements[i].number + "</span>" + " " + "<span class=text>" + elements[i].text + "</span>";

    	li.appendChild(del);
	    li.appendChild(redact);

    	del.setAttribute("type", "button");
	    del.setAttribute("value", "X");
	    del.setAttribute("id", "del");
	    del.onclick = deleteElement;

	    redact.setAttribute("type", "button");
	    redact.setAttribute("value", "Редактировать");
	    redact.setAttribute("class", "redact");
	    redact.onclick = editElement;
    }  	
}