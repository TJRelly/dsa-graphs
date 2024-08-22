class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value;
        this.adjacent = adjacent;
    }
}

class Graph {
    constructor() {
        this.nodes = new Set();
    }

    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        this.nodes.add(vertex);
    }

    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
        for (let vertex of vertexArray) {
            this.nodes.add(vertex);
        }
    }

    // this function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(vertex) {
        this.nodes.delete(vertex);
    }

    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
        const visited = new Set();
        const result = [];

        function traverse(vertex) {
            // base case
            if (!vertex) return;

            // visit node
            visited.add(vertex);
            result.push(vertex.value);

            // visit neighbors
            vertex.adjacent.forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    traverse(neighbor);
                }
            });
        }

        traverse(start);

        return result;
    }

    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        let queue = [start];
        const seen = new Set(queue);
        const results = [];

        while (queue.length > 0) {
            let curr = queue.shift();
            results.push(curr.value);

            for (let node of curr.adjacent) {
                if (!seen.has(node)) {
                    seen.add(node);
                    queue.push(node);
                }
            }
        }

        return results;
    }
}

module.exports = { Graph, Node };
