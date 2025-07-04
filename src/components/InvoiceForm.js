import React, { useState, useEffect } from "react";
import InvoicePreview from "./InvoicePreview";
import GeneratePDF from "./GeneratePDF";
import "./InvoiceForm.css";

const InvoiceForm = () => {


  const [formData, setFormData] = useState({
    billTo: {
      name: "",
      address: "",
      gstin: "",
      stateCode: "",
      mobile: "",
    },
    shipTo: {
      name: "",
      address: "",
      gstin: "",
      stateCode: "",
      mobile: "",
    },
    invoiceDetails: {
      billNo: "",
      billDate: "",
      ourGstin: "",
      agent: "",
    },
    transport: {
      transportName: "",
      transportGstin: "",
      ewayBillNo: "",
    },
    items: [
      { caseNo: "", hsn: "", product: "", mou: "LUMP", pcs: 1, qty: 0, rate: 0 },
    ],
    cgst: 2.5,
    sgst: 2.5,
    igst: 0,
    discount: 0,
  });


  // Automatically adjust tax based on GSTIN state code
  const updateTaxesBasedOnGSTIN = (gstin) => {
    const stateCode = gstin?.substring(0, 2);
    if (stateCode === "08") {
      setFormData((prev) => ({
        ...prev,
        cgst: 2.5,
        sgst: 2.5,
        igst: 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        cgst: 0,
        sgst: 0,
        igst: 5,
      }));
    }
  };

  const handleChange = (section, key, value) => {
    if (section === "billTo" && key === "gstin") {
      updateTaxesBasedOnGSTIN(value);
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { caseNo: "", hsn: "", product: "", mou: "LUMP", pcs: 1, qty: 0, rate: 0 },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

 
  return (
    <div className="invoice-form">
      <h2>🧾 Invoice Generator - NAVKAR TEX FAB</h2>

  

      <div className="form-section">
        {/* BILL TO */}
        <div className="form-column">
          <h4>📌 Billed To</h4>
          <input placeholder="Name" onChange={(e) => handleChange("billTo", "name", e.target.value)} />
          <input placeholder="Address" onChange={(e) => handleChange("billTo", "address", e.target.value)} />
          <input
            placeholder="GSTIN"
            onChange={(e) => {
              const value = e.target.value;
              handleChange("billTo", "gstin", value);
            }}
          />
          <input placeholder="State Code" onChange={(e) => handleChange("billTo", "stateCode", e.target.value)} />
          <input placeholder="Mobile No." onChange={(e) => handleChange("billTo", "mobile", e.target.value)} />
        </div>

        {/* SHIP TO */}
        <div className="form-column">
          <h4>📦 Shipped To</h4>
          <input placeholder="Name" onChange={(e) => handleChange("shipTo", "name", e.target.value)} />
          <input placeholder="Address" onChange={(e) => handleChange("shipTo", "address", e.target.value)} />
          <input placeholder="GSTIN" onChange={(e) => handleChange("shipTo", "gstin", e.target.value)} />
          <input placeholder="State Code" onChange={(e) => handleChange("shipTo", "stateCode", e.target.value)} />
          <input placeholder="Mobile No." onChange={(e) => handleChange("shipTo", "mobile", e.target.value)} />
        </div>

        {/* INVOICE INFO */}
        <div className="form-column">
          <h4>🧾 Invoice Info</h4>
          <input placeholder="Bill No" onChange={(e) => handleChange("invoiceDetails", "billNo", e.target.value)} />
          <input type="date" onChange={(e) => handleChange("invoiceDetails", "billDate", e.target.value)} />
          <input placeholder="Our GSTIN" onChange={(e) => handleChange("invoiceDetails", "ourGstin", e.target.value)} />
          <input placeholder="Agent Name" onChange={(e) => handleChange("invoiceDetails", "agent", e.target.value)} />

          <h4>🚚 Transport Info</h4>
          <input placeholder="Transport Name" onChange={(e) => handleChange("transport", "transportName", e.target.value)} />
          <input placeholder="Transport GSTIN" onChange={(e) => handleChange("transport", "transportGstin", e.target.value)} />
          <input placeholder="E-Way Bill No." onChange={(e) => handleChange("transport", "ewayBillNo", e.target.value)} />
        </div>
      </div>

      <h4>📋 Items</h4>
      {formData.items.map((item, idx) => (
        <div className="item-row" key={idx}>
          <input placeholder="Case No" value={item.caseNo} onChange={(e) => handleItemChange(idx, "caseNo", e.target.value)} />
          <input placeholder="HSN" value={item.hsn} onChange={(e) => handleItemChange(idx, "hsn", e.target.value)} />
          <input placeholder="Product" value={item.product} onChange={(e) => handleItemChange(idx, "product", e.target.value)} />
          <select value={item.mou} onChange={(e) => handleItemChange(idx, "mou", e.target.value)}>
            <option value="LUMP">LUMP</option>
            <option value="THAN">THAN</option>
            <option value="CUT-PIECE">CUT-PIECE</option>
            <option value="OTHER">OTHER</option>
          </select>
          <input type="number" placeholder="Pcs" value={item.pcs} onChange={(e) => handleItemChange(idx, "pcs", parseFloat(e.target.value))} />
          <input type="number" step="0.01" placeholder="Qty (MTR)" value={item.qty} onChange={(e) => handleItemChange(idx, "qty", parseFloat(e.target.value))} />
          <input type="number" step="0.01" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(idx, "rate", parseFloat(e.target.value))} />
          <button onClick={() => removeItem(idx)}>❌</button>
        </div>
      ))}
      <button onClick={addItem}>➕ Add Item</button>

      <div className="form-section">
        <div className="form-column">
          <h4>💸 Tax & Discount</h4>
          <input type="number" placeholder="CGST %" value={formData.cgst} onChange={(e) => setFormData({ ...formData, cgst: parseFloat(e.target.value) })} />
          <input type="number" placeholder="SGST %" value={formData.sgst} onChange={(e) => setFormData({ ...formData, sgst: parseFloat(e.target.value) })} />
          <input type="number" placeholder="IGST %" value={formData.igst} onChange={(e) => setFormData({ ...formData, igst: parseFloat(e.target.value) })} />
          <input type="number" placeholder="Discount %" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })} />
        </div>
      </div>

      <button className="download-btn" onClick={() => GeneratePDF("invoice-preview")}>📥 Generate PDF</button>

      <div id="invoice-preview">
        <InvoicePreview data={{ ...formData}} />
      </div>
    </div>
  );
};

export default InvoiceForm;
