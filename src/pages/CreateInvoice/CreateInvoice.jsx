import React, { useState } from "react";

import {
    ArrowLeft,
    Trash2,
    Plus,
    Upload,
    Check,
    Mail,
    MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


function CreateInvoice() {

    const navigate = useNavigate();

    const [invoiceDetails, setInvoiceDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [clientDetails, setClientDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [items, setItems] = useState([
        { id: 1, description: "", quantity: 1, price: 0, tax: 18 },
    ]);

    const [notes, setNotes] = useState("");
    const [discount, setDiscount] = useState(0);
    const [sendTo, setSendTo] = useState("email");
    const [file, setFile] = useState(null);


    const handleInvoiceChange = (e) => {
        const { name, value } = e.target;
        setInvoiceDetails({ ...invoiceDetails, [name]: value });
    };


    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientDetails({ ...clientDetails, [name]: value });
    };


    const updateItem = (id, field, value) => {
        setItems(
            items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          [field]:
                              field === "quantity" ||
                              field === "price" ||
                              field === "tax"
                                  ? Number(value)
                                  : value,
                      }
                    : item
            )
        );
    };


    const addItem = () => {
        setItems([
            ...items,
            { id: Date.now(), description: "", quantity: 1, price: 0, tax: 18 },
        ]);
    };


    const removeItem = (id) => {
        if (items.length === 1) return;
        setItems(items.filter((item) => item.id !== id));
    };


    const subTotal = items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );


    const taxAmount = items.reduce(
        (total, item) =>
            total + (item.quantity * item.price * item.tax) / 100,
        0
    );


    const totalAmount = subTotal - Number(discount || 0) + taxAmount;


    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };


    const handleSave = (action) => {
        if (action === "draft") alert("Invoice saved as draft.");
        if (action === "preview") alert("Invoice preview will open here.");
        if (action === "send") alert("Invoice sent successfully.");
    };


    return (
        <div className="w-full bg-theme-page text-theme-text px-4 sm:px-6 lg:px-8 py-5 sm:py-7 transition-colors duration-300">

            {/* HEADER */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/invoice")}
                        className="flex items-center justify-center w-9 h-9 rounded-md border border-theme-border-light text-theme-text-secondary bg-theme-surface hover:bg-theme-surface-secondary transition"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-2xl sm:text-[27px] font-semibold text-theme-text">
                            Create Invoice
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <button
                                onClick={() => navigate("/invoice")}
                                className="text-primary hover:underline"
                            >
                                Invoice
                            </button>

                            <span className="text-theme-text-muted">›</span>

                            <span className="text-theme-text-secondary">
                                Create Invoice
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            {/* MAIN CARD */}
            <div className="border border-theme-border-light bg-theme-surface rounded-xl p-4 sm:p-5 lg:p-6 transition-colors duration-300">

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_250px] gap-6">

                    {/* LEFT SIDE */}
                    <div className="min-w-0">

                        {/* INVOICE DETAILS */}
                        <h2 className="text-xl font-semibold text-primary mb-5">
                            Invoice Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <FormField
                                label="First Name"
                                name="firstName"
                                value={invoiceDetails.firstName}
                                onChange={handleInvoiceChange}
                                placeholder="Enter first name"
                            />

                            <FormField
                                label="Last Name"
                                name="lastName"
                                value={invoiceDetails.lastName}
                                onChange={handleInvoiceChange}
                                placeholder="Enter last name"
                            />

                            <FormField
                                label="Email"
                                type="email"
                                name="email"
                                value={invoiceDetails.email}
                                onChange={handleInvoiceChange}
                                placeholder="Enter email address"
                            />

                            <FormField
                                label="Phone Number"
                                name="phone"
                                value={invoiceDetails.phone}
                                onChange={handleInvoiceChange}
                                placeholder="Enter phone number"
                            />
                        </div>


                        {/* CLIENT DETAILS */}
                        <h2 className="text-xl font-semibold text-primary mt-8 mb-5">
                            Client Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <FormField
                                label="First Name"
                                name="firstName"
                                value={clientDetails.firstName}
                                onChange={handleClientChange}
                                placeholder="Enter first name"
                            />

                            <FormField
                                label="Last Name"
                                name="lastName"
                                value={clientDetails.lastName}
                                onChange={handleClientChange}
                                placeholder="Enter last name"
                            />

                            <FormField
                                label="Email"
                                type="email"
                                name="email"
                                value={clientDetails.email}
                                onChange={handleClientChange}
                                placeholder="Enter email address"
                            />

                            <FormField
                                label="Phone Number"
                                name="phone"
                                value={clientDetails.phone}
                                onChange={handleClientChange}
                                placeholder="Enter phone number"
                            />
                        </div>


                        {/* INVOICE ITEMS */}
                        <h2 className="text-xl font-semibold text-primary mt-8 mb-4">
                            Invoice Items
                        </h2>

                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[760px] border border-theme-border-light rounded-md overflow-hidden">
                                <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr_45px] bg-purple-100 dark:bg-purple-500/10 border-b border-theme-border-light">
                                    <div className="px-4 py-3 text-xs font-medium text-theme-text">Item/Description</div>
                                    <div className="px-3 py-3 text-xs font-medium text-theme-text">Quantity</div>
                                    <div className="px-3 py-3 text-xs font-medium text-theme-text">Unit Price (₹)</div>
                                    <div className="px-3 py-3 text-xs font-medium text-theme-text">Tax (%)</div>
                                    <div className="px-3 py-3 text-xs font-medium text-theme-text">Amount (₹)</div>
                                    <div></div>
                                </div>

                                {items.map((item) => {
                                    const amount = item.quantity * item.price;

                                    return (
                                        <div
                                            key={item.id}
                                            className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr_45px] items-center border-b border-theme-border-light last:border-b-0 bg-theme-surface"
                                        >
                                            <div className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                    placeholder="Enter item or service"
                                                    className="w-full h-9 bg-theme-surface text-theme-text placeholder:text-theme-text-muted border border-theme-border-light px-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>

                                            <div className="p-3">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                                                    className="w-full h-9 bg-theme-surface text-theme-text border border-theme-border-light px-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>

                                            <div className="p-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, "price", e.target.value)}
                                                    className="w-full h-9 bg-theme-surface text-theme-text border border-theme-border-light px-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                />
                                            </div>

                                            <div className="p-3">
                                                <select
                                                    value={item.tax}
                                                    onChange={(e) => updateItem(item.id, "tax", e.target.value)}
                                                    className="w-full h-9 bg-theme-surface text-theme-text border border-theme-border-light px-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                >
                                                    <option value="0">0% GST</option>
                                                    <option value="5">5% GST</option>
                                                    <option value="12">12% GST</option>
                                                    <option value="18">18% GST</option>
                                                    <option value="28">28% GST</option>
                                                </select>
                                            </div>

                                            <div className="px-3 text-xs text-theme-text-secondary">
                                                ₹ {amount.toFixed(2)}
                                            </div>

                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        <button
                            type="button"
                            onClick={addItem}
                            className="flex items-center gap-1 mt-3 px-3 py-1.5 border border-primary text-primary text-xs rounded-sm hover:bg-purple-50 dark:hover:bg-purple-500/10 transition"
                        >
                            <Plus size={14} />
                            Add Item
                        </button>
                    </div>


                    {/* RIGHT SIDE */}
                    <div className="xl:border-l xl:border-theme-border-light xl:pl-5">
                        <div className="border border-theme-border-light bg-theme-surface shadow-sm">

                            {/* SUMMARY */}
                            <div className="p-3">
                                <h2 className="text-xl font-semibold text-primary mb-4">
                                    Summary
                                </h2>

                                <div className="flex justify-between text-xs mb-4">
                                    <span className="text-theme-text-secondary">Sub Total</span>
                                    <span className="text-theme-text">₹ {subTotal.toFixed(2)}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs mb-4">
                                    <span className="text-theme-text-secondary">Discount</span>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                            className="w-20 h-7 bg-theme-surface text-theme-text border border-theme-border-light px-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                        />
                                        <span className="text-theme-text">
                                            ₹ {Number(discount || 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs mb-5">
                                    <span className="text-theme-text-secondary">Tax</span>
                                    <span className="text-theme-text">₹ {taxAmount.toFixed(2)}</span>
                                </div>

                                <div className="border-t border-theme-border-light pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm text-theme-text">
                                            Total Amount
                                        </span>

                                        <span className="text-lg font-semibold text-primary">
                                            ₹ {totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>


                            {/* ADDITIONAL OPTIONS */}
                            <div className="border-t border-theme-border-light p-3">
                                <h2 className="text-xl font-semibold text-primary mb-5">
                                    Additional Options
                                </h2>

                                <label className="block text-xs font-medium text-theme-text-secondary mb-2">
                                    Notes (optional)
                                </label>

                                <div className="relative">
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        maxLength={300}
                                        rows="4"
                                        placeholder="Add any notes or terms for this invoice"
                                        className="w-full bg-theme-surface text-theme-text placeholder:text-theme-text-muted border border-theme-border-light p-2 text-xs resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />

                                    <span className="absolute bottom-2 right-2 text-[10px] text-theme-text-muted">
                                        {notes.length}/300
                                    </span>
                                </div>


                                <label className="block text-xs font-medium text-theme-text-secondary mt-5 mb-2">
                                    Attach Document (optional)
                                </label>

                                <label className="flex flex-col items-center justify-center min-h-[105px] bg-theme-surface border border-theme-border-light cursor-pointer hover:bg-theme-surface-secondary transition">
                                    <Upload size={20} className="text-theme-text-secondary mb-2" />

                                    <span className="text-xs text-theme-text-secondary">
                                        Drag and drop file here
                                    </span>

                                    <span className="text-xs text-theme-text-secondary my-2">
                                        or
                                    </span>

                                    <span className="border border-primary text-primary px-3 py-1 rounded text-xs">
                                        Browse file
                                    </span>

                                    <span className="text-[10px] text-theme-text-muted mt-2">
                                        {file ? file.name : "(PDF, JPG, PNG - Max 5MB)"}
                                    </span>

                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>


                                <p className="text-xs font-medium text-theme-text-secondary mt-5 mb-3">
                                    Send Invoice To
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <RadioOption
                                        value="email"
                                        currentValue={sendTo}
                                        onChange={setSendTo}
                                        label="Email"
                                        icon={Mail}
                                    />

                                    <RadioOption
                                        value="whatsapp"
                                        currentValue={sendTo}
                                        onChange={setSendTo}
                                        label="WhatsApp"
                                        icon={MessageCircle}
                                    />

                                    <RadioOption
                                        value="both"
                                        currentValue={sendTo}
                                        onChange={setSendTo}
                                        label="Both"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* BOTTOM BUTTONS */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => handleSave("draft")}
                        className="w-full sm:w-auto px-6 py-3 border border-theme-border-light bg-theme-surface rounded-md text-sm font-medium text-theme-text-secondary hover:bg-theme-surface-secondary active:scale-[0.98] transition"
                    >
                        Save as Draft
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSave("preview")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-hover active:scale-[0.98] transition"
                    >
                        <Check size={16} />
                        Save & Preview
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSave("send")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-theme-surface text-theme-text border border-theme-border-light rounded-md text-sm font-medium hover:bg-theme-surface-secondary active:scale-[0.98] transition"
                    >
                        Save & Send
                    </button>
                </div>
            </div>
        </div>
    );
}


// =====================================================
// SUB COMPONENTS
// =====================================================

function FormField({ label, type = "text", name, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-xs font-medium text-theme-text-secondary mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-10 bg-theme-surface text-theme-text placeholder:text-theme-text-muted border border-theme-border-light px-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
        </div>
    );
}


function RadioOption({ value, currentValue, onChange, label, icon: Icon }) {
    return (
        <label className="flex items-center gap-2 text-xs text-theme-text cursor-pointer">
            <input
                type="radio"
                name="sendTo"
                value={value}
                checked={currentValue === value}
                onChange={(e) => onChange(e.target.value)}
                className="accent-primary"
            />

            {Icon && <Icon size={14} />}

            {label}
        </label>
    );
}


export default CreateInvoice;