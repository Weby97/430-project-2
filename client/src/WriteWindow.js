import React from 'react';

// class WriteWindow extends React.Component {
function WriteWindow () {
    //constructor(props) {
        //super(props);

        // Using an object to hold all the data in the form.
        const [formData, setFormData] = React.useState({
            name: "",
            note: ""
        });

    //}
    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector('#successMessage').innerHTML = "Sending...";
        //console.log(formData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: formData.name, note: formData.note })
        };
        fetch('/write', requestOptions)
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log(data.status);
                document.querySelector('#successMessage').innerHTML = data.status;
            })
            .catch((error) => console.log('Form submit error', error))
    }
    //render() {
        return (
            <main>
                <h1>Write a Message</h1>
                <h2>Write a message for someone else to read!</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    value={formData.name} 
                    type="text" name="name" id="name"
                    placeholder="Enter your name here" />
                    <br /><br />
                    <label htmlFor="note">Message: </label>
                    <input 
                    onChange={(e) => setFormData({...formData, note: e.target.value})} 
                    value={formData.note} 
                    type="text" name="note" id="note" 
                    placeholder="Write your message here"/>
                    <br /><br />
                    <input className="makeSubmit" type="submit" value="Send Message" />
                </form>

                <div><p id="successMessage"></p></div>
            </main>
        );
    //}
    
}


export default WriteWindow;