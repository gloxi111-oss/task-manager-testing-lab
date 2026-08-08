import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm - Accesibilidad', () => {
  it('el campo de texto es accesible por su placeholder', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText(/Escribe el título/i);
    expect(input).toBeTruthy();
  });

  it('el botón Guardar es accesible por su texto', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const button = screen.getByText('Guardar');
    expect(button).toBeTruthy();
  });

  it('el input tiene testID para automatización y accesibilidad', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const input = screen.getByTestId('input-titulo');
    expect(input).toBeTruthy();
  });
});