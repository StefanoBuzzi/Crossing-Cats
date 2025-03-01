import Error from './Components/Examples/Error';
import Game from './Components/Game/Game';
import Home from './Components/Homepage/Home';
import Layout from './Components/Layout/Layout';
import Leaderboard from './Components/Leaderboard-Page/Leaderboard-Page';
import Ruleset from './Components/Ruleset/Ruleset';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'leaderboard',
                element: <Leaderboard />
            },
            {
                path: 'game',
                element: <Game />
            },
            {
                path: 'ruleset',
                element: <Ruleset />
            }
        ],
    }
]);

export default router;