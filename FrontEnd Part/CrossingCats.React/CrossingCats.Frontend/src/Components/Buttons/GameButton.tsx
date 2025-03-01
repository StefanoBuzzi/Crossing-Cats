import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
 text-decoration: none;
 background-color: rgb(0, 255, 238);
 color: black;
 font-size: 40px;
 width: 232px;
 height: 88px;
 font-family: 'Custom1';
 font-weight: bolder;
 border-radius: 4px;
 cursor: pointer;
 &:hover {
  background-color: hsla(189, 85%, 32%, 1);
 }

 &:active {
  border-bottom-width: 0.1rem;
  border-top-width: 0.3rem;
 }
`

const GameButton = () => {
    const navigate = useNavigate()

    return <div>
        <StyledButton onClick={() => navigate("/game")}>PLAY!</StyledButton>
    </div>
}

export default GameButton