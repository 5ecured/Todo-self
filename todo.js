/* This todo project is good for teaching fundamentals and the DOM*/

const search = document.querySelector('.search');
const addButton = document.getElementById('addButton');
const list = document.querySelector('.list');
const toggleAllButton = document.getElementById('toggleAllButton');
const saveButton = document.getElementById('saveButton');
const deleteButton = document.getElementById('deleteButton');
search.value = '';

list.innerHTML = localStorage.getItem('data');

let reAddDelete = list.querySelectorAll('button');
reAddDelete.forEach(x => x.addEventListener('click', del));

let reAddEdit = list.querySelectorAll('li');
reAddEdit.forEach(x => x.addEventListener('click', toggle));
reAddEdit.forEach(x => x.addEventListener('dblclick', edit));


//No display function. I display straight away after adding an item, by displaying it to the DOM.
function addItem() {
    //2 lines below, followed by 'list.append(li)' is what displays it to the DOM. No need for a display function
    let li = document.createElement('li');
    li.textContent = search.value; 
    
    li.addEventListener('dblclick', edit);
    li.addEventListener('click', toggle);

    let button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', del) 

    li.append(button); //So at this stage, there will be three childnodes within 'li' : [0] will be the name, [1] will be the done or not, [2] will be the X button
    
    list.append(li);

    search.value = '';
}

function addItemEnter(e) {
    if(e.keyCode === 13) addItem();
}

function del() {
    this.parentNode.parentNode.removeChild(this.parentNode) //'This' is button. go up to <li>. go up to <ul>. then remove the <li>
}

function edit() {
    /* Store the existing text and make it blank. this.childNodes[0] is the text, this.childNodes[1] is the X button */
    let text = this.childNodes[0].data; 
    if(text === undefined) text = this.childNodes[0].value; //This is to make sure that dblclicking a 2nd time will not say 'undefined'
    this.removeChild(this.childNodes[0]) 

    /* Create new input area and put the stored text in it */
    let input = document.createElement('input');
    input.value = text;
    
    /* Remember this.childNodes[0] was deleted above. So now, it becomes the X button */
    this.insertBefore(input, this.childNodes[0])
    
    this.addEventListener('keydown', e => {
        if(e.keyCode === 13) {
            /* Literally same logic as above, at the start of 'edit' function */
            let value = input.value;
            this.removeChild(this.childNodes[0]);

            /* Create a normal text node whose value will be the new input's value, and insert it before the X button */
            let string = document.createTextNode(input.value)
            this.insertBefore(string, this.childNodes[0])
        }
    })    
}

function toggle() {
    /*Because I added another element to 'li', childNodes[0] is the name, [1] is the done or not, [2] is the X button*/
    // this.childNodes[1].data === '[ ]' ? (this.childNodes[1].data = '[X]') : (this.childNodes[1].data = '[ ]')

    this.classList.toggle('strike');
}

function toggleAllFunc() {
    let li = document.querySelectorAll('li');
    let length = li.length;
    let helper = 0;

    li.forEach(x => {
        if(x.classList.contains('strike')) {
            helper += 1;
        }
    })

    if(helper === length) {
        li.forEach(x => {
            x.classList.remove('strike');
        })
    } else {
        li.forEach(x => {
            x.classList.add('strike')
        })
    }
}

function save() {
    localStorage.setItem('data', list.innerHTML)
}

function deleteFunc() {
    localStorage.removeItem('data');
    list.innerHTML = '';
}

addButton.addEventListener('click', addItem);
search.addEventListener('keydown', addItemEnter);
toggleAllButton.addEventListener('click', toggleAllFunc)
saveButton.addEventListener('click', save)
deleteButton.addEventListener('click', deleteFunc)