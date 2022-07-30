// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const subtmitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** FUNCTIONS **********
const addItem = (e)=> {
    //prevent the form submit default
    e.preventDefault();
    const value = grocery.value;
    //generating an id, just a simple unique id for the moment
    const id = new Date().getTime().toString();
    if(value && !editFlag) {
        createListItem(id, value);
        //display alert
        displayAlert('item added to the list', 'success');
        //show container
        container.classList.add('show-container');
        //add to local storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
        
    }
    else if(value && editFlag) {
        editElement.innerHTML = grocery.value;
        displayAlert("value changed", "success");
        //edit local storage
        editLocalStorage(editID, value);

        //reset to default
        setBackToDefault();
    }
    else{
        console.log(1)
        displayAlert("please enter value", "danger");
    }
};

//display alert

const displayAlert = (text, action) => {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)
    //remove alert
    setTimeout(()=>{
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`)
    },2000);
};

//set back to default
const setBackToDefault = () => {
    grocery.value = '';
    editFlag = false;
    editID = '';
    subtmitBtn.textContent = "submit";
};

//delete list function
const clearItems = () =>{
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((item)=>{
            list.removeChild(item);
        });
    }

    container.classList.remove('show-container');
    displayAlert("empty list", "danger");
    //set back to default
    setBackToDefault();
    // clear items from local storage
    localStorage.removeItem('list');
};

//edit function
const editItem = (e)=>{
    const element = e.currentTarget.parentElement.parentElement
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    subtmitBtn.textContent = "edit";
};

//delete function
const deleteItem = (e)=>{
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    if (list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    //remove item from storage
    removeFromLocalStorage(id);
};

// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
    const grocery = {id:id, value:value}; //or {id, value} in es6 since we wawnt the same variable names
    let items =getLocalStorage();
    items.push(grocery);
    //save the array updated or new
    localStorage.setItem('list',JSON.stringify(items));
};

const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
    items = items.filter((item)=>{
        if(item.id !== id){
            return item;
        }
    });
    localStorage.setItem('list',JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
    let items = getLocalStorage();
    items = items.map((item)=>{
        if (item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list',JSON.stringify(items));
};

const getLocalStorage = ()=> {
   //we check if there is a list array if there is use json parse. if there isnt, pass an empty array
   return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")):[];
}

const createListItem = (id, value) =>{
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
    <div class="tbn-container">
    <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
    <i class="fas fa-trash"></i>
    </button>
    </div>`;

    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);
    //append child
    list.appendChild(element);
}

// ****** SETUP ITEMS **********
const setupItems = ()=>{
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach((item)=>{
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
};


// ****** EVENT LISTENERS **********

//submit form
form.addEventListener('submit',addItem);
// clear item list
clearBtn.addEventListener('click',clearItems);
//load items
window.addEventListener('DOMContentLoaded',setupItems);
