import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Todo from './Todo';

// validation
import * as yup from 'yup';
import schema from '../validate/NewTodoSchema';

// styling and icons
import '../style/TodoList.css'
import searchIcon from '../image/search_icon.png'

// styled components
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    border: 3px solid black;
    border-radius: 10px;
    width: 80%;
`;

const StyledInputContainer = styled.div`
    padding: 8%;
    display: flex;
    justify-content: space-around;
    border-bottom: 3px solid black;
    width: 85%;
`;
const StyledDivHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const StyledInput = styled.input`
    height: 6vh;
    width: 70%;
    border-radius: 30px;
    font-size: 1.15rem;
    max-height: 10vh;
    @media (min-width: 600px) {
        width: 100%;
        margin-left: 3%;
    }
`;
const StyledSearchBtn = styled.button`
    border-radius: 30px;
    margin-left: 15%;
   
    color: white;
    background: blue;
    @media (min-width: 600px) {
        width: 20%;
        font-size: 1.5rem;
        padding: 0px;
    }
`;
const StyledError = styled.div`
    color: red;
    font-size: 0.7rem;
    padding-left: 8%;
    margin-bottom: 3%;
`;
const StyledButton = styled.button`
    border: 2px solid #1890ff;
    color: white;
    background: blue;
    margin: 4% 8% 0 0;
    padding:10px;
`;
const StyledForm = styled.form`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 5%;
`;

const StyledSaveInput = styled.input`
    margin-left: 10%;    
    height: 4vh;
    width: 70%;
    font-size: 1.15rem;
`;
const StyledSaveBtn = styled.button`
    border: 2px solid black;
    color: white;
    font-weight: 900;
    background: black;
    margin: .5% 5% 0 0;
    width: 25%;
    height: 4vh;
`;

const StyledAddDiv = styled.div`
    border-bottom: 3px solid black;
    width: 100%;
`;

const StyledTodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

// initial state and error values
const initialFormErrors = {
    newtodo: ''
}
const initialValues = {
    newtodo: ''
}



const TodoList = () => {
    const { push } = useHistory();
    const [searchInput, setSearchInput] = useState('')
    // gets todo list saved in the local storage.
    const [todos, setTodos] = useState(() => {
        return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')): []
    })
    const [newTodo, setNewTodo] = useState(initialValues)
    const [errors, setErrors] = useState(initialFormErrors);
    const [addTodo, setAddTodo] = useState(false)
    const [disabled, setDisabled] = useState(true);

  

    // updates local storage every time list changes and runs schema through new a todo
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos))
        schema.isValid(newTodo).then(valid => setDisabled(!valid));
    }, [todos, newTodo])


      // yup validate
      const setFormErrors = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: '' }))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
      };

    // add a new todo
    const submitNewTodo = e => {
        e.preventDefault()
        const incomingTodo = {
            id: Math.floor(Math.random()*100000),
            text: newTodo
        }
        if (todos.length === 0) {
            setTodos([incomingTodo])
        } else(
            setTodos([...todos, incomingTodo])
        )
        setAddTodo(false)
        setNewTodo('')
    }

    // reveals the addTodo row after clicking on "New" button
    const showAddTodo = () => {
        setAddTodo(true)
    }

    const onChangeNewTodo = (e) => {
        const { name, value } = e.target;
        setFormErrors(name, value); 
        setNewTodo({...newTodo, [e.target.name]: value})
      };

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value)
      };

      const logoutHandler = e => {
          push('/')
      }
    
    // filters todo list based on search input
    const filteredList = todos.filter((item) => {
        return item.text.newtodo.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    })

    return (
        <StyledContainer>
            <StyledDivHeader>
                <StyledButton onClick={logoutHandler}>Logout</StyledButton>
            </StyledDivHeader> 
            <h1>My To-Do List</h1>
            <StyledDiv>
                <StyledInputContainer>
                    <label>
                    <div className='input-container'>
                        <img className='icons' alt='magnifying glass icon' src={searchIcon}/>
                        <StyledInput 
                            value={searchInput}
                            onChange={onChangeSearch}
                            name="searchinput"
                            type="text"
                            placeholder="search"
                        />
                    </div>
                    </label>
                    <StyledSearchBtn onClick={showAddTodo}>New</StyledSearchBtn>
                </StyledInputContainer>
                {addTodo &&
                <StyledAddDiv>
                <StyledForm onSubmit={submitNewTodo}>
                    <label>
                    <StyledSaveInput 
                        value={newTodo.newtodo}
                        onChange={onChangeNewTodo}
                        name="newtodo"
                        type="text"
                        placeholder="new todo"
                    />
                    </label>
                    <StyledSaveBtn disabled={disabled}>Save</StyledSaveBtn>
                </StyledForm>
                <StyledError>
                        {errors.newtodo ? `${errors.newtodo}` : ''}
                </StyledError>
                </StyledAddDiv> 
                }
                <StyledTodoContainer>
                {filteredList.map(todo => {
                    return (
                        <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                    )
                })}
                </StyledTodoContainer>
            </StyledDiv>
        </StyledContainer>
    )
}

export default TodoList