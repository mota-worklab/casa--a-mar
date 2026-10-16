import { site } from '../../data/site';

export function Footer() {
  return <footer className="site-footer page-shell">
    <a className="wordmark" href="#inicio">casa amar<span>GUAIBIM · BAHIA</span></a>
    <p>Uma casa. Novas histórias.</p>
    <div><span>© {new Date().getFullYear()} {site.name}</span><a href="#inicio">Voltar ao início ↑</a></div>
  </footer>;
}
