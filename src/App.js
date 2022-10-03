import { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Container, FormControl, Input, Typography } from "@material-ui/core";


function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");

  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
        setPdfFile("");
      }
    } else {
      console.log("please select a PDF");
    }
  };

  return (
    <div>
      <Container>
        {}

        <Typography variant="h5" align="left" style={{color:"red"}} >
            Upload PDF
        </Typography>
        
        <FormControl>
        <br/>
          <Input type="file"
            onChange={handleFile}>
          </Input>
          <br/>

          {}
          {pdfError && <Typography variant="h5" align="left" style={{color:"red"}} >{pdfError}</Typography> }
        </FormControl>

        {}
        <Typography variant="h5" align="left" style={{color:"red"}} >View PDF</Typography>
        <div className="viewer">
          {}
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}

          {}
          {!pdfFile &&  <Typography variant="h5" align="left" style={{color:"red"}} >No file is selected yet.</Typography>}
        </div>
      </Container>
    </div>
  );
}

export default App;
