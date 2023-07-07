import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (gameOver) {
            setTimeout(() => {
                setBoard(Array(9).fill(null));
                setIsXNext(true);
                setGameOver(false);
                setWinner(null);
            }, 2000); // Redémarrage automatique après 2 secondes
        }
    }, [gameOver]);

    const handleClick = (index) => {
        if (board[index] || gameOver) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            setGameOver(true);
            setWinner(gameWinner);
            if (gameWinner === 'X') {
                setScoreX(scoreX + 1);
            } else {
                setScoreO(scoreO + 1);
            }
        } else if (newBoard.every((square) => square !== null)) {
            setGameOver(true);
        }
    };

    const renderSquare = (index) => {
        return (
            <Button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </Button>
        );
    };

    let status;
    if (gameOver) {
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = "It's a draw!";
        }
    } else {
        status = `Joueur ${isXNext ? '1 (X)' : '2 (O)'}`;
    }

    return (
        <>
            <div className={'d-flex justify-content-center align-items-center flex-column'}>
                <div className="board">
                    <div className="board-row">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                </div>
                <div className={'d-flex flex-column'}>
                    <h2 className={'mb-3'}>Au tour de</h2>
                    <p className={'text-center'}>{status}</p>
                </div>
            </div>
            <div className="d-flex justify-content-around">
                <div className={'d-flex flex-column'}>
                    <h3 className={'mb-5'}>Joueur 1 (X)</h3>
                    <p className={'text-center'}>{scoreX}</p>
                </div>
                <div className={'d-flex flex-column'}>
                    <h3 className={'mb-5'}>Joueur 2 (O)</h3>
                    <p className={'text-center'}>{scoreO}</p>
                </div>
            </div>
        </>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
};

export default Game;
