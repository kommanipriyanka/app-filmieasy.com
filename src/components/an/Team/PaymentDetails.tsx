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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Payment & Contract
          </h3>
          <div className="space-y-3.5">
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Rate Type</Label>
              <Select value={formData.rateType} onValueChange={(v) => onUpdate({ rateType: v })}>
                <SelectTrigger className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300">
                  <SelectValue placeholder="Select Rate Type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="daily" className="text-white">Daily</SelectItem>
                  <SelectItem value="hourly" className="text-white">Hourly</SelectItem>
                  <SelectItem value="project" className="text-white">Project</SelectItem>
                </SelectContent>
              </Select>
              {errors.rateType && <p className="text-red-500 text-xs mt-1">{errors.rateType}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">Currency</Label>
                <Select value={formData.currency} onValueChange={(v) => onUpdate({ currency: v })}>
                  <SelectTrigger className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="USD" className="text-white">$</SelectItem>
                    <SelectItem value="INR" className="text-white">₹</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">Amount</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => onUpdate({ amount: e.target.value })}
                  className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                  placeholder="Amount"
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Payment Method</Label>
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
                    className="bg-(--input-bg) border-zinc-800/50 text-white justify-start h-auto p-2 text-xs hover:bg-zinc-800/50"
                    onClick={() => onUpdate({ paymentMethod: method.value })}
                  >
                    <span className="mr-2 text-sm">{method.icon}</span>
                    {method.label}
                  </Button>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">GST/PAN Details</Label>
              <Input
                value={formData.gstPan}
                onChange={(e) => onUpdate({ gstPan: e.target.value })}
                className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                placeholder="Details"
              />
              {errors.gstPan && <p className="text-red-500 text-xs mt-1">{errors.gstPan}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Documents & Files
          </h3>
          <div className="border-2 border-dashed border-zinc-800/50 rounded-lg p-6 text-center max-w-sm mx-auto">
            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto bg-(--input-bg) rounded-full flex items-center justify-center">
                  <span className="text-xl"><UploadIcon /></span>
                </div>
                <p className="text-zinc-400 text-sm">Drop a file or click to browse</p>
                <p className="text-xs text-zinc-500">File with up to 10,000 rows works best</p>
                <Button asChild variant="outline" className="mt-2 bg-(--input-bg) border-zinc-800/50 text-white h-8 px-4 text-xs">
                  <label htmlFor="file-upload">Browse</label>
                </Button>
              </div>
            </label>
          </div>
          {formData.documents.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-(--input-bg) border border-zinc-800/50 rounded text-white text-sm">
                  <span>{doc.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveDocument(index)}
                    className="text-red-400 hover:text-red-300 h-6 px-2 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
          {errors.documents && <p className="text-red-500 text-xs mt-1">{errors.documents}</p>}
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;