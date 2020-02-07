console.log('complaints Server Started');

//target variables
const complaintList = document.querySelector('.complaintsList');
const brooklynButton = document.querySelector('.brooklyn-btn');
const manhattanButton = document.querySelector('.manhattan-btn');
const queensButton = document.querySelector('.queens-btn');
const bronxButton = document.querySelector('.bronx-btn');
const statenIslandButton = document.querySelector('.staten-island-btn');
let inputBox = document.querySelector('.input');

//create event listener to attach to buttons
brooklynButton.addEventListener('click', showComplaints);
manhattanButton.addEventListener('click', showComplaints);
queensButton.addEventListener('click', showComplaints);
bronxButton.addEventListener('click', showComplaints);
statenIslandButton.addEventListener('click', showComplaints);

//create function that displays data for each button
//store each descriptor in an li element
//append to ul element
function showComplaints(e) {
  let borough;
  let classSelector = e.target.getAttribute('class');
  if (classSelector === 'brooklyn-btn') {
    borough = 'BROOKLYN';
  } else if (classSelector === 'manhattan-btn') {
    borough = 'MANHATTAN';
  } else if (classSelector === 'queens-btn') {
    borough = 'QUEENS';
  } else if (classSelector === 'bronx-btn') {
    borough = 'BRONX';
  } else if (classSelector === 'staten-island-btn') {
    borough = 'STATEN ISLAND';
  }
  fetch(
    `https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${borough}&&agency=NYPD`,
    {
      headers: {
        'x-app-token': 'AmYOjHhTclVxiAsLjvl1VANwk'
      }
    }
  )
    .then(response => response.json())
    .then(function(response) {
      for (let i = 0; i < inputBox.value; i++) {
        if (response[i].resolution_description) {
          let crimeList = document.createElement('li'); //create li
          crimeList.innerText = response[i].descriptor; //store descriptor content to li

          complaintList.appendChild(crimeList); //append to UL
          let resolutionButton = document.createElement('button'); //create button tag
          resolutionButton.innerText = 'WHAT DID THE POLICE DO?'; //store resolution in button
          // resolutionButton.setAttribute('onclick', revealFunction);

          crimeList.appendChild(resolutionButton); //append anchor to li variable
          let resolution = document.createElement('p');
          resolution.innerText = response[i].resolution_description;
          resolution.classList.toggle('hide');
          crimeList.appendChild(resolution);
        }
      }
    });
}

/*TEACHER SOLUTION
const form = document.querySelector('.form')
form.addEventListener('click', handleFormClick); //attach to parent container
complaintsList.addEventListener('click', handleToggleClick); //attach to parent container


function handleFormClick(event){
const userInput = document.querySelector('.inputBox');

const borough = evt.target.dataset.burough;
const url = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${borough}&$limit=${userInput || 10}&agency=NYPD';

clearExistingComplaints();

fetch(url).then(response => response.json()).then(response => {
  for(let i= 0; i < response.length; i++){
    let complaintsListItem = document.createElement('li');
    complaintsListemItem.append(response[i].descriptor);

    //create police do button
    let complaintListItemButton = document.createElement('button');
    complaintListItemButton.innerTexxt = 'What did the police do?';
    complaintListItem.append(complaintListItemButton);

    complaintList.appendChild(complaintsListItem);

    //create police response paragraph
    let policeResponseParagraph = document.createElement('p');
    policeResponseParagraph.innerText = response[i].resolution_description;
    policeResponseParagraph.style.display = 'none';
    complaintListItem.append(policeResponseParagraph);

    complaintList.appendChild(complaintListItem)
  }
});
}

function handleToggleClick(evt){

  if(evt.target.tagName === 'BUTTON'){
    let policeResponseParagraph = evt.target.nextSibling;
    //if police response is shown, then hide it.
   if( policeResponse.style === 'none'){
     policeResponse.style.display = 'block';
   }else {
     policeResponse.style.display = 'none';
   }
  //if police response is hidden, then show it

  }

}

function clearExistingComplaints(){
  //target complaints list
  let child = complaintsList.firstElementChild;
  while(child){ //while theres a child
    complaintsList.removeChild(child); //remove current child
    child = complaintsList.firstElementChild; //add 
  }
}
*/
