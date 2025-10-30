// PaymentDetails.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import UploadIcon from "@/components/Icons/Team/UploadIcon";
import Bank from "@/components/Icons/Team/Bank";

interface PaymentFormData {
  rateType: string;
  currency: string;
  amount: string;
  paymentMethod: string;
  gstPan: string;
  documents: File[];
}

interface PaymentDetailsProps {
  formData: PaymentFormData;
  onUpdate: (updates: Partial<PaymentFormData>) => void;
  onAddDocument: (file: File) => void;
  onRemoveDocument: (index: number) => void;
  errors: Record<string, string>;
}

function PaymentDetails({
  formData,
  onUpdate,
  onAddDocument,
  onRemoveDocument,
  errors,
}: PaymentDetailsProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAddDocument(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Card className="bg-zinc-900/50 border-zinc-800 p-4">
          <h3 className="text-lg font-medium mb-4 text-white">Payment & Contract</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-zinc-300">Rate Type</Label>
              <Select value={formData.rateType} onValueChange={(v) => onUpdate({ rateType: v })}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select Rate Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Currency</Label>
                <Select value={formData.currency} onValueChange={(v) => onUpdate({ currency: v })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">$</SelectItem>
                    <SelectItem value="INR">₹</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-zinc-300">Amount</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => onUpdate({ amount: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Amount"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Payment Method</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { value: "bank", label: "Bank Transfer", icon: <Bank /> },
                  { value: "cash", label: "Cash", icon: "💵" },
                  { value: "cheque", label: "Cheque", icon: "📄" },
                  { value: "online", label: "Online Transfer", icon: "💳" },
                ].map((method) => (
                  <Button
                    key={method.value}
                    variant={formData.paymentMethod === method.value ? "default" : "outline"}
                    className="bg-zinc-800 border-zinc-700 text-white justify-start h-auto p-3"
                    onClick={() => onUpdate({ paymentMethod: method.value })}
                  >
                    <span className="mr-2">{method.icon}</span>
                    {method.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-zinc-300">GST/PAN Details</Label>
              <Input
                value={formData.gstPan}
                onChange={(e) => onUpdate({ gstPan: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Details"
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="bg-zinc-900/50 border-zinc-800 p-4">
          <h3 className="text-lg font-medium mb-4 text-white">Documents & Files</h3>
          <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-zinc-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl"><UploadIcon /></span>
                </div>
                <p className="text-zinc-400">Drop a file or click to browse</p>
                <p className="text-xs text-zinc-500">File with up to 10,000 rows works best</p>
                <Button asChild variant="outline" className="mt-2">
                  <label htmlFor="file-upload">Browse</label>
                </Button>
              </div>
            </label>
          </div>
          {formData.documents.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-zinc-800 rounded">
                  <span className="text-white">{doc.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveDocument(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default PaymentDetails;