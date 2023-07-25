import { useState } from "react";
import "./App.css";
import contactsJSON from './contacts.json';



function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => {
        if (contacts.length < contactsJSON.length) {
          let newContact = contactsJSON[Math.floor(Math.random()*contactsJSON.length)];

          console.log(newContact);

          while(contacts.some(person => person.id === newContact.id)){
            newContact = contactsJSON[Math.round(Math.random() * (contactsJSON.length))]
          }

          setContacts(previousContacts => [...previousContacts, newContact])
        }

      }}>Add Random Contact</button>
      <button onClick={() => {
        setContacts([...contacts].sort((a,b) => b.popularity - a.popularity))
      }}>Sort by Popularity</button>
      <button onClick={() => {
        setContacts([...contacts].sort((a,b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

        }))
      }}>Sort by Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.map((oneContact) => {
              return (
                <tr key={oneContact.id}>
                  <td>
                    <img
                      src={oneContact.pictureUrl}
                      alt={oneContact.name}
                      style={{height: "200px"}}
                    />
                  </td>
                  <td>
                    <h3>{oneContact.name}</h3>
                  </td>
                  <td>
                    <h3>{oneContact.popularity}</h3>
                  </td>
                  <td>
                    {oneContact.wonOscar && <p>🏆</p>}
                  </td>
                  <td>
                    {oneContact.wonEmmy && <p>🏆</p>}
                  </td>
                  <td>
                    <button onClick={() => {
                      setContacts([...contacts].filter(elem => elem.id !== oneContact.id));
                      }}>Delete
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
