let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            return board[a];
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        return 'T';
    }

    return null;
}

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        const cell = document.getElementById('board').children[index];
        cell.innerText = currentPlayer;
        cell.style.pointerEvents = 'none'; // Disable further clicks on this cell
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const winner = checkWin();
        if (winner) {
            const resultElement = document.getElementById('result');
            if (winner === 'T') {
                resultElement.innerText = "It's a tie!";
            } else {
                resultElement.innerText = `${winner} wins!`;
            }
        }
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.style.pointerEvents = 'auto'; // Re-enable cell clicks
    });
    document.getElementById('result').innerText = '';
}

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

document.getElementById('result').innerText = '';
