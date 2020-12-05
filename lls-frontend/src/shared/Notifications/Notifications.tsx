import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { INotification } from '../../../../models';
import Api from '../../api';
import withEllipsis from '../HOCs/withElipsis';


const Notifications: FC  = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);


    useEffect(() => {
      setInterval(() => {
        Api.fetchNotifications()
        .then(({data}) => {
          setNotifications(() => [...data.notifications]);
        });
      }, 30000);
    },[])

    useEffect(() => {
        Api.fetchNotifications()
        .then(({data}) => {
          setNotifications(() => [...data.notifications]);
        });
    },[])

  

    const deleteNotification = (notification:INotification) => {
      setNotifications(nots => {
        return nots.filter(not => not.id !== notification.id);
      });


    }
      
    return <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">🔔</Dropdown.Toggle>
            <Dropdown.Menu  style={{width: '20rem'}}>
            {notifications
              .map(notification => 
                <Dropdown.Item>
                    <div style={{width: '90%'}}>
                      {withEllipsis(<h6>{notification.title}</h6>)}
                      <br  />
                      {withEllipsis(<p>{notification.details}</p>)}
                    </div>
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteNotification(notification)}/>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
        </Dropdown>
}

export default Notifications;
