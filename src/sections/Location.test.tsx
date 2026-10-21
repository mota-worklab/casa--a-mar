import { render, screen } from '@testing-library/react';
import { Location } from './Location';

describe('Location', () => {
  it('mostra um mapa da região de Guaibim sem marcar o endereço exato da casa', () => {
    render(<Location />);

    expect(screen.getByTitle('Mapa da região de Guaibim, Bahia')).toBeInTheDocument();
    expect(screen.getByText('O mapa indica a região, não a localização da casa.')).toBeInTheDocument();
  });
});
