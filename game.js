let boxs = document.querySelectorAll('.box');
let msg = document.getElementById('msg');
let container = document.querySelector('.msg-container');
let newbtn = document.getElementById('new');
let resetbtn = document.getElementById('reset');
let totalGames = document.querySelector('.total');
let xWins = document.querySelector('.xwin');
let oWins = document.querySelector('.owin');
let turn = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

// Initialize localStorage
const storage = {
    total: parseInt(localStorage.getItem('total')) || 0,
    xWin: parseInt(localStorage.getItem('xWin')) || 0,
    oWin: parseInt(localStorage.getItem('oWin')) || 0,
};

// Update storage display
const updateStorageDisplay = () => {
    totalGames.textContent = `Total Games: ${storage.total}`;
    xWins.textContent = `X Wins: ${storage.xWin}`;
    oWins.textContent = `O Wins: ${storage.oWin}`;
};

updateStorageDisplay();

// Reset game function
let resetGame = () => {
    turn = true;
    enableBoxes();
    container.classList.add('hide');
};

// Disable boxes after a win
let disableBoxes = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};

// Enable boxes for a new game
let enableBoxes = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = '';
    }
};

// Handle each box click
boxs.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn) {
            box.innerText = 'O';
            turn = false;
        } else {
            box.innerText = 'X';
            turn = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Show the winner message
const showWin = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    container.classList.remove('hide');
    disableBoxes();

    // Update localStorage for wins
    if (winner === 'X') {
        storage.xWin++;
        localStorage.setItem('xWin', storage.xWin);
    } else if (winner === 'O') {
        storage.oWin++;
        localStorage.setItem('oWin', storage.oWin);
    }

    storage.total++;
    localStorage.setItem('total', storage.total);
    updateStorageDisplay();
};

// Check if there's a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxs[pattern[0]].innerText;
        let pos2 = boxs[pattern[1]].innerText;
        let pos3 = boxs[pattern[2]].innerText;

        if (pos1 !== '' && pos2 !== '' && pos3 !== '') {
            if (pos1 === pos2 && pos2 === pos3) {
                showWin(pos1);
                return;
            }
        }
    }
    if ([...boxs].every((box) => box.innerText !== '')) {
        msg.innerText = "It's a draw!";
        container.classList.remove('hide');
        storage.total++;
        localStorage.setItem('total', storage.total);
        updateStorageDisplay();
        disableBoxes();
    }

};

// Event listeners for buttons
resetbtn.addEventListener('click', () => {
    resetGame();

    // Clear localStorage
    localStorage.clear();
    storage.total = 0;
    storage.xWin = 0;
    storage.oWin = 0;
    updateStorageDisplay();
});

newbtn.addEventListener('click', resetGame);
