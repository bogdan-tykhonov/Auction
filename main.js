


function addListeners(node){
    node.addEventListener('click', selectEvent);
    if(node.querySelector('.edit-btn')){
        node.querySelector('.edit-btn').addEventListener('click', editEvent);
        node.querySelector('.check-btn').addEventListener('click', updateEvent);
        node.querySelector('.delete-btn').addEventListener('click', deleteEvent);
    }
    if(node.querySelector('input')){
        const currInput = node.querySelector('input');
        const data = node.querySelector('input').value;
        node.querySelector('input').addEventListener('blur', () => {returnPreviousVal(currInput, data)});
        node.querySelector('input').addEventListener('blur', ()=>{updateEvent.call(currInput)});
    }
}

function returnPreviousVal(currInput, data){
    let filteredData = data.split(' ').slice(1).join(' ');
    console.log(currInput.value);
    if(currInput.value.length == 0){
        console.log(filteredData);
    currInput.value = filteredData;
    }
}

function changeIndex(node){
    if(!node.tagName) return;
    const index = +node.getAttribute('data-index');
    const options = document.querySelectorAll('.custom-select .custom-option');
    for(let option of options){
        if(+option.getAttribute('data-index') < index) continue;
        const data = option.querySelector('input').value.split(' ').slice(1).join(' ');
        const currIndex = option.getAttribute('data-index');
        option.querySelector('input').value = `${+currIndex-1}. ${data}`;
        option.setAttribute('data-index', +currIndex-1);
    }
}

function deleteEvent(){
   const prevNode =  this.closest('.custom-option').previousElementSibling;
   const nextNode = this.closest('.custom-option').nextElementSibling;
   const isSelected = this.closest('.custom-option').classList.contains('selected');
   this.closest('.custom-option').remove();
   if(isSelected) selectEvent.call(prevNode);
   if(nextNode) changeIndex(nextNode);
}

function updateEvent(){
    const data = this.closest('.custom-option').querySelector('input').value;
    const index = this.closest('.custom-option').getAttribute('data-index');
    this.closest('.custom-option').querySelector('input').value = `${index}. ${data}`;
    this.closest('.custom-option').querySelector('input').disabled = true;
    this.closest('.custom-option').querySelector('.check-btn').style.display = 'none';
    this.closest('.custom-option').querySelector('.edit-btn').style.display = 'block';
    if(this.closest('.custom-option.selected')){
        this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.closest('.custom-option').querySelector('input').value
    }
}

function selectEvent(){
    if (!this.classList.contains('selected') && this.parentNode) {
        if(this.parentNode.querySelector('.custom-option.selected')){
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
        }
        
        this.classList.add('selected');
        this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.querySelector('input').value;
    }
};

function editEvent(){
    unadleInput.call(this.closest('.custom-option'));
    this.closest('.custom-option').querySelector('.edit-btn').style.display = 'none';
}

function unadleInput(e){
    if(e && e.target.classList.contains('select-btn')) return;
    this.querySelector('input').disabled = false;
    this.querySelector('input').value = '';
    this.querySelector('input').focus();
    this.querySelector('.select-btn').style.display = 'block';
}






function createNewEvent(data){
    const newEvent = document.createElement('span');
    let lastIndex = document.querySelector('.custom-select .custom-option:last-child') 
    ? document.querySelector('.custom-select .custom-option:last-child').getAttribute('data-index')
    : 0;
    const newInput = document.createElement('input');
    const newBtnRow = document.createElement('div');
    newEvent.className = 'custom-option';
    newEvent.setAttribute('data-index', +lastIndex+1);
    newEvent.setAttribute('data-value', 5);
    newInput.value = `${+lastIndex+1}. ${data}`;
    newInput.disabled = true;
    newBtnRow.className = 'btn-row';
    newBtnRow.innerHTML = '\
    <img class="select-btn check-btn" src="check.png" alt="">\
    <img class="select-btn edit-btn" src="edit.png" alt="">\
    <img class="select-btn delete-btn" src="delete.png" alt="">';
    newEvent.append(newInput);
    newEvent.append(newBtnRow);
    document.querySelector('.custom-options').append(newEvent);
    addListeners(newEvent);
}

document.querySelector('.custom-select-wrapper').addEventListener('click', function(e){
    if(e.target.closest('.add-event')){
        return;
    }else if(e.target.closest('.btn-row')){
        return;
    }else if(e.target.tagName == 'INPUT' && e.target.disabled == false) return;
    this.querySelector('.custom-select').classList.toggle('open');
    this.querySelector('.add-event input').value = 'Add new Event';
    this.querySelector('.add-event input').disabled = true;
    this.querySelector('.select-btn').style.display = 'none';
})


for (const option of document.querySelectorAll(".custom-option")) {
    addListeners(option);
};

window.addEventListener('click', function(e) {
    const select = document.querySelector('.custom-select');
    if(e.target.closest('.add-event')){
        return;
    }else if(e.target.closest('.btn-row')){
        return;
    }else if(e.target.tagName == 'INPUT' && e.target.disabled == false) return;
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

document.querySelector('.custom-select .add-event').addEventListener('click', unadleInput);

document.querySelector('.custom-select .add-event .select-btn').addEventListener('click', function(){
   const data = this.closest('.add-event').querySelector('input').value;
   this.closest('.add-event').querySelector('input').disabled = true;
   this.closest('.add-event').querySelector('input').value = 'Add new Event';
   this.style.display = 'none';
   createNewEvent(data);
   
})
