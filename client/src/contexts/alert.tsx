import React, {
    createContext,
    useContext,
    useState,
    useReducer
} from "react";
import useMethods from 'use-methods';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';



const GlobalAlertContext: React.Context<any> = createContext(() => undefined);

/**
 * Child components that want to show a global alert should import this hook.
 * Return an object with the method { showAlert }
 */
export const useGlobalAlert = () => useContext(GlobalAlertContext);

let reducerMethods = state => ({
    showAlert({message, type}) {
        return {
            message,
            type,
            isAlertVisible: true
        }
    },
    hideAlert() {
        return {
            isAlertVisible: false,
            message: '',
            type: null
        }
    }
})

export const GlobalAlertContextProvider = ({ children }) => {
    const [{ isAlertVisible, message, type }, {showAlert, hideAlert}] = useMethods(reducerMethods, {
        isAlertVisible: false,
        message: '',
        type: null
    }); 

    return (
        <React.Fragment>
            <GlobalAlert
                isVisible={isAlertVisible}
                message={message}
                type={type}
                onHide={hideAlert}
            />
            <GlobalAlertContext.Provider value={showAlert} children={children} />
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
