
import React, { FC, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute:FC<any> = ({  component: Component, ...rest }) => {
    const [token, setToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);
    const [isUnauthorized, setIsUnauthorized] = useState(true);

    useEffect(() => {
        const tkn = localStorage.getItem('token') || '';
        const strAdmin = localStorage.getItem('isAdmin') || ''
        const adm = !!JSON.parse(strAdmin)

        setToken(tkn);
        setIsAdmin(adm);

        setIsUnauthorized( !tkn || !tkn.split('Bearer ')[1])
    }, [token])


    return (
        <Route
            {...rest}
            isAdmin={isAdmin}
            token={token}

            render={props => {
                if (isUnauthorized && !isAdmin) {
                    return <Redirect to="/login" />;
                }

                if(!isUnauthorized && !isAdmin) {
                    return <Redirect to="/member" />
                }

                return <Component {...props} isAdmin={isAdmin}/>;
            }}
        />
    );
};

export default AdminRoute;
