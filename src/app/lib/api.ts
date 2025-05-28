const BASE_URL = 'http://localhost:5237/api/tasks';

export const fetchTasks = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
}

export const createTask = async (text: string) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, completed: false }),
    });
    return res.json();
}

export const deleteTask = async (id: string) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}

export const updateTask = async (id: string, updateData: any) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
    });
}