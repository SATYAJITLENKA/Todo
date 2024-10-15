import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "./redux/todoSlice";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// npm install @mui/material @emotion/react @emotion/styled @mui/icons-material


function App() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleUpdate = () => {
    if (editId && input) {
      dispatch(updateTodo({ id: editId, text: input }));
      setInput("");
      setEditId(null);
    }
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        To Do List
      </Typography>
      <Paper style={{ padding: "16px" }}>
        <TextField
          label="Add a new todo"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editId ? handleUpdate : handleAdd}
          style={{ marginTop: "16px" }}
        >
          {editId ? "Update Todo" : "Add Todo"}
        </Button>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.text} />
              <IconButton onClick={() => handleEdit(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;