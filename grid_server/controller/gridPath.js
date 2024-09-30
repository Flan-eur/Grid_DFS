const gridPathFind = (req, res) => {

    const { start, end, grid } = req.body;

    const result = findShortestPath(grid, start, end);
    const formattedResult = result.map(([row, col]) => ({ row, col }));
    res.json({ path: formattedResult });
};

const findShortestPath = (grid, start, end) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const directions = [
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
        [-1, 0]  // up
    ];

    let shortestPath = [];
    let minPathLength = Infinity;

    function depthfs(row, col, path, visited) {
        if (row < 0 || row >= numRows || col < 0 || col >= numCols || grid[row][col] === 1 || visited[row][col]) {
            return;
        }

        path.push([row, col]);

        if (row === end.row && col === end.col) {
            if (path.length < minPathLength) {
                minPathLength = path.length;
                shortestPath = [...path]; 
            }
            path.pop();
            return;
        }

        visited[row][col] = true;

        for (const [dr, dc] of directions) {
            if (path.length + 1 < minPathLength) {  
                depthfs(row + dr, col + dc, path, visited);
            }
        }

        visited[row][col] = false;
        path.pop();
    }

    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

    depthfs(start.row, start.col, [], visited);

    return shortestPath;
};

module.exports = {
    gridPathFind
};
