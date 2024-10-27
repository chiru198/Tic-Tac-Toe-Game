import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import crossIcon from '../cross.png';
import circleIcon from '../circle.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (num) => {
        if (lock || data[num]) return;

        const newData = [...data];
        newData[num] = count % 2 === 0 ? 'x' : 'o';
        setData(newData);
        setCount(count + 1);
        checkwin(newData);
    };

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        titleRef.current.classList.remove('congratulations'); // Reset styles
        titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>'; // Reset title
    };

    const checkwin = (currentData) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
                won(currentData[a]);
                return;
            }
        }

        // Check for draw
        if (currentData.every(cell => cell)) {
            titleRef.current.innerHTML = 'It\'s a Draw!';
            setLock(true); // Lock the game
        }
    };

    const won = (winner) => {
        setLock(true);
        alert(`Player ${winner.toUpperCase()} wins!`);
        titleRef.current.innerHTML = `Congratulations: <img src="${winner === 'x' ? crossIcon : circleIcon}" alt="${winner.toUpperCase()}" />`;
        titleRef.current.classList.add('congratulations');
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                {[0, 1, 2].map((row) => (
                    <div className={`row${row + 1}`} key={row}>
                        {[0, 1, 2].map((col) => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    className="boxes"
                                    onClick={() => toggle(index)}
                                    key={index}
                                >
                                    {data[index] === 'x' && <img src={crossIcon} alt="X" />}
                                    {data[index] === 'o' && <img src={circleIcon} alt="O" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
