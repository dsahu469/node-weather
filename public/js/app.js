console.log('Client side javascript file is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((parseData) => {
//         console.log(parseData);
//     });
// });

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((parseData) => {
//         console.log(parseData);
//     });
// });

const weatherForm = document.getElementById('weather-form');
const address     = document.getElementById('address');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageBar = document.getElementById('message');
    
    messageBar.classList.remove("invalid-feedback");
    
    messageBar.style.display                             = 'block';
    document.getElementById('messagecard').style.display = 'block';
    messageBar.innerHTML                                 = 'Loading... Please wait..!!!';

    fetch('http://localhost:3000/weather?address=' + address.value + '').then((response) => {
        response.json().then((parseData) => {
            if(parseData.error){
                messageBar.innerHTML     = parseData.error;

                messageBar.classList.add("invalid-feedback");
                messageBar.style.display                             = 'block';
                document.getElementById('messagecard').style.display = 'block';

                return;
            }

            messageBar.innerHTML = "<b>It's " + parseData.location + ". " + parseData.response.description + ", Temperature: " + parseData.response.temperature + ", Feels Like " + parseData.response.feelslike + "</b>";

            messageBar.classList.remove("invalid-feedback");
            messageBar.style.display                             = 'block';
            document.getElementById('messagecard').style.display = 'block';
        });
    });
});