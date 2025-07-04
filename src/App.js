import React, { useState } from "react";
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from "./components/InvoicePreview";
import GeneratePDF from "./components/GeneratePDF";

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Textile Invoice Generator</h1>
      {!invoiceData ? (
        <InvoiceForm onFormSubmit={handleFormSubmit} />
      ) : (
        <>
          <InvoicePreview data={invoiceData} />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <GeneratePDF />
            <button onClick={() => setInvoiceData(null)}>Edit Again</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
