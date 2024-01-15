import { useNavigate } from 'react-router-dom'
import './header.css'
const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='app-header'>
            <div>
                <h1 className='title-comp' onClick={() => navigate("/")}>SPRITLE</h1>
            </div>
            <div className='links'>
                <p onClick={() => navigate("/create-event")}>Create New Event</p>
                <p onClick={() => navigate('/add-participants')}>Add Participants</p>
            </div>

        </div>
    )
}
export default Header