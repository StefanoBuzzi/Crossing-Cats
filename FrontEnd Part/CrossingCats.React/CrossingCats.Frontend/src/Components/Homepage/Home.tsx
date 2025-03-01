import "./Home.css"

import Cookies from 'universal-cookie';
import GameButton from "../Buttons/GameButton";
import Logo from "../Logo/Logo";
import axios from "axios";

const Home = () => {
    const cookies = new Cookies()

    const deleteUser = async () => {
        const accessToken = cookies.get("Try_Token");
        const response = await axios.delete("https://localhost:7055/api/User/DeleteUser?id=1", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    };

    return <div>
        <div className="central-div">
            <div className="logo1 center">
                <Logo />
            </div>
            <div className="trailer">
                <video width={400} height={400} autoPlay muted loop>
                    <source src="/Videos/CrossingCatsTrailer.mp4" type="video/mp4" />
                </video>
                <button onClick={deleteUser}>aihaisudas</button>
            </div>
            <div className="game-btn center">
                <GameButton />
            </div>
        </div>
    </div>
}

export default Home