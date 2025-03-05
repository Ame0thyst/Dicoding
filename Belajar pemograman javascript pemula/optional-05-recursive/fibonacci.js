/**
 * 
 * @param {number} n 
 * @returns {number[]} 
 */
function fibonacci(n) {
    if (n === 0) {
        return [0];
    }
    if (n === 1) {
        return [0, 1];
    }
    
    const prevFibonacci = fibonacci(n - 1);
    
    const nextElement = prevFibonacci[prevFibonacci.length - 1] + 
                        prevFibonacci[prevFibonacci.length - 2];
    
    return [...prevFibonacci, nextElement];
}

export default fibonacci;