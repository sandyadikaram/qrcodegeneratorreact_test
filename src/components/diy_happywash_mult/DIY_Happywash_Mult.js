import React, { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import images from '../../assets'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './DIY_Happywash_Mult.css'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';

function QrGenerate() {
    const [sitename, setQRSitename] = useState('');
    const [machines, setMachines] = useState([]);
    const [hide, setHideForm] = useState(0);
    const [alert, setAlert] = useState(0);
    const [downloadLink, setdownloadLink] = useState();
    var machineArray = [
        {
            "valuelink": "",
            "id": ""
        }
    ]
    var downloadLinks = []
    // const [sitename, setQRSitename] = useState();
    // const [sitecode, setSiteCode] = useState();
    const sitenameR = useRef(null);
    const numberofQrR = useRef(null);
    const sitecodeR = useRef(null);
    const washTypeR = useRef(null);

    const pause = async (msec) => {
        return new Promise(
            (resolve, reject) => {
                setTimeout(resolve, msec || 1000);
            }
        );
    }

    const downloadCode = async (e) => {
        // var count = 0;
        // for (let y = 0; y < downloadLink.length; y++){
        //     if (++count >= 10) {
        //         await pause(1000);
        //         count = 0;
        //     }
        //     downloadLink[y].click();
        //     document.body.removeChild(downloadLink[y]);
        // }

        await generateZIP(downloadLink)
        machineArray = [];
        setMachines([]);
        setHideForm(0)
    };

    const designQRElement = async (site, allmachines, hwtype) => {
        for (let x = 0; x < allmachines.length; x++) {
            var machineNo = x + 1;
            var id = allmachines[x].id;
            const canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            context.font = "bold 33px Arial";
        context.fillStyle = "black";
        context.fillText(site, 45, 875);
            context.fillText("HW T:" + hwtype + " B:" + machineNo, 670, 875);
            if (canvas) {
                const pngUrl = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
                let downloadlink = document.createElement("a");
                downloadlink.href = pngUrl;
                downloadlink.download = site + hwtype + machineNo + `.png`;
                document.body.appendChild(downloadlink);
                downloadLinks.push(downloadlink) 
            }
        }
        setdownloadLink(downloadLinks)
    }

    const generateNewQr = async (e) => {
        setAlert(0)
        if (sitenameR.current.value !== '' && sitecodeR.current.value !== '' && numberofQrR.current.value !== '' && numberofQrR.current.value !== 0 && washTypeR.current.value !== '') {
            setQRSitename(sitenameR.current.value);
            machineArray = [];
            for (let i = 1; i <= numberofQrR.current.value; i++) {
                var newObj = {
                    id: 'QR' + i,
                    valuelink: "https://www.otr.com.au/otr-app/?path=goto&page=HappyWashM&site=" + sitecodeR.current.value + "&type=" + washTypeR.current.value + "&bay=" + i
                }
                machineArray.push(newObj)
                // downloadCode(sitenameR.current.value, i)
            }
            var site = sitenameR.current.value;
            var hwtype = washTypeR.current.value;
            setQRSitename(sitenameR.current.value)
            setMachines(machineArray)
            setTimeout(() => {
                designQRElement(site, machineArray,hwtype )
            }, 1000);
            setHideForm(1)
        } else {
            setAlert(1)
        }
        e.preventDefault();
    }


    const generateZIP = async(downloadLink) => {
        var zip = new JSZip();
        var count = 0;
        var zipFilename = sitename+"_Happywash_QRcodes.zip";
        // we will download these images in zip file
        var images = downloadLink
        images.forEach(async function (imgURL, i) {
            var x = i + 1;
            var filename = sitename + "_machine-" + x + '.png'
            var image = await fetch(imgURL)
            var imageBlog = await image.blob()
            var nameafterextract = sitename + "_Happywash_QR";
            var img = zip.folder(nameafterextract);
            // loading a file and add it in a zip file
            img.file(filename, imageBlog, { binary: true });
            count ++
            if (count == images.length) {
                zip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, zipFilename);
                });
            }
        })
    }

    return (
        <div >
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
                    machines.length > 0 && (
                        <div>
                        <button type="button" className="buttoncmn" onClick={downloadCode}>
                            Download Codes
                        </button>
                        <br></br>
                        </div>
                    ) 
                }
            {machines.map(function (pump, i) {
                return (
                    <QRCode
                        key={i}
                        value={
                            pump.valuelink
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
                        id={pump.id}
                        quietZone={45}
                    />)
            })}


            <div className="qrform">
                {
                    hide === 0 &&
                    (
                        <div>
                             <img
                             className="diymulimg"
                                src={images.diymulti}
                                loading="lazy"
                                alt=""
                            />
                            <Box
                                my={2}

                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Site Name</span>} id="sitename" inputRef={sitenameR} />
                            </Box>
                            <Box
                                style={{ color: "white" }}
                                mb={2}
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Site Code</span>} id="sitecode" inputRef={sitecodeR} />
                            </Box>
                            <Box
                                mb={2}
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Wash Type</span>} id="washtype" inputRef={washTypeR} />
                            </Box>
                            <Box
                                mb={2}
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField required className="textfield" fullWidth label={<span className={'textlabel'}>Number of Bays</span>} id="numberof" inputRef={numberofQrR} />
                            </Box>
                        </div>
                    )
                }
  {
                    machines.length > 0 ? (
                        <div>
                            <br></br>
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