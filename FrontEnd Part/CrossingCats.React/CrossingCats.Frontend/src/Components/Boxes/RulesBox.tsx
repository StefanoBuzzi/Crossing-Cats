import "./RulesBox.css"

import { TextareaAutosize } from "@mui/base/TextareaAutosize"

interface IRulesProps{
    displayed:boolean
}

const RulesBox = (props:IRulesProps) =>{
    const {displayed} = props
    return <div>
        <TextareaAutosize
            id="rules"
            disabled
            style={{display: !displayed ? 'none' : 'block'}}
            className="CustomTextarea"
            aria-label="empty textarea"
            placeholder="Empty"
            value="ALLETTO?"
        />
    </div>
}

export default RulesBox