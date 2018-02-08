
function todoReducer(state, action){
	switch(action.type){
		case 'ADDTODO': 
			return {
				...state, 
				todos : action.payload
			}
		case 'REMOVETODO': 
			return {
				...state, 
				todos : action.payload
			}
		case 'EDITTODO': 
			return {
				...state, 
				todos : action.payload
			}
		default :
			return state
	}
}

let store = Redux.createStore(todoReducer , { todos : {}});
let todoList = document.getElementById("todoList");

// store.subscribe(()=>{
// 	var state = store.getState().todos;
// 		});
let index = 0 ;
	
	function addTodo(){
		let inputTodo = document.getElementById("inputTodo").value;
		if(inputTodo.trim() !== ""){
			let todoObj = {
				todo : inputTodo
			}
			
			store.dispatch({type : "ADDTODO", payload : todoObj})
		let state = store.getState().todos;
		let liDiv = document.createElement("DIV");
		liDiv.id = index ;
		liDiv.className = "list-group-item liDiv";		
		let li = document.createElement("LI");
		let liText = document.createTextNode(state.todo);
		let editbtn = document.createElement("BUTTON");
		editbtn.className = 'btn btn-primary btn-sm editbtn';	
		let editbtnText = document.createTextNode("+");	
		editbtn.setAttribute("onClick", `editTodo(${index} , inputTodo.value)`);
		let dltbtn = document.createElement("BUTTON");		
		dltbtn.className = 'btn btn-danger btn-sm dltbtn';	
		let dltbtnText = document.createTextNode("X");
		dltbtn.setAttribute("onClick", "deleteTodo("+index+")");			
		
		
		li.appendChild(liText);
		editbtn.appendChild(editbtnText);
		dltbtn.appendChild(dltbtnText);
		li.appendChild(editbtn);
		li.appendChild(dltbtn);
		liDiv.appendChild(li)
		todoList.appendChild(liDiv)		
		index++;
		}
		else {
			document.getElementById("inputTodo").focus();
			alert("Please enter some value");
		}
	}

	
	function editTodo(index, value){

					
			let editDiv = document.createElement("DIV");
			editDiv.className = "input-group";
			let editInput = document.createElement("INPUT");
			editInput.id = `editInput${index}` ;
			editInput.type = "text" ;
			editInput.className = "form-control col-md-6";
			editInput.value = value; 
			let savebtn = document.createElement("BUTTON");
			savebtn.setAttribute("onClick", "saveTodo(editInput"+index+", "+index+")");
			let savebtnText = document.createTextNode("Save");
			savebtn.className = "btn btn-primary btn-sm";
			savebtn.appendChild(savebtnText);
			editDiv.appendChild(editInput);
			editDiv.appendChild(savebtn);
			document.getElementById(index).appendChild(editDiv); 
			
		
		
		}

	function saveTodo(id, ind){
		let newTodo = id.value;
		if(newTodo.trim() !== ""){

			let todoObj = {
				todo : newTodo
			}
			store.dispatch({type : "EDITTODO", payload : todoObj})
			let state = store.getState().todos;
			let liDiv = document.createElement("DIV");
			liDiv.id = ind;
			liDiv.className = "list-group-item liDiv";		
			let li = document.createElement("LI");
			let liText = document.createTextNode(state.todo);
			let editbtn = document.createElement("BUTTON");
			editbtn.className = 'btn btn-primary btn-sm editbtn';	
			let editbtnText = document.createTextNode("+");	
			editbtn.setAttribute("onClick", `editTodo(${ind} , inputTodo.value, true)`);
			let dltbtn = document.createElement("BUTTON");		
			dltbtn.className = 'btn btn-danger btn-sm dltbtn';	
			let dltbtnText = document.createTextNode("X");
			dltbtn.setAttribute("onClick", "deleteTodo("+ind+")");			
			
			
			li.appendChild(liText);
			editbtn.appendChild(editbtnText);
			dltbtn.appendChild(dltbtnText);
			li.appendChild(editbtn);
			li.appendChild(dltbtn);
			liDiv.appendChild(li);
			todoList.replaceChild(liDiv , todoList.children[ind]);
		}
		else {
			alert("Please enter some value");
			id.focus();			
		}
		
	}	

	function deleteTodo(index){

		todoList.children[index].remove()
	}

	let deleteAll = () =>{
		if(todoList.children.length !== 0){
			
			document.getElementById("todoList").innerHTML = "" ;
		}
		else {
			
			alert("Nothing to delete here...");
			document.getElementById("inputTodo").focus();
			
		}
	}
	