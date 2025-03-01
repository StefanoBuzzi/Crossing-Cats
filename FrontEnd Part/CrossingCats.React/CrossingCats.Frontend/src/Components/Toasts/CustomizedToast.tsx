import toast, { ToastBar, Toaster } from "react-hot-toast";

interface ICustomizedToastProps {
}

const CustomizedToast = (props: ICustomizedToastProps) => {
    return (
        <Toaster
            toastOptions={{
                duration: 1200000,
                style: {
                    fontFamily:'Custom2',
                    border: "1px  #713200",
                    padding: "8px",
                    borderColor: "tan"
                },
                error: {
                    style: {
                        fontFamily:'Custom2',
                        background: "red",
                        fontSize: "small",
                        color:"white"
                    },
                },
                success:{
                    style: {
                        fontFamily:'Custom2',
                        background: "green",
                        fontSize: "small",
                        color:"white"
                    }
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                  }
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ message }) => (
                        <>
                            {message}
                            {console.log(message)}
                            {t.type === "error" && <button className="buttonToastErr" onClick={(e) =>{ e.preventDefault(); toast.dismiss(t.id)}}>❌</button>}
                            {t.type === "success" && <button className="buttonToastSucc" onClick={(e) =>{ e.preventDefault(); toast.dismiss(t.id)}}>❎</button>}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
};

export default CustomizedToast;