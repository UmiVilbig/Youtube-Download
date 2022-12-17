import { useState } from 'react'
import { VscClose, VscChromeMinimize } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

import { images } from 'renderer/constants'
import './topbar.scss'

const Topbar = () => {
    const [color, setColor] = useState('#ecf5f6')

    const minimize = () => {
        window.electron.ipcRenderer.minimize();
    }
    const close = () => {
        window.electron.ipcRenderer.close();
    }
    const logo = () => {
        console.log("Hit")
    }
    return (
        <div className='app__topbar'>
            <Link to='/'>
                <img src={images.logo} alt='logo' onClick={logo} width='50px'/>
            </Link>
            <div className='app__topbar-buttons'>
                <VscChromeMinimize onClick={minimize} />
                <VscClose onClick={close} />
            </div>
        </div>
    )
}

export default Topbar