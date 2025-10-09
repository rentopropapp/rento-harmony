import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Download } from "lucide-react";
import { ManagerTopNav, ManagerBottomNav } from "@/components/ManagerNavigation";
import { useLocation } from "react-router-dom";
import rentoLogo from "@/assets/rento-logo-dark.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Payment {
  id: number;
  tenantName: string;
  unit: string;
  amount: string;
  date: string;
}

const ManagerPayments = () => {
  const location = useLocation();
  const property = location.state?.property;
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, tenantName: "John Kamau", unit: "Hillview 2A", amount: "800,000", date: "2024-10-01" },
    { id: 2, tenantName: "Sarah Nakato", unit: "Hillview 3B", amount: "800,000", date: "2024-09-28" },
    { id: 3, tenantName: "Michael Ouma", unit: "Garden Cottage 1", amount: "950,000", date: "2024-09-25" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPayment, setNewPayment] = useState({ tenantName: "", unit: "", amount: "", date: "" });
  const tableRef = useRef<HTMLDivElement>(null);

  const handleAddPayment = () => {
    if (!newPayment.tenantName || !newPayment.unit || !newPayment.amount || !newPayment.date) {
      alert("Please fill in all fields before adding a payment record.");
      return;
    }
    const newRecord = {
      id: payments.length + 1,
      ...newPayment,
    };
    setPayments([...payments, newRecord]);
    setNewPayment({ tenantName: "", unit: "", amount: "", date: "" });
    setShowForm(false);
  };

  const handleDownloadPDF = async () => {
    const input = tableRef.current;
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.setFontSize(14);
    pdf.text("Rento Property Payment Records", 10, 15);
    pdf.addImage(imgData, "PNG", 10, 25, imgWidth, imgHeight);
    pdf.save("property-payments.pdf");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <ManagerTopNav property={property} />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Property Payments
            </h1>
            <p className="text-sm text-muted-foreground">
              Track and manage all rent payments received for{" "}
              <span className="font-medium text-foreground">
                {property?.name || "Selected Property"}
              </span>
              .
            </p>
          </div>
          <img src={rentoLogo} alt="Rento" className="h-8" />
        </div>

        {/* Payment List */}
        <Card ref={tableRef} className="p-6 overflow-x-auto border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Payment Records
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-3 text-muted-foreground font-medium">Tenant</th>
                <th className="py-3 text-muted-foreground font-medium">Unit</th>
                <th className="py-3 text-muted-foreground font-medium">Amount</th>
                <th className="py-3 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 text-foreground">{payment.tenantName}</td>
                  <td className="py-3 text-muted-foreground">{payment.unit}</td>
                  <td className="py-3 text-primary font-medium">
                    UGX {payment.amount}
                  </td>
                  <td className="py-3 text-muted-foreground">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Add Payment Form */}
        {showForm && (
          <Card className="mt-6 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              Add Payment Record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tenant Name</Label>
                <Input
                  value={newPayment.tenantName}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, tenantName: e.target.value })
                  }
                  placeholder="Enter tenant name"
                />
              </div>
              <div>
                <Label>Unit</Label>
                <Input
                  value={newPayment.unit}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, unit: e.target.value })
                  }
                  placeholder="Enter unit (e.g. Hillview 2A)"
                />
              </div>
              <div>
                <Label>Amount (UGX)</Label>
                <Input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                  placeholder="Enter amount paid"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                />
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

      <ManagerBottomNav property={property} />
    </div>
  );
};

export default ManagerPayments;
