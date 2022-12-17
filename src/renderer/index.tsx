import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router } from 'react-router-dom'
import App from './App';
import './index.css'

const Index = () => {
    return(
        <Router>
            <App />
        </Router>
    )
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Index />);


// // calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
