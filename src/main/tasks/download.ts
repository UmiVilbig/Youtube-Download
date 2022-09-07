import ytdl from 'ytdl-core'
import fs from 'fs'
import path from 'path'
import { ipcMain } from 'electron'

const dir = __dirname.split('\\')
let videos = dir[0] + '\\' + dir[1] + '\\' + dir[2] + '\\videos\\Youtube Downloads' 
let mp3 = videos + '\\mp3'
let mp4 = videos + '\\mp4'

async function Download(type: any, link: any, event: any) {

    createDirs()

    var moveOn = validateURL(link)
    console.log(moveOn)

    if(moveOn === true) {
        const info = await ytdl.getInfo(link)
        let title = info.videoDetails.title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        if(type === 'mp3'){
            const done = ytdl(link, { quality: 'highestaudio'})
                            .pipe(fs.createWriteStream(path.join(mp3, `${title}.mp3`)))
                event.reply('start')
                done.on('close', () => {
                    event.reply('success')
                })
        } else {
            const done = ytdl(link, { quality: 'highestaudio'})
                            .pipe(fs.createWriteStream(path.join(mp4, `${title}.mp4`)))
                event.reply('start')
                done.on('close', () => {
                    event.reply('success')
                })
        }
    } else {
        event.reply('fail')
    }

}

function createDirs(){

    if(!fs.existsSync(videos)){
        fs.mkdir(videos, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }
    if(!fs.existsSync(mp3)){
        fs.mkdir(mp3, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }
    if(!fs.existsSync(mp4)){
        fs.mkdir(mp4, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }
}

function validateURL(link: string){
    const validQueryDomains = new Set([
        'youtube.com',
        'www.youtube.com',
        'm.youtube.com',
        'music.youtube.com',
        'gaming.youtube.com',
    ]);
    
    const idRegex = /^[a-zA-Z0-9-_]{11}$/;
    const validateID = (id: any) => idRegex.test(id.trim())
    
    const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;

        const parsed = new URL(link.trim());
        let id:string = parsed.searchParams.get('v') || '';
        if (validPathDomains.test(link.trim()) && !id) {
            const paths = parsed.pathname.split('/');
            id = parsed.host === 'youtu.be' ? paths[1] : paths[2];
        } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
            console.log('no youtube domain')
            return false
        }
        if (!id) {
            console.log('no video ID')
            return false
        }
        id = id?.substring(0, 11);
        if (!validateID(id)) {
            console.log('Cannot find video')
            return false
        }
        return true;
}

export default function DownloadHandle(mainWindow: any) {
    ipcMain.on('download', (event, type, link) => {
        try {
            Download(type, link, event)
        } catch(err) {
            console.log("ERROR GOT")
        }
    })
}