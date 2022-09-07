import { VscClose, VscChromeMinimize } from 'react-icons/vsc'

import { images } from 'renderer/constants'
import './topbar.scss'

const Topbar = () => {

    const minimize = () => {
        window.electron.ipcRenderer.minimize();
    }
    const close = () => {
        window.electron.ipcRenderer.close();
    }
    return (
        <div className='app__topbar'>
            <img src={images.logo} alt='logo'/>
            <div className='app__topbar-buttons'>
                <VscChromeMinimize onClick={minimize} />
                <VscClose onClick={close} />
            </div>
        </div>
    )
}

export default Topbar