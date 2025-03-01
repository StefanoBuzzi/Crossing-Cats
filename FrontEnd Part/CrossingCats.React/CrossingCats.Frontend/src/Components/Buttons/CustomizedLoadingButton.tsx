import { LoadingButton } from "@mui/lab";
import { blue } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";
import { styled } from "@mui/material";

interface ICustomizedLoadingButtonProps {
    text: string;
    buttonType?: "button" | "submit" | "reset" | undefined;
    onClick: any;
}

const BootstrapButton = styled(LoadingButton)(({ theme }) => ({
    boxShadow: "0px 4px 8px rgba(192, 192, 192, 0.5)",
    textTransform: "none",
    height: 100,
    width: 250,
    fontSize: 32,
    borderRadius: 4,
    padding: "6px 12px",
    marginTop: 40,
    lineHeight: 1.5,
    color: 'black',
    backgroundColor: 'rgb(0, 255, 238)',
    fontFamily: 'Custom1',
    "&:hover": {
        backgroundColor: "#11D4C7",
        boxShadow: "0px 4px 8px rgba(192, 192, 192, 0.5)",
    },
    "&:active": {
        boxShadow: "0px 4px 8px rgba(192, 192, 192, 0.5)",
        backgroundColor: "#15B1A7",
    },
    [theme.breakpoints.down('sm')]: {
        height: 72,  
        width: 176,  
        fontSize: 24, 
    }
}));

const CustomizedLoadingButton = (props: ICustomizedLoadingButtonProps) => {
    const { text, buttonType, onClick } = props;

    return (
        <div>
            <BootstrapButton variant="contained" disableRipple type={buttonType ?? "button"} onClick={onClick}>
                {text}
            </BootstrapButton>
        </div>
    );
};

export default CustomizedLoadingButton;