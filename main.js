function getInputUtilisateur() {
    let form = document.getElementById('formElement'); // Use the form element instead of the input
    let input = document.getElementById('inputTexte'); // Input field

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        let reponse = input.value.trim().toLowerCase(); // Get and format the input value
        gererInput(reponse); // Call your handling function
    });
}

getInputUtilisateur();

function gererInput(param) {
    console.log(param); // Output the input value to the console
}
