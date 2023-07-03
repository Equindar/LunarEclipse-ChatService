import classes from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);

    // Runs whenever a socket event is received from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state, {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => socket.off('received_message');
    }, [socket]);

    // DateTime formating (dd/mm/yyyy, hh:mm:ss)
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className={classes.messagesColumn}>
            { messagesReceived.map((msg, i) => (
                <div className={classes.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={classes.msgMeta}>{msg.username}</span>
                        <span className={classes.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                    </div>
                    <p className={classes.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Messages;