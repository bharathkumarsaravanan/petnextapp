"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({id: "", name: ""});
  axios.defaults.baseURL = "http://localhost:3000/api";

  useEffect(() => {
    axios.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const userInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    axios.post("/users", newUser).then((response) => {
      setUsers(response.data.users);
    });
  }

  const deleteUser = (id) => {
    console.log(id);
    axios.delete(`/users`, {data: {id}}).then((response) => {
      setUsers(response.data.users);
    });
  };

  return (
    <div>
      <h1>Users</h1>
      <input 
        type="number" 
        placeholder="ID" 
        name="id"
        value={newUser.id}
        onChange={userInputChange}
        className="rounded-sm bg-gray-900 px-5 py-2 mx-5 my-8 text-gray-400 placeholder-gray-700"
        />
      <input 
        type="text" 
        placeholder="Name" 
        name="name"
        value={newUser.name}
        onChange={userInputChange}
        className="rounded-sm bg-gray-900 px-5 py-2 mx-5 my-8 text-gray-400 placeholder-gray-700"
        />
      <button 
        className="px-6 py-2 bg-gray-800 rounded-sm "
        disabled={newUser.id === "" || newUser.name === ""}
        onClick={addUser}
        >Add</button>
      <ul className="ml-20">
        {users.map((user) => (
          <li key={user.id} className=" w-64 my-2 flex items-center justify-between">
            <span>{user.name}</span>
            <button 
              className="px-6 py-2 bg-gray-800 rounded-sm"
              onClick={() => deleteUser(user.id)}
              >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
