import React, {
    createContext,
    useContext,
    useState,
    useReducer
} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';



const GlobalAlertContext: React.Context<{
    showAlert: ({ message, type }) => void
}> = createContext({
    showAlert: (m) => { }
});

/**
 * Child components that want to show a global alert should import this hook.
 * Return an object with the method { showAlert }
 */
export const useGlobalAlert = () => useContext(GlobalAlertContext);

export const GlobalAlertContextProvider = ({ children }) => {
    const [isAlertVisible, setAlertVisibility] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");


    const [state, dispatch] = useReducer((state, action) => {
        setAlertMessage(action.message);
        setAlertType(action.type);
        setAlertVisibility(true);
        return state;
    }, {});

    return (
        <React.Fragment>
            <GlobalAlert
                isVisible={isAlertVisible}
                message={alertMessage}
                type={alertType}
                onHide={() => {
                    setAlertVisibility(false)
                }}
            />
            <GlobalAlertContext.Provider value={{ showAlert: dispatch }} children={children} />
        </React.Fragment>
    );
};

const GlobalAlert = ({ isVisible, message, type, onHide }) => {
    if (!isVisible) {
        return null;
    }
    return <div className={`alert ${type}`}>
        {message}
        <IconButton edge="start" color="inherit" aria-label="close" onClick={() => {
            onHide();
        }}>
              <CancelIcon/>
        </IconButton>
    </div>;
};
