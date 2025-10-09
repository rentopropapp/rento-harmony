import { useState, useRef } from "react";
import { CreditCard, Calendar, Plus, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import TenantBottomNav from "@/components/TenantBottomNav";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TenantPayments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      property: "Hillview Apartment",
      date: "2024-10-01",
      amount: "800,000",
      method: "Mobile Money",
      status: "Completed",
      purpose: "Rent",
    },
    {
      id: 2,
      property: "Garden Cottage Viewing",
      date: "2024-09-28",
      amount: "50,000",
      method: "Card",
      status: "Completed",
      purpose: "Property Viewing",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    property: "",
    date: "",
    amount: "",
    purpose: "",
  });

  const tableRef = useRef<HTMLDivElement>(null);

  const handleAddPayment = () => {
    if (!newPayment.property || !newPayment.date || !newPayment.amount || !newPayment.purpose) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newRecord = {
      id: payments.length + 1,
      property: newPayment.property,
      date: newPayment.date,
      amount: newPayment.amount,
      method: "Manual Entry",
      status: "Completed",
      purpose: newPayment.purpose,
    };

    setPayments([...payments, newRecord]);
    setNewPayment({ property: "", date: "", amount: "", purpose: "" });
    setShowForm(false);
  };

  const handleDownloadPDF = async () => {
    const input = tableRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Header Branding
    pdf.setFillColor(8, 150, 126);
    pdf.rect(0, 0, 210, 20, "F"); // Rento green header
    pdf.addImage(rentoLogo, "PNG", 10, 3, 18, 14);
    pdf.setFontSize(14);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Rento Tenant Payment Report", 35, 13);

    // Content
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);

    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 10, 290);

    pdf.save("Rento_Tenant_Payments.pdf");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src={rentoLogo} alt="Rento" className="h-8" />
            <h1 className="font-heading text-xl font-semibold text-foreground">Rento</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/tenant/home" className="text-muted-foreground hover:text-primary">Home</a>
            <a href="/tenant/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</a>
            <a href="/tenant/payments" className="text-primary font-medium">Payments</a>
            <a href="/tenant/profile" className="text-muted-foreground hover:text-primary">Profile</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">Payment History</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>

        <div ref={tableRef} className="grid gap-6">
          {payments.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-border">
              <div>
                <h3 className="font-semibold text-foreground">{p.property}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4" /> {p.date}
                </p>
                <p className="text-sm mt-2 text-muted-foreground">Purpose: {p.purpose}</p>
                <p className="text-sm text-muted-foreground">Payment Method: {p.method}</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="font-semibold text-foreground">UGX {p.amount}</p>
                <span className="text-xs text-green-600">{p.status}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Payment Form */}
        {showForm && (
          <Card className="mt-8 p-6 border-border">
            <h3 className="font-heading text-lg font-semibold mb-4 text-foreground">
              Add Payment Record
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property">Property Name</Label>
                <Input
                  id="property"
                  placeholder="e.g., Hillview Apartment"
                  value={newPayment.property}
                  onChange={(e) => setNewPayment({ ...newPayment, property: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="date">Payment Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount Paid (UGX)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 800000"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="purpose">Purpose of Payment</Label>
                <Select
                  onValueChange={(value) => setNewPayment({ ...newPayment, purpose: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Property Viewing">Property Viewing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddPayment}
              >
                Add Payment
              </Button>
            </div>
          </Card>
        )}
      </main>

      {/* Floating Add Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          title="Add Payment"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      <TenantBottomNav />
    </div>
  );
};

export default TenantPayments;
