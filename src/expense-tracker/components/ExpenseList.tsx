import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import ExpenseForm from "./ExpenseForm";
import categories from "../categories";
import ExpenseFilter from "./ExpenseFilter";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../Services/DataService";

//interfaces/ the layout of how all expense data should look
export interface Expense {
    id: number;
    userId: number;
    description: string;
    amount: number;
    category: string;
}

//props
export interface ExpenseProps {
    fetchData: () => void;
    
}
interface ExpenseProp {
    onLogin: (userInfo:any) => void
}


const ExpenseList = ({onLogin}:ExpenseProp) => {
    let navigate = useNavigate();

    //UseStates

    //UseState that holds UserData from LocalStorage
    const [localS, setLocalS] = useState(() => {
        return localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")!) : {userId: 0, publisherName: ""} 
    })
    //UseState that holds all fetched data from database
    const [data, setData] = useState<Expense[]>([]);
    //UseState that holds category drop down 
    const [selectedCategory, setSelectedCategory] = useState("");
    //UseState that holds the id number of the expense to be edited
    const [editId, setEditId] = useState<number | null>(null);
    //UseState that holds data that will be edited from expense List
    const [editInput, setEditInput] = useState<Expense>({
        id: 0,
        userId: localS.userId,
        description: "",
        amount: 0,
        category: "",
    });

//use effects checks if there is a token in the localStorage if not will return to login page
    useEffect(() => {
        if (!checkToken()) {
            navigate('/')
        }
        else{
            setLocalS(() => {
                return localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")!) : {userId: 0, publisherName: ""}
                
            })
            // loadUserData();
            onLogin(localS);
        
        fetchData();
        }
    }, [])
    
    // variable that holds the expenses from the data base that will be filtered
    const visibleExpense = selectedCategory
        ? data.filter((e) => e.category === selectedCategory)
        : data;

    //Function that will sets id for the expense that will be edited 
    const setEdit = (expense:Expense) => {
        setEditId(expense.id);
        setEditInput(expense);
    };
    //function that saves the changes of a single expense to the database
    const handleSave = () => {
        console.log(editInput)
        axios
            .put(BASE_URL + "Expense/" + editId, editInput)
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setEditInput({
                    ...editInput,
            
                });
                setEditId(null);
            });
    };
    //function that pulls all data from the database 
    const fetchData = () => {
        axios
            .get(BASE_URL + "Expense/GetItemsByUserId/" + localS.userId)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //function that will delete the selected expense from the array and database
    const handleDelete = (id: number) => {
        axios
            .delete(BASE_URL + "Expense/" + id)
            .then(() => fetchData())
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>  
            {/* Form Component that allows user to add an expense  */}
            <ExpenseForm fetchData={fetchData}/>
            <br />
            {/* filter component that will show expenses by category */}
            <ExpenseFilter
                onSelectCategory={(category) => setSelectedCategory(category)}
            />
            <br /> 
            {/* if there is no data in the data useState a text will appear stating there is no data */}
            {data.length == 0 ? <p className="text-center text-danger">No Expenses Added</p> :

            // Table that will display the expenses
            <table className="table table-dark table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {/* maps visibleExpense to display all the data that was fetched from the database */}
                    {visibleExpense.map((expense) => (
                        <tr key={expense.id}>
                            <td>
                                {/* ternary that checks if the editId useState matches the expense's id 
                                    * if it matches it will display an input field to allow the user to edit the expense
                                        - if they don't match, it will just return the non-editable expense as text. */}
                                {editId == expense.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editInput.description}
                                            onChange={(e) =>
                                                setEditInput({
                                                    ...editInput,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    expense.description
                                )}
                            </td>
                            <td>
                                {/* same ternary as above but with the amount instead */}
                                {editId == expense.id ? (
                                    <>
                                        <input
                                            type="text"
                                            
                                            value={editInput.amount}
                                            onChange={(e) =>
                                                setEditInput({
                                                    ...editInput,
                                                    amount: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    expense.amount
                                )}
                            </td>
                            {/* same ternary as above but with the category instead */}
                            <td>
                                {editId == expense.id ? (
                                    <>
                                        <select
                                            id="category"
                                            className="form-select"
                                            onChange={(e) =>
                                                setEditInput({ ...expense, category: e.target.value })
                                            }
                                        >
                                            <option value={editInput.category}>Select a Category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    expense.category
                                )}
                            </td>
                            {/* holds the delete button and an edit button */}
                            <td>
                                <button
                                    className="btn btn-outline-danger m-2"
                                    onClick={() => handleDelete(expense.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-outline-warning "
                                    onClick={() => setEdit(expense)}
                                >
                                    Edit
                                </button>
                                {/* if the edit button is clicked it will set the id to the editId and this will cause the ternary to display and save button and a cancel button within the expense next to the delete and save button */}
                                {editId == expense.id ? (
                                    <>
                                        <button
                                            className="btn btn-outline-success m-2"
                                            onClick={() => handleSave()}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => setEditId(null)}
                                        >
                                            Cancel Edit
                                        </button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>
                            {/* this will take the amount section of the expenses and will add them together to display a total */}
                            {visibleExpense
                                .reduce((acc, expense) => expense.amount + acc, 0)
                                .toFixed(2)}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
}
        </>
    );
};

export default ExpenseList;
