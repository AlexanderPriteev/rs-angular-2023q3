export function getCookie(name: string){
  if(typeof document === 'undefined') return '';
  const map = document.cookie.split('; ')
    .map(e => e.split('='))
    .reduce((s, c) => s.set(c[0], c[1]), new Map<string, string>());
  return map.get(name) || '';
}
