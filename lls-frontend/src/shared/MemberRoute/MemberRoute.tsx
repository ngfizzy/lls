
import React, { FC, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const MemberRoute:FC<any> = ({ component: Component, ...rest }) => {
    const [token, setToken] = useState('');
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    useEffect(() => {

        const tkn = localStorage.getItem('token') || '';
        setToken(tkn);



        setIsUnauthorized( !!(!tkn || !tkn.split('Bearer ')[1]))
         
 
    }, [token])

    return (
        <Route
            {...rest}
            token={token}

            render={props => {
                if (isUnauthorized) {
                    return <Redirect to="/login" />;
                }

                return <Component {...props}/>;
            }}
        />
    );
};

export default MemberRoute;
