export function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true" className="arrow">{down ? '↓' : '↗'}</span>;
}
