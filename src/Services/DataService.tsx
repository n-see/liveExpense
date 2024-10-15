// import { json } from "react-router-dom";
import { User } from "../App";
import { BASE_URL } from "../constant";
import axios from "axios";

//Helper function to check token

let userData= {
    id:0,
    userId: 0,
    publisherName: ""
};
if(localStorage.getItem("UserData")) {
    userData = JSON.parse(localStorage.getItem("UserData")!)
}

const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if (lsData && lsData != null) {
        result = true;
    }
    return result;
};

const createAccount = (createdUser:User) => {
    axios
    .post(BASE_URL + "User/AddUsers", createdUser )
    .then(res => res.data)
    .catch(error => error.message)
};

const login = async (loginUser:User) => {
    let outsideData = "";

    try{
        const res = await axios.post(BASE_URL + "User/Login", loginUser);
        let data = res.data
        outsideData = data.token
        localStorage.setItem("Token", data.token)
        console.log(res);
    } catch(error) {
        console.log(error)
    }
    return outsideData
    
}

const GetLoggedInUser = async (username:string) => {
    let res = await axios 
    .get(BASE_URL + "User/GetUserByUsername/" + username)
    let userData = res.data;
        console.log(userData)
        localStorage.setItem("UserData", JSON.stringify(userData) )
}

const LoggedInData = () => {
    if(!userData && localStorage.getItem("UserData")){
        userData = JSON.parse(localStorage.getItem("UserData")!)
    }
    return userData;
};

const GetItemsByUserId = (UserId: number) => {
    let data;
    axios
    .get(BASE_URL + "Expense/GetItemsByUserId/" + UserId)
    .then(res =>{ 
        data = res.data})
    .catch(error => error.message)
        return data;
}

export {createAccount, checkToken, login, GetLoggedInUser, LoggedInData, GetItemsByUserId}