import React, {useEffect, useState} from 'react';
import QRCode from 'qrcode'
import {EConnectionStatus} from "../constants/enums";
const ipcRenderer = window.require("electron").ipcRenderer;


const QrCode = ({ status }) => {
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        ipcRenderer.send('qr-code', 'mounted')
        ipcRenderer.on('local-ip-address', async (event, message) => {
            try {
                const response = await QRCode.toDataURL(message)
                console.log(response)
                setImageUrl(response)
            } catch (err) {
                console.error(err)
            }
        })
    }, [])


    return (
        <div>
            {imageUrl && status !== EConnectionStatus.CONNECTED && <img alt="QR code" src={imageUrl} />}
        </div>
    );
}
export default QrCode