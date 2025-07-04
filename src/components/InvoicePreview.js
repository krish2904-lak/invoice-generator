import React from "react";
import "./InvoicePreview.css";


const InvoicePreview = ({ data }) => {
  const {
    billTo,
    shipTo,
    invoiceDetails,
    items,
    cgst,
    sgst,
    igst,
    discount,
    transport,
  } = data;
  const agentName = invoiceDetails.agent || "";

  const subtotal = items.reduce((total, item) => total + item.qty * item.rate, 0);
  const discountAmt = (discount / 100) * subtotal;
  const taxable = subtotal - discountAmt;
  const cgstAmt = (cgst / 100) * taxable;
  const sgstAmt = (sgst / 100) * taxable;
  const igstAmt = (igst / 100) * taxable;
  const totalTax = cgstAmt + sgstAmt + igstAmt;
  const total = taxable + totalTax;
 

 const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
    'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
    'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const inWords = (n) => {
    if (n === 0) return '';
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
    if (n < 1000000000) return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
    return 'Number too large';
  };

  if (num === 0) return 'Zero';
  return inWords(num).trim();
};


  return (
    <div className="invoice-preview" id="invoice-preview">
      {/* Header */}
      <div className="header">
        <header className="logo-header">
          <img src="/Navkar.png" alt="NAVKAR TEX FAB" className="invoice-logo" />
        </header>
        <div className="left-header">
          <h1>NAVKAR TEX FAB</h1>
          <p>
            SHOP NO. A-23 B.T.M, A-BLOCK<br />
            GANGAPUR CHOURAHA, BHILWARA - 311001<br />
            RAJASTHAN<br />
            9352102136, 9829047450
          </p>
        </div>
         <div className="right-header">
    <div className="gst-block">
      <p><strong>GSTIN:</strong> 08AAOPJ6518J1ZA</p>
      <p><strong>Bill No:</strong> {invoiceDetails.billNo}</p>
      <p><strong>Bill Date:</strong> {invoiceDetails.billDate}</p>
    </div>
  </div>
</div>

      {/* Billing Info */}
      <div className="billing-info">
        <div className="bill-box">
          <h3>Detail of Receiver (Billed To)</h3>
          <p>Name: {billTo.name}</p>
          <p>Address: {billTo.address}</p>
          <p>Mobile: {billTo.mobile}</p>
          <p>GSTIN: {billTo.gstin}</p>
          <p>State Code: {billTo.stateCode}</p>
        </div>
        <div className="bill-box">
          <h3>Detail of Consignee (Shipped To)</h3>
          <p>Name: {shipTo.name}</p>
          <p>Address: {shipTo.address}</p>
          <p>Mobile: {shipTo.mobile}</p>
          <p>GSTIN: {shipTo.gstin}</p>
          <p>State Code: {shipTo.stateCode}</p>
        </div>
      </div>

       <table className="item-table-vertical-only">
      <thead>
        <tr>
          <th>Case/Chl No</th>
          <th>Name of Product</th>
          <th>HSN</th>
          <th>MOU</th>
          <th>Pcs</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td>{item.caseNo}</td>
            <td>{item.product}</td>
            <td>{item.hsn}</td>
            <td>{item.mou}</td>
            <td>{item.pcs}</td>
            <td>{item.qty}</td>
            <td>{item.rate}</td>
            <td>{(item.qty * item.rate).toFixed(2)}</td>
          </tr>
        ))}


        {/* Fill empty rows to maintain layout */}
        {Array.from({ length: 5 - items.length }).map((_, i) => (
  <tr key={`empty-${i}`} className="empty-row">
    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
  </tr>
))}
          <tr style={{ fontWeight: "bold" }}>
  <td>Total</td>
  <td></td>
  <td>1 Bale</td>
  <td></td>
  <td>{items.reduce((sum, item) => sum + item.pcs, 0)}</td>
<td>
  {items.reduce((sum, item) => sum + parseFloat(item.qty || 0), 0).toFixed(2)} MTR
</td>

  <td></td>
  <td>{subtotal.toFixed(2)}</td>
</tr>

        </tbody>
      </table>

      {/* Transport & Agent section moved up */}
     {/* Transport and Summary Section */}
<div className="bottom-section">
  <div className="transport-box">
    <p><strong>Agent:</strong> {agentName}</p>
    <p><strong>Transport:</strong> {transport?.transportName}</p>
    <p><strong>Tr. GSTIN:</strong> {transport?.transportGstin}</p>
    <p><strong>E-Way Bill No:</strong> {transport?.ewayBillNo}</p>
  </div>

  {/* ✅ Wrap this properly */}
  <div className="summary-box">
    <div className="summary-row">
      <span>Total Taxable Amount</span>
      <span>₹{taxable.toFixed(2)}</span>
    </div>
    <div className="summary-row">
      <span>CGST ({cgst}%)</span>
      <span>₹{cgstAmt.toFixed(2)}</span>
    </div>
    <div className="summary-row">
      <span>SGST ({sgst}%)</span>
      <span>₹{sgstAmt.toFixed(2)}</span>
    </div>
    <div className="summary-row">
      <span>IGST ({igst}%)</span>
      <span>₹{igstAmt.toFixed(2)}</span>
    </div>
    <div className="summary-row bold">
      <span>Total Tax Amount</span>
      <span>₹{totalTax.toFixed(2)}</span>
    </div>

    {Math.round(total) !== total && (
      <div className="summary-row round-off">
        <span>Rounded Off</span>
        <span>₹{(Math.round(total) - total).toFixed(2)}</span>
      </div>
    )}

    <div className="summary-row bold net">
      <span>Net Amount</span>
      <span>₹{Math.round(total).toFixed(2)}</span>
    </div>
  </div>
</div>


      {/* Bank Info and Summary below */}
      <div className="bottom-grid">
        <div className="bank-info">
          <p><strong>Bank:</strong> HDFC BANK, S.K. PLAZA</p>
          <p><strong>A/C No:</strong> 50200068102420</p>
          <p><strong>IFSC:</strong> HDFC0000350</p>
        </div>

       
      </div>

      {/* Rupees in Words */}
      <div className="rupees-box">
        <p><strong>Rupees:</strong> <i>{numberToWords(Math.floor(total))} Only</i></p>
      </div>

      {/* GST Summary */}
       <div className="terms-and-summary-row">
        <div className="terms-section">
          <strong>Terms & Conditions:</strong>
          <ol>
            <li>Payment within 30 days from bill date.</li>
            <li>Payment should be made by A/c pay Chq/DD/Net Banking only.</li>
            <li>Goods once sold will not be taken back.</li>
            <li>All disputes subject to BHILWARA jurisdiction only.</li>
          </ol>
        </div>

        <div className="gst-summary-wrapper">
          <table className="gst-summary">
            <thead>
              <tr>
                <th>HSN</th>
                <th>Taxable</th>
                <th>CGST%</th>
                <th>SGST%</th>
                <th>IGST%</th>
                <th>CGST Amt</th>
                <th>SGST Amt</th>
                <th>IGST Amt</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const taxableValue = item.qty * item.rate;
                const itemCgst = (cgst / 100) * taxableValue;
                const itemSgst = (sgst / 100) * taxableValue;
                const itemIgst = (igst / 100) * taxableValue;
                return (
                  <tr key={i}>
                    <td>{item.hsn}</td>
                    <td>{taxableValue.toFixed(2)}</td>
                    <td>{cgst.toFixed(2)}</td>
                    <td>{sgst.toFixed(2)}</td>
                    <td>{igst.toFixed(2)}</td>
                    <td>{itemCgst.toFixed(2)}</td>
                    <td>{itemSgst.toFixed(2)}</td>
                    <td>{itemIgst.toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr>
                <td><strong>Total</strong></td>
                <td>{taxable.toFixed(2)}</td>
                <td></td><td></td><td></td>
                <td>{cgstAmt.toFixed(2)}</td>
                <td>{sgstAmt.toFixed(2)}</td>
                <td>{igstAmt.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="footer">
        <p><strong>For: NAVKAR TEX FAB</strong></p>
        <div className="signatures">
          <span>Prepared By</span>
          <span>Checked By</span>
          <strong>Authorised Signatory</strong>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
