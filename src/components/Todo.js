import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

// validation
import * as yup from 'yup';
import schema from '../validate/TodoSchema.js';

// icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// styled components
const StyledTodo = styled.div`
    width: 100%;
    border-bottom: 3px solid black;
`;
const StyledAddDiv = styled.div`
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
const StyledError = styled.div`
    color: red;
    font-size: 0.7rem;
    padding-left: 8%;
    margin-bottom: 3%;
`;
const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
`;

const StyledP = styled.p`
    max-width: 75%;
    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
`;
const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;


// initial values
const initialFormErrors = {
    edittodo: ''
}
const initialValues = {
    edittodo: ''
}


const Todo = props => {
    const {todo, todos, setTodos} = props
    const [editing, setEditing] = useState(false)
    const [editInput, setEditInput] = useState(initialValues)
    const [errors, setErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(editInput).then(valid => setDisabled(!valid));
      }, [editInput]);


    const setFormErrors = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: '' }))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
      };

      const onChangeNewTodo = (e) => {
        const { name, value } = e.target;
        setFormErrors(name, value); 
        setEditInput({...editInput, [e.target.name]: value})
      };


    const editTodo = textValue => {
        setEditInput({...editInput, edittodo: textValue})
        setEditing(true)
    }

    const saveEdits = e => {
        e.preventDefault()
        let updatedTodo = todo
        updatedTodo.text.newtodo = editInput.edittodo
        let updatedTodoList = [...todos]
        let index = updatedTodoList.findIndex(
            el => el.id === todo.id
        )
        updatedTodoList.splice(index, 1, updatedTodo)
        setEditing(false)
    }

    const deleteTodo = textValue => {
        const updatedList = todos.filter(todo => {
            return todo.text.newtodo !== textValue
        })
        setTodos(updatedList)
    }


    return (
        <StyledTodo>
        {editing ? 
            <StyledAddDiv>
                <StyledForm onSubmit={saveEdits}>
                    <label>
                    <StyledSaveInput 
                        value={editInput.edittodo}
                        onChange={onChangeNewTodo}
                        name="edittodo"
                        type="text"
                        placeholder="new todo"
                    />
                    </label>
                    <StyledSaveBtn disabled={disabled}>Save</StyledSaveBtn>
                </StyledForm>
                <StyledError>
                        {errors.edittodo ? `${errors.edittodo}` : ''}
                </StyledError>
            </StyledAddDiv>
        :
        <StyledDiv>
            <StyledP>{todo.text.newtodo}</StyledP>
            <IconContainer>
            <EditIcon onClick={() => editTodo(todo.text.newtodo)}></EditIcon>
            <DeleteIcon onClick={() => deleteTodo(todo.text.newtodo)}></DeleteIcon>
            </IconContainer>
        </StyledDiv>}
        </StyledTodo>
    )
}


export default Todo