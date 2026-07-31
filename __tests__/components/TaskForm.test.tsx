import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm', () => {
  it('renderiza el input y el botón Guardar', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText(/Escribe el título/i)).toBeTruthy();
    expect(screen.getByText('Guardar')).toBeTruthy();
  });

  it('llama a onSubmit con el texto escrito', async () => {
    // Mock: aislamos la dependencia del componente padre
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(screen.getByTestId('input-titulo'), 'Comprar pan');
    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith('Comprar pan');
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('no llama a onSubmit si el título está vacío', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('no llama a onSubmit si el título solo tiene espacios', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(screen.getByTestId('input-titulo'), '   ');
    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});