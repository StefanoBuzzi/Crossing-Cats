import './Ruleset.css';

const Ruleset = () => {
    return (
        <div className='rulesetCenter'>
            <h1 className='rulesetTitleStyle'>RULESET</h1>
            <div className='rulesetbackground ruletextStyle'>
                <p className='paragraphRluleStyle'>
                    <b>Game</b>
                </p>
                ○ The game will only lasts for <b className='ruleNumberStyle3'>60</b> seconds.<br></br>○ The player has to score the maximum points as possible to appear in the top <b className='ruleNumberStyle3'>10</b>.<br></br>
                <br></br>
                <p className='paragraphRluleStyle'>
                    <b>Cat</b>
                </p>
                ○ The player can spawn a cat by pressing the "<b className='ruleWordStyle1'>Draw Cat</b>" button <br></br>
                ○ The player will move the cat with: "<b className='ruleWordStyle2'>🡩 🡫 🡪 🡨</b>" inputs from keyboard. <br></br>○ When the cat hits a car, the player will lose <b className='ruleNumberStyle1'>5</b> points from his
                total score <br></br>
                and the cat will respawn in the starting position.<br></br>○ When the cat reaches the other side of the road, the player will gain <b className='ruleNumberStyle2'>10</b> points.
                And then it will respawn in the starting position by pressing the "<b className='ruleWordStyle1'>Draw Cat</b>" button.<br></br>
                <br></br>
                <p className='paragraphRluleStyle'>
                    <b>Cars</b>
                </p>
                ○ The cars can be spawned by pressing the "<b className='ruleWordStyle1'>Lancia Auto</b>" button.<br></br>○ You can change the speed by pressing the "<b className='ruleWordStyle1'>+</b>" button.<br></br>○ More speed you apply, more time you'll need
                to wait to spawn again that car.<br></br>○ The cars will only spawn in road lanes.
                <br></br>○ You can spawn multiple cars with different speed.
                <br></br>
            </div>
        </div>
    );
};

export default Ruleset;