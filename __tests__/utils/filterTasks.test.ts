import { filterTasksByStatus } from '../../src/utils/filterTasks';
import { Task } from '../../src/types';

const tasks: Task[] = [
  { id: '1', title: 'Comprar leche', status: 'pending' },
  { id: '2', title: 'Estudiar Jest', status: 'completed' },
  { id: '3', title: 'Hacer ejercicio', status: 'pending' },
];

describe('filterTasksByStatus', () => {
  it('devuelve todas las tareas cuando el status es "all"', () => {
    expect(filterTasksByStatus(tasks, 'all')).toEqual(tasks);
  });

  it('filtra solo las tareas pendientes', () => {
    const result = filterTasksByStatus(tasks, 'pending');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Comprar leche');
  });

  it('filtra solo las tareas completadas', () => {
    const result = filterTasksByStatus(tasks, 'completed');
    expect(result).toHaveLength(1);
    expect(result.map((t) => t.id)).toContain('2');
  });

  it('devuelve un array vacío si no hay tareas del status pedido', () => {
    const result = filterTasksByStatus(tasks, 'archived');
    expect(result).toEqual([]);
  });

  it('lanza error cuando el status es inválido', () => {
    expect(() => filterTasksByStatus(tasks, 'invalid' as any)).toThrow(
      'Estado inválido'
    );
  });

  it('lanza error con status vacío (caso límite)', () => {
    expect(() => filterTasksByStatus(tasks, '' as any)).toThrow();
  });
});