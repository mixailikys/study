window.onload = init;

//document.addEventListener('click', handleClick);

function init(){
    var button = document.getElementById("add");
    var del = document.getElementById("del");
    button.onclick = addElement;
    
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
    	li.innerHTML = "<span class=text>" + textInput.value + "</span>";
    	ul.appendChild(li);
    	li.appendChild(del);
    	li.appendChild(redact);
    	//alert("Добавить элемент в список?");
    	textInput.value = "";

    	del.setAttribute("type", "button");
    	del.setAttribute("value", "X");
    	del.setAttribute("id", "del");
    	del.onclick = deleteElement;

    	redact.setAttribute("type", "button");
    	redact.setAttribute("value", "Редактировать");
    	redact.setAttribute("class", "redact");
    	redact.onclick = redactElement;
    }
}

function deleteElement() {
	this.parentElement.parentElement.removeChild(this.parentElement);
}

function redactElement() {
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

	confirm.onclick = confirmRedacting;
	cancel.onclick = cancelRedacting;
}

function cancelRedacting() {
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

function confirmRedacting() {
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