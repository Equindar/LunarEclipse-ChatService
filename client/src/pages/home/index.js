import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', {username, room });
        }

        // Redirect to /chat
        navigate('/chat', { replace: true});
    }

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h1>{`<>DevRooms</>`}</h1>
                <input className={classes.input} placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)} />

                <select className={classes.input}
                    onChange={(e) => setRoom(e.target.value)}>
                    <option>-- Select Room --</option>
                    <option value='Wildnis'>Wildnis</option>
                    <option value='Stadt'>Stadt</option>
                    <option value='Gruppe'>Gruppe</option>
                    <option value='Admin'>Admin</option>
                </select>

                <button className='btn btn-secondary'
                onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    );
};

export default Home;