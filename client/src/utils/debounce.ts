export default function debounce(func: Function, delay: number = 1000) {
  let timer: NodeJS.Timeout;
  
  return async function(...args: any) {
    clearTimeout(timer);
    
    return new Promise(resolve => {
      timer = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);
    });
  };
}
