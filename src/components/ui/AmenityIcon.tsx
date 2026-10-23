import type { AmenityIconName } from '../../data/site';

const paths: Record<AmenityIconName, string> = {
  bed: 'M3 18V8m18 10V8M3 14h18M3 10h18v8M6 10V6h5v4m2 0V6h5v4',
  bath: 'M3 12h18M5 12V5a2 2 0 0 1 4 0M4 12l1 6h14l1-6M7 18v3m10-3v3',
  sofa: 'M5 11V6h14v5M4 10a2 2 0 0 1 2 2v3h12v-3a2 2 0 0 1 4 0v6H2v-6a2 2 0 0 1 2-2ZM5 18v3m14-3v3',
  terrace: 'M3 11h18M5 11v9m14-9v9M3 20h18M12 3l9 8H3l9-8ZM9 14v6m6-6v6',
  hammock: 'M3 4v17m18-17v17M3 8c4 11 14 11 18 0M3 8c5 4 13 4 18 0',
  pool: 'M3 17q3-2 6 0t6 0t6 0M3 21q3-2 6 0t6 0t6 0M8 14V5a2 2 0 0 1 4 0m3 9V5a2 2 0 0 1 4 0M8 9h7m-7 4h7',
  grill: 'M4 10h16a8 8 0 0 1-16 0ZM8 18l-2 4m10-4 2 4M8 3v3m4-4v4m4-3v3',
  shower: 'M5 21V7a4 4 0 0 1 8 0M9 9a4 4 0 0 1 8 0H9Zm2 4v1m4-1v1m-4 3v1m4-1v1',
  beach: 'M3 21h18M12 3v18M3 11a9 9 0 0 1 18 0H3Zm5 0c0-5 2-8 4-8s4 3 4 8',
  kitchen: 'M4 3h16v18H4ZM4 10h16M8 6h2m-2 8h2m4 0h3v4h-3Z',
  utensils: 'M5 3v6m3-6v6M5 6h3M5 9h3m-1.5 0v12M17 3c-3 3-3 8 0 8h2V3m0 8v10',
  wifi: 'M3 8a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 4a4 4 0 0 1 6 0M12 20h.01',
  car: 'M4 10l2-6h12l2 6M3 10h18v8H3Zm2 8v3m14-3v3M6 14h2m8 0h2',
};

export function AmenityIcon({ name }: { name: AmenityIconName }) {
  return <svg className="amenity-icon" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
