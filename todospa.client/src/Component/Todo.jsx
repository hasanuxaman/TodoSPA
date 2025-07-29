import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaTasks } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiBase = 'https://localhost:7076/api/Todos';

function ToDo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const toggleCompleted = async (todo) => {
        const updatedTodo = {
            ...todo,
            isCompleted: !todo.isCompleted,
            completedDate: !todo.isCompleted ? new Date().toISOString() : null
        };

        const response = await fetch(`${apiBase}/ToggleCompletedById/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo)
        });

        if (response.ok) {
            loadTodos();
        }
    };

    const loadTodos = async () => {
        const res = await fetch(`${apiBase}/GetAll`);
        const data = await res.json();
        setTodos(data);
    };

    const addTodo = async () => {
        if (!title.trim()) return;

        const response = await fetch(`${apiBase}/PostToDo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, isCompleted: false, createdDate: new Date().toISOString(), completedDate: null })
        });

        if (response.ok) {
            setTitle('');
            loadTodos();
        }
    };

    const updateTodo = async () => {
        if (!title.trim() || !editingTodo) return;

        const response = await fetch(`${apiBase}/PutById/${editingTodo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editingTodo, title })
        });

        if (response.ok) {
            setEditingTodo(null);
            setTitle('');
            loadTodos();
        }
    };

    const deleteTodo = async (id) => {
        const response = await fetch(`${apiBase}/DeleteById/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) loadTodos();
    };

    const startEdit = (todo) => {
        setEditingTodo(todo);
        setTitle(todo.title);
    };

    // Helper: Date formatting (e.g., '2025-07-29' from ISO string)
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ width: '100%', background: '#f0f2f5', padding: '20px' }}>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col xs={12}>
                        <Card className="h-100 shadow-lg border-0">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center text-primary fs-3 mb-4 d-flex justify-content-center align-items-center gap-2">
                                    <FaTasks />
                                    ToDo List
                                </Card.Title>

                                <Row className="mb-4">
                                    <Col sm={7}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter a task..."
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={5}>
                                        <Button
                                            variant={editingTodo ? 'warning' : 'primary'}
                                            onClick={editingTodo ? updateTodo : addTodo}
                                            className="w-100 d-flex align-items-center justify-content-center gap-2"
                                        >
                                            {editingTodo ? <><FaEdit /> Update</> : <><FaPlus /> Add Task</>}
                                        </Button>
                                    </Col>
                                </Row>

                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    <Table striped bordered hover responsive>
                                        <thead className="table-primary">
                                            <tr>
                                                <th>#</th>
                                                <th>Task</th>
                                                <th>Status</th>
                                                <th>Created Date</th>
                                                <th>Completed Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {todos.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center">No tasks found.</td>
                                                </tr>
                                            ) : (
                                                todos.map((todo, index) => (
                                                    <tr key={todo.id}>
                                                        <td>{index + 1}</td>
                                                        <td className={todo.isCompleted ? 'text-muted text-decoration-line-through' : ''}>
                                                            {todo.title}
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                type="checkbox"
                                                                checked={todo.isCompleted}
                                                                onChange={() => toggleCompleted(todo)}
                                                                className="highlight-checkbox"
                                                            />
                                                        </td>
                                                        <td>{formatDate(todo.createdAt)}</td>
                                                        <td>{formatDate(todo.completedDate)}</td>
                                                        <td>
                                                            <Button
                                                                variant="outline-warning"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => startEdit(todo)}
                                                                title="Edit"
                                                            >
                                                                <FaEdit />
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => deleteTodo(todo.id)}
                                                                title="Delete"
                                                            >
                                                                <FaTrash />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ToDo;
