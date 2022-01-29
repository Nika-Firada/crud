const userList = document.querySelector('.usersList');
const url = 'http://api.kesho.me/v1/user-test/index';
const button = document.querySelector('#add-user');
let output = '';
const addUserForm = document.querySelector('.add-new-user');
//////---ინფოს----////////////////////////////////////////////////////////////////
const renderUser = (users) =>{
    users.forEach(user => {
        output += `
            <div class="user" data-id=${user.id}>
                <p class="id">ID: ${user.id}</p>
                <p class="email">email: ${user.email}</p>
                <p class="first-name">first_name:  ${user.first_name}</p>
                <p class="last-name">last_name:  ${user.last_name}</p>
                <p class="gender">gender:  ${user.gender}</p>
                <p class="mob-num">mobile:  ${user.mobile}</p>
                <p class="pers-num">personal_number:  ${user.pn}</p>
                <p class="zip">zip code:  ${user.zip}</p>
                <p class="status">status:  ${user.status}</p>
                <a href="#" id="edit">Edit</a>
                <a href="#" id="delete">Delete</a>
            </div>`;
    });
    userList.innerHTML = output;
}
////
fetch(url)
    .then(res => res.json())
    .then(data=>renderUser(data))

userList.addEventListener('click', (e)=>{
    e.preventDefault();
    let deleteButtonPresed = e.target.id == 'delete';
    let editButtonPresed = e.target.id == 'edit';
    let id = e.target.parentElement.dataset.id;
    //--delete---//
    if(deleteButtonPresed){
        fetch(`${url}/${id}`,{
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(()=> location.reload())
    }

    //--target-edit--//
    if(editButtonPresed){
        const parent = e.target.parentElement;
        let idContent = parent.querySelector('.id').textContent;
        let emailContent = parent.querySelector('.email').textContent;
        let fnContent = parent.querySelector('.first-name').textContent;
        let lnContent = parent.querySelector('.last-name').textContent;
        let genderContent = parent.querySelector('.gender').textContent;
        let mobContent = parent.querySelector('.mob-num').textContent;
        let persContent = parent.querySelector('.pers-num').textContent;
        let zipContent = parent.querySelector('.zip').textContent;
        let statusContent = parent.querySelector('.status').textContent;

        /////////////////////////////////////////
        userIdValue.value = idContent;
        firstNameValue.value = fnContent;
        lastNameValue.value = lnContent;
        zipValue.value = zipContent;
        personalNumberValue.value = persContent;
        mobileNumberValue.value = mobContent ;
        genderValue.value = genderContent;
        emailValue.value = emailContent;
        ustatusValue.value = statusContent;
    }
    ///update--/
    ////
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        fetch(`${url}/${id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                user_id: userIdValue.value,
                first_name: firstNameValue.value,
                last_name: lastNameValue.value,
                zip: zipValue.value,
                personal_number: personalNumberValue.value,
                mobile_number: mobileNumberValue.value,
                gender: genderValue.value,
                email: emailValue.value,
                ustatus: ustatusValue.value,
            })
        })
            .then(res => res.json())
            .then(()=> location.reload())
    })
});

/////////////////////////////////////////////////////////////////////////////////////////////////

const userIdValue = document.getElementById('user_id');
const firstNameValue = document.getElementById('first_name');
const lastNameValue = document.getElementById('last_name');
const zipValue = document.getElementById('zip');
const personalNumberValue = document.getElementById('personal_number');
const mobileNumberValue = document.getElementById('mobile_number');
const genderValue = document.getElementById('gender');
const emailValue = document.getElementById('email');
const ustatusValue = document.getElementById('ustatus');
////
addUserForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userIdValue.value,
            first_name: firstNameValue.value,
            last_name: lastNameValue.value,
            zip: zipValue.value,
            personal_number: personalNumberValue.value,
            mobile_number: mobileNumberValue.value,
            gender: genderValue.value,
            email: emailValue.value,
            ustatus: ustatusValue.value,

        })
    })
        .then(res => res.json())
        .then(data=> {
            const userArr = [];
            userArr.push(data);
            renderUser(userArr);
        })
})

//////modal-----------
// const editBtn = document.getElementById('edit');
// const modalAppear = document.querySelector('#modal-appear');
// modalAppear.addEventListener('click', () =>{
//     addUserForm.classList.add('modal-active');
    
// });
// editBtn.addEventListener('click', (e) =>{
//     addUserForm.classList.add('modal-active');
    
// });

// const modalClose = document.querySelector('#modal-close');
// modalClose.addEventListener('click', ()=>{
// addUserForm.classList.remove('modal-active');
// });
