import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; onDismiss: () => void }

export class GalleryBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    if (this.state.failed) return <div role="alert" className="gallery-loading gallery-error">
      <p>Não foi possível abrir a galeria. Recarregue a página para tentar novamente.</p>
      <button type="button" className="text-link" onClick={() => window.location.reload()}>Recarregar</button>
      <button type="button" className="text-link" onClick={this.props.onDismiss}>Fechar aviso</button>
    </div>;
    return this.props.children;
  }
}
