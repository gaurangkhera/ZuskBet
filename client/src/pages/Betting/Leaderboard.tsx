import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
import { cn } from "../../lib/utils";
import axios from 'axios';

// Define the type for leaderboard data
type Contestant = {
    id: string;
    name: string;
    bets: number;
};

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState<Contestant[]>([]);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await axios.get('/api/leaderboard');
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        }

        fetchLeaderboard();
    }, []);

    // Sort the leaderboard data by highest bets
    const sortedLeaderboard = leaderboardData.slice().sort((a, b) => b.bets - a.bets);

    return (
        <Table className={cn('mt-24')}>
            <TableCaption>A list of contestants on the leaderboard.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Contestant</TableHead>
                    <TableHead>Total Bets</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedLeaderboard.map((contestant) => (
                    <TableRow key={contestant.id}>
                        <TableCell className="font-medium">{contestant.name}</TableCell>
                        <TableCell>{contestant.bets}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Leaderboard;
