import React, { useEffect, useState } from "react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Button, Input, Snackbar, Select, MenuItem } from "@mui/material";
import { homeData } from "../contents/text_data";
import HeadCoin from "../assets/head.png";
import TailCoin from "../assets/tail.png";
import CoinAni from "../assets/coin-ani.gif";

const Main = () => {
    const [wallet, setWallet] = useState<PublicKey | string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [betAmount, setBetAmount] = useState<number | ''>('');
    const [selectedSide, setSelectedSide] = useState<'heads' | 'tails' | null>(null);
    const [selectedToken, setSelectedToken] = useState<'SOL' | 'ETH' | 'BTC'>('SOL');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resultVal, setResultVal] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const connectWallet = async () => {
        try {
            if ('solana' in window) {
                const provider: any = window.solana;
                if (provider.isPhantom) {
                    const walletAdapter = new PhantomWalletAdapter();
                    await walletAdapter.connect();
                    const publicKey = walletAdapter.publicKey!;
                    setWallet(publicKey);
                    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
                    const walletBalance = await connection.getBalance(publicKey);
                    setBalance(walletBalance / 1e9); // Convert from lamports to SOL
                } else {
                    alert('Please install the Phantom Wallet');
                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet 👻');
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert('Failed to connect wallet. Please try again.');
        }
    };

    const handleBetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBetAmount(Number(event.target.value));
    };

    const handleSideChange = (side: 'heads' | 'tails') => {
        setSelectedSide(side);
    };

    const handleTokenChange:any= (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedToken(event.target.value as 'SOL' | 'ETH' | 'BTC');
    };

    const flipCoin = async () => {
        if (!wallet || !betAmount || !selectedSide || !selectedToken) {
            alert('Please connect your wallet, enter a bet amount, select a side, and choose a token.');
            return;
        }
        setIsLoading(true);
        setResultVal(''); // Reset resultVal to show animation

        // Simulate coin flip delay and animation
        setTimeout(() => {
            const result = Math.random() < 0.5 ? 'heads' : 'tails';

            // Show the final result after another 1 second
            setTimeout(() => {
                setResultVal(result);
                const gameResult = result === selectedSide
                    ? `You won! You get double your ${selectedToken}.`
                    : 'You lost! Better luck next time.';
                
                setSnackbarMessage(gameResult);
                setSnackbarOpen(true);
                setIsLoading(false);
            }, 1000); // Duration of displaying result
        }, 1000); // Duration of animation
    };

    useEffect(() => {
        let timestamp: NodeJS.Timeout;

        if (resultVal !== '') {
            timestamp = setTimeout(() => {
                setResultVal('');
                setBetAmount('');
                setSelectedSide(null);
                setSelectedToken('SOL');
            }, 4000);
        }

        return () => clearTimeout(timestamp);
    }, [resultVal]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="front-container">
            {!wallet ? (
                <div className="flex-box">
                    <h1>{homeData.heading}</h1>
                    <button onClick={connectWallet}>
                        {wallet ? `Connected: ${wallet.toString().substring(0, 6)}...` : homeData.btnText}
                    </button>
                </div>
            ) : (
                <div className="grid-box">
                    <div className="left-part">
                        <h1>{homeData.heading}</h1>
                        <h2>
                            {homeData.subheading}<br/>
                            made with 💖 <i>Manas Gupta</i>
                        </h2>
                        <h4>Balance: {balance} SOL</h4>
                        <button onClick={connectWallet}>
                            {wallet ? `Connected: ${wallet.toString().substring(0, 6)}...` : homeData.btnText}
                        </button>
                    </div>
                    <div className="right-part">
                        <img src={resultVal === '' ? CoinAni : resultVal === "heads" ? HeadCoin : TailCoin} alt="Coin" />
                        <h3>{resultVal === '' ? "Flipping..." : resultVal}</h3>
                        <Input
                            type="number"
                            placeholder="Enter bet amount"
                            value={betAmount}
                            onChange={handleBetChange}
                            sx={{
                                border: '2px solid transparent',
                                borderBottomColor: "black",
                                marginBottom: "5%",
                                color: 'white',
                                fontSize: '1.5rem',
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                    fontSize: '1.5rem',
                                }
                            }}
                        />
                        <Select
                            value={selectedToken}
                            onChange={handleTokenChange}
                            sx={{
                                color: 'white',
                                marginBottom: '5%',
                                '& .MuiSelect-icon': {
                                    color: 'white',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                }
                            }}
                        >
                            <MenuItem value='SOL'>SOL</MenuItem>
                            <MenuItem value='ETH'>ETH</MenuItem>
                            <MenuItem value='BTC'>BTC</MenuItem>
                        </Select>
                        <div className="coin-selection">
                            <button onClick={() => handleSideChange('heads')}
                                className={selectedSide!=="heads"?"not-selected":""}
                                >
                                {homeData.head}
                            </button>
                            <button onClick={() => handleSideChange('tails')}
                                className={selectedSide!=="tails"?"not-selected":""}
                                >
                                {homeData.tail}
                            </button>
                        </div>
                        <button
                            onClick={flipCoin}
                            disabled={isLoading}
                            style={{ marginTop: '10px' }}
                        >
                            {isLoading ? 'Flipping...' : homeData.flipCoin}
                        </button>
                    </div>
                </div>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={
                    <Button color="inherit" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            />
        </div>
    );
};

export default Main;
