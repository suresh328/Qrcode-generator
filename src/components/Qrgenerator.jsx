import { useState } from "react";



const Qrgenerator = ()=> {

    const [img , setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("suresh")
    const [imgSize, setImgSize] = useState('150')


    async function generateQr(){
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?
            size=${imgSize}x${imgSize}&data=${encodeURIComponent(qrData)}`;
            setImage(url);
        }catch(error){
            console.log("Error generating QR code "+ error)
        }finally{
            setLoading(false)
        }
    }
    function downloadQr(){
        fetch(img)
        .then((response)=> response.blob())
        .then((blob)=>{
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error downloading QR code", error)
        });
    }
  
    return (
    <div className='container'>
        <h1>Qr Code Generator</h1>
       {loading && <p>please wait...</p>}
        {img && <img src={img} alt="" className='Qr-image'/>}
       <div className="content">
       <label htmlFor="datainput" className='input-lable'>Data for Qr code : </label>
        <input type="text" id='datainput'  placeholder='enter data for Qr code' 
        value={qrData}
        onChange={(e)=>setQrData(e.target.value)} />
        
        <label htmlFor="sizeinput" className='input-lable'>Enter your size (e.g., 150): </label>
        <input type="text" id='sizeinput' placeholder='enter image size' 
        value={imgSize}
        onChange={(e)=>setImgSize(e.target.value)} />
        
        <button className='generate-btn' onClick={generateQr } disabled={loading}>Generate Qr-code</button>
        <button className='download-btn' onClick={downloadQr} >Download Qr-Code</button>
       
        </div>
        <div className="footer">
           <p> Designed by <a href="https://portfolio-pi-three-26.vercel.app/"><em>Suresh</em></a></p>
        </div>

    </div>
  )
}

export default Qrgenerator;
