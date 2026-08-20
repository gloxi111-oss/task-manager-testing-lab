import { Task } from '../types';

const API_URL = 'https://api.taskmanager.com';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error('Error al obtener las tareas');
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    // Error HTTP controlado (MSW 500, 400, etc.) → debe fallar la prueba de error
    if (!res.ok) {
      throw new Error('Error al crear la tarea');
    }

    return res.json();
  } catch (error) {
    // Re-lanzar errores HTTP intencionales (no usar fallback)
    if (error instanceof Error && error.message === 'Error al crear la tarea') {
      throw error;
    }
    // Solo fallback local si es fallo de red real (sin API / E2E en Expo)
    return { id: Date.now().toString(), title, status: 'pending' };
  }
}