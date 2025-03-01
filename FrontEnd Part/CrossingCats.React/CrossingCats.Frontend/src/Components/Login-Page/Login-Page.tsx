import './Login-Page.css';

import CustomizedLoadingButton from '../Buttons/CustomizedLoadingButton';
import CustomizedToast from '../Toasts/CustomizedToast';
import { loginRequest } from '../../authConfig';
import { useMsal } from '@azure/msal-react';

const UserLogin = () => {
    // const [loading, setLoading] = useState<boolean>(false);
    // const [showPassword, setShowPassword] = useState<boolean>(false);
    const { instance } = useMsal();
    // const submitHandler = async (values: { email: string; password: string }) => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.post(`https://localhost:7055/api/User/Login?email=${values.email}&password=${values.password}`);
    //         let session: ISession = { session: true, userName: response.data[0], id: response.data[1] };
    //         window.sessionStorage.setItem('session', JSON.stringify(session));
    //         if (response.data[2] !== 'Login successful') {
    //             toast.error(response.data[2]);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const login = async () => {
        await instance.loginPopup(loginRequest);
    }

    return (
        <div className='LoginContainer center'>
            <h1 className='welcomeStyle'>Welcome to Crossing cats</h1>
            <div className='loginBackgroundStyle'>
                <CustomizedLoadingButton text='Login' buttonType='button' onClick={login} />
            </div>
            <CustomizedToast />
        </div>
    );
};

export default UserLogin;