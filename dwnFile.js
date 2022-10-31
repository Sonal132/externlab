import { useState, useEffect } from "react";
import axios from "axios";

export default function DownloadPrivateFile(props) {
  const [download, setDownload] = useState(false);

  useEffect(() => {
    async function downloadApi() {
      try {
        // It doesn't matter whether this api responds with the Content-Disposition header or not
        const response = await axios.get(
          "http://localhost:9000/api/v1/service/email/attachment/1mbdoc.docx",
          {
            responseType: "blob", // this is important!
            headers: { Authorization: "sometoken" },
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "dummy.docx"); //this is the name with which the file will be downloaded
        link.click();
        // no need to append link as child to body.
        setTimeout(() => window.URL.revokeObjectURL(url), 0);
        setDownload(false);
      } catch (e) {} //error handling }
    }

    if (download) {
      downloadApi();
    }
  }, [download]);

  return <button onClick={() => setDownload(true)}>Download Private</button>;
}


For Public Files

import { useState, useEffect } from "react";
export default function DownloadPublicFile(props) {
  const [download, setDownload] = useState(false);

  useEffect(() => {
    if (download) {
      const link = document.createElement("a");
      link.href =
        "http://localhost:9000/api/v1/service/email/attachment/dummy.pdf";
      link.setAttribute("download", "dummy.pdf");
      link.click();
      setDownload(false);
    }
  }, [download]);

  return <button onClick={() => setDownload(true)}>Download Public</button>;
}
