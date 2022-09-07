import { useState, useEffect } from 'react'

import './Home.scss'

const Home = () => {
    const [mp3, setMp3] = useState('#121e2a')
    const [mp4, setMp4] = useState('#162230')
    const [show, setShow] = useState('none')
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')

    window.electron.ipcRenderer.once('success', () => {
        setShow('block')
        setMessage('SUCCESS')
        setColor('#34df91')
        setTimeout(() => {
            setShow('none')
        }, 5000)
    })
    window.electron.ipcRenderer.once('start', () => {
        setShow('block')
        setColor('#fac664')
        setMessage('Started Download...')
    })
    window.electron.ipcRenderer.once('fail', () => {
        setShow('block')
        setColor('#f7785c')
        setMessage('Download Failed!')
    })
    
    const handle = (type: String) => {
        if(type == 'mp4'){
            setMp3('#162230')
            setMp4('#121e2a')
        }
        else {
            setMp4('#162230')
            setMp3('#121e2a')
        }
    }

    const submit = () => {
        var link = (document.getElementById('link') as HTMLInputElement).value
        if(mp4 === '#162230'){
            window.electron.ipcRenderer.download('mp3', link)
        } else {
            window.electron.ipcRenderer.download('mp4', link)
        }
    }

    return (
        <div className='app__home'>
            <div className='app__home-type'>
                <p>Please select output format</p>
                <button type='button' style={{ backgroundColor: mp3}} onClick={() => handle('mp3')}>MP3</button>
                <button type='button' style={{ backgroundColor: mp4, marginLeft: '30px'}} onClick={() => handle('mp4')}>MP4</button>
                <br/>
            </div>
            <div className='app__home-link'>
                <input type='text' id='link' placeholder='Youtube Link'/>
                <br/>
                <button type='submit' onClick={submit}>Download</button>
                <p style={{display: show, color: color}}>{message}</p>
            </div>
        </div>
    )
}

export default Home