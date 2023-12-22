import React, { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import "./DIY_HappyWash.css";
import images from '../../assets'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function QrGenerate() {
    const [qrDesc, setQRDesc] = useState();
    const [siteCode, setSiteCode] = useState(0);
    const [alert, setAlert] = useState(0);
    const [hide, setHideForm] = useState(0);
    const [downloadLink, setdownloadLink] = useState();

    const sitenameR = useRef(null);
    const sitecodeR = useRef(null);
    const washTypeR = useRef(null);
    const washBayR = useRef(null);

    const downloadCode = async (e) => {
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setSiteCode(0)
        setHideForm(0)
    };

    const designQRElement = async (site, hwtype, hwbay) => {
        const canvas = document.getElementById("QR");
        var context = canvas.getContext("2d");
        context.font = "bold 38px Arial";
        context.fillStyle = "black";
        context.fillText(site, 45, 875);
        context.fillText("HW T:" + hwtype + " B:" + hwbay, 635, 875);
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadlink = document.createElement("a");
            downloadlink.href = pngUrl;
            downloadlink.download = site + hwtype + hwbay + `.png`;
            document.body.appendChild(downloadlink);
            setdownloadLink(downloadlink)
        }
    }

    const generateNewQr = async (e) => {
        setAlert(0)
        if (sitenameR.current.value !== '' && sitecodeR.current.value !== '' && washTypeR.current.value !== '' && washBayR.current.value !== '') {
            var valuelink = "https://www.otr.com.au/otr-app/?path=goto&page=HappyWashM&site=" + sitecodeR.current.value + "&type=" + washTypeR.current.value + "&bay=" + washBayR.current.value;
            setSiteCode(1)
            setQRDesc(valuelink);
            var site = sitenameR.current.value;
            var type = washTypeR.current.value;
            var bay = washBayR.current.value;

            setTimeout(() => {
                designQRElement(site, type, bay)
            }, 750);
            setHideForm(1)
            e.preventDefault();

        } else {
            setAlert(1)
        }
    }

    return (
        <div className="happywash" >
            <br />
            <div className="alert">
                {
                    alert === 1 && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            The fields must be completed before generating the codes — <strong>check it out!</strong>
                        </Alert>
                    )
                }
            </div>
            {
                    siteCode !== 0 && (
                        <div>
                        <button type="button" className="buttoncmn" onClick={downloadCode}>
                            Download Codes
                        </button>
                        <br></br>
                        </div>
                    ) 
                }
            {siteCode !== 0 &&
                <QRCode
                    value={
                        qrDesc
                    } // here you should keep the link/value(string) for which you are generation promocode
                    size={800} // the dimension of the QR code (number)
                    logoImage={images.otrlogo} // URL of the logo you want to use, make sure it is a dynamic url
                    logoHeight={275}
                    logoWidth={275}
                    logoOpacity={1}
                    ecLevel="H"
                    enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
                    qrStyle="square" // type of qr code, wether you want dotted ones or the square ones
                    eyeRadius={10} // radius of the promocode eye
                    id="QR"
                    quietZone={45}
                />
            }
            <div className="qrform">
                {
                    hide === 0 &&
                    (
                        <div>
                            <img
                                src={images.diysingle}
                                loading="lazy"
                                alt=""
                            />
                            <Box
                                my={2}

                                sx={{
                                    width: '380',
                                    maxWidth: '90%',
                                    margin: '0 0 2% 5%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Site Name</span>} id="sitename" inputRef={sitenameR} />
                            </Box>
                            <Box
                                style={{ color: "white" }}
                                mb={2}
                                sx={{
                                    width: '380',
                                    maxWidth: '90%',
                                    margin: '0 0 2% 5%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Site Code</span>} id="sitecode" inputRef={sitecodeR} />
                            </Box>
                            <Box
                                style={{ color: "white" }}
                                mb={2}
                                sx={{
                                    width: '380',
                                    maxWidth: '90%',
                                    margin: '0 0 2% 5%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Wash Type</span>} id="sitecode" inputRef={washTypeR} />
                            </Box>
                            <Box
                                style={{ color: "white" }}
                                mb={2}
                                sx={{
                                    width: '380',
                                    maxWidth: '90%',
                                    margin: '0 0 2% 5%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Wash Bay</span>} id="sitecode" inputRef={washBayR} />
                            </Box>
                            <br></br>
                        </div>
                    )
                }
                {
                    siteCode !== 0 ? (
                        <div>
                        <button type="button" className="buttoncmn" onClick={downloadCode}>
                            Download Codes
                        </button>
                        </div>
                    ) : (
                        <button type="button" className="buttoncmn" onClick={generateNewQr}>
                            Generate Codes
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default QrGenerate;