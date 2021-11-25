import React from 'react';

function ReadWindow () {
    const getMessage = (e) => {
        e.preventDefault();
        //console.log(formData);
        const requestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        };
        fetch('/getRandom', requestOptions)
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                document.querySelector('#randomNote').innerHTML = `"<b>${data.note[0].note}"</b></br> - ${data.note[0].name}`;
            })
            .catch((error) => {
                console.log('Message grab error', error);
            });
    }
    return (
        <main>
            <h1>Read Messages</h1>
            <h2>Read a message someone left here!</h2>
            <button onClick={getMessage}>Get Message</button>
            <div><p id="randomNote"></p></div>
        </main>
    );
}


export default ReadWindow;