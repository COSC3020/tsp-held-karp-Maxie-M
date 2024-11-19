// code.js
// Maxie Machado 
// TSP Held Karp 

function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;

    if (n == 0) return 0;
    if (n == 1) return 0; 

    const memo = Array.from({ length: n }, () => ({}));

    function heldKarp(mask, pos) {
        if (mask === (1 << n) -1) return 0;

        if (memo[pos][mask] !== undefined) return memo[pos][mask];

        let minCost = Infinity; 

        for (let next = 0; next < n; next++) {
            if (mask & (1 << next)) continue;

            const newMask = mask | (1 << next);
            const cost = distance_matrix[pos][next] + heldKarp(newMask, next);

            minCost = Math.min(minCost, cost);
        }

        memo[pos][mask] = minCost;
        return minCost;
    }

    let result = Infinity; 

    for (let start = 0; start < n; start++) {
        result = Math.min(result, heldKarp(1 << start, start));
    }

    return result;
}
