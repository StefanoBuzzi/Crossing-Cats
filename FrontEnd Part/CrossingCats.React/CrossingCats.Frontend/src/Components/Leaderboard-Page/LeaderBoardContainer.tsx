import './Leaderboard.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

interface ILeaderboard {
    position: number;
    username: string;
    score: number;
}

const GetLeaderBoard = () => {
    const [users, setUsers] = useState<ILeaderboard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const cookies = new Cookies();

    useEffect(() => {
        let accessToken = cookies.get("Try_Token");
        const fetchData = async () => {
            try {
                const res = await axios.get("https://localhost:7055/api/Player/GetLeaderboard", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const objectKeys = Object.keys(res.data);
                const userArray: ILeaderboard[] = objectKeys.map((key, index) => ({
                    position: index + 1,
                    username: key,
                    score: res.data[key],
                }));

                setUsers(userArray);
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, []);

    const assignStyle = (position: number) => {
        switch (position) {
            case 1:
                return 'first';
            case 2:
                return 'second';
            case 3:
                return 'third';
            default:
                return 'other';
        }
    };

    return (
        <div className='leaderBoardCenter'>
            <h1 className='leaderboardTitleStyle'>Top 10 scores</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <td className='rowsStyle'>RANK</td>
                        <td className='rowsStyle'>USERNAME</td>
                        <td className='rowsStyle'>SCORE</td>
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? Array.from({ length: 10 }, (v, i) => (
                              <tr key={i}>
                                  <td>
                                      <Skeleton
                                          variant='rectangular'
                                          height={32}
                                          className='customSkeleton responsiveSkeleton'
                                          sx={{
                                              backgroundColor: 'rgba(125, 130, 130, 0.3)',
                                              borderRadius: '4px',
                                              marginBottom: '8px',
                                              marginLeft: '24px',
                                          }}
                                      />
                                  </td>
                                  <td>
                                      <Skeleton
                                          variant='rectangular'
                                          height={32}
                                          className='customSkeleton responsiveSkeleton'
                                          sx={{
                                              backgroundColor: 'rgba(125, 130, 130, 0.3)',
                                              borderRadius: '4px',
                                              marginBottom: '8px',
                                          }}
                                      />
                                  </td>
                                  <td>
                                      <Skeleton
                                          variant='rectangular'
                                          height={32}
                                          className='customSkeleton responsiveSkeleton'
                                          sx={{
                                              backgroundColor: 'rgba(125, 130, 130, 0.3)',
                                              borderRadius: '4px',
                                              marginBottom: '8px',
                                              marginRight: '24px',
                                          }}
                                      />
                                  </td>
                              </tr>
                          ))
                        : users.map(x => {
                            let className = assignStyle(x.position);
                            return (
                                <tr key={x.position}>
                                    <td className={className} id={'' + x.position}>
                                        {x.position}°
                                    </td>
                                    <td className={className}>{x.username}</td>
                                    <td className={className}>{x.score}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default GetLeaderBoard;