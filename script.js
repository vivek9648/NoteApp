const addButton = document.getElementById('add');

//updating/calling back data to text area which are deleting when refreshing my page

const updateLocalStorageData = () =>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) =>{
        return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('MyNotes', JSON.stringify(notes))
}
//------------------------------------------------------------------


const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
                <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
                </div>

                <div class="main ${text ? "" : "hidden" } "></div>
                <textarea class=" ${ text ? "hidden": ""}"></textarea>   `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    // getting the References
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the node
    deleteButton.addEventListener('click', ()=>{
        note.remove();
        updateLocalStorageData(); //To delete data from local storage
    })

    // toggle using edit button

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', ()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })


    textArea.addEventListener('change', (event)=>{
        const value = event.target.value;
        // console.log(value);
        mainDiv.innerHTML = value;
        updateLocalStorageData(); //when i am refreshing my data delete 
                                  // so to save my data into local storage i am creating this function
    })


document.body.appendChild(note)

}

// getting data back from local storage

const bounceBack_StoredLocalNotes = JSON.parse(localStorage.getItem('MyNotes'));

if(bounceBack_StoredLocalNotes){
    bounceBack_StoredLocalNotes.forEach( (curNote) => addNewNote(curNote))
}

addButton.addEventListener('click', ()=> addNewNote());