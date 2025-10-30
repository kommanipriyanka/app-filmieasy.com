import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PersonalDetails from "./PersonalDetails";
import PaymentDetails from "./PaymentDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import { useNavigate } from "@tanstack/react-router";
import screen1 from "@/assets/screen1.webp";
import screen2 from "@/assets/screen1.webp";
import screen3 from "@/assets/screen1.webp";

interface FormData {
  personal: {
    fullName: string;
    gender: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    languages: { name: string }[];
    profileImage?: string;
  };
  professional: {
    department: string;
    roleType: string;
    experience: string;
    unionMembership: string;
    status: string;
    blockFrom: string;
    blockTo: string;
  };
  payment: {
    rateType: string;
    currency: string;
    amount: string;
    paymentMethod: string;
    gstPan: string;
    documents: File[];
  };
}

interface AddUserFormProps {
  currentStep: number;
  formData: FormData;
  departments: { id: string | number; name: string; count: number }[];
  onUpdatePersonal: (updates: Partial<FormData["personal"]>) => void;
  onUpdateProfessional: (updates: Partial<FormData["professional"]>) => void;
  onUpdatePayment: (updates: Partial<FormData["payment"]>) => void;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
  onUpdateLanguage: (index: number, name: string) => void;
  onAddDocument: (file: File) => void;
  onRemoveDocument: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  errors: Record<string, string>;
}

function AddUserForm({
  currentStep,
  formData,
  departments,
  onUpdatePersonal,
  onUpdateProfessional,
  onUpdatePayment,
  onAddLanguage,
  onRemoveLanguage,
  onUpdateLanguage,
  onAddDocument,
  onRemoveDocument,
  onNext,
  onPrev,
  onSubmit,
  isLoading,
  errors,
}: AddUserFormProps) {
  const navigate = useNavigate();

  const backgroundImages = [screen1, screen2, screen3];
  const currentBg = backgroundImages[currentStep - 1] || screen1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-7xl mx-auto h-[95vh] bg-zinc-900/20 border border-zinc-800 rounded-lg p-4 relative overflow-hidden">
        <img
          src={currentBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3 gap-2">
            <Button
              onClick={() => navigate({ to: "/team" })}
              variant="ghost"
              className="text-white h-8 px-3 text-sm"
            >
              ← Back
            </Button>
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {currentStep > 1 && (
                <Button onClick={onPrev} disabled={isLoading} className="h-8 px-4 text-sm">
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={onNext} disabled={isLoading} className="h-8 px-4 text-sm">
                  Next
                </Button>
              ) : (
                <Button onClick={onSubmit} disabled={isLoading} className="h-8 px-4 text-sm">
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mb-3 overflow-x-auto pb-2 gap-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium",
                    currentStep === step
                      ? "bg-green-500 text-white"
                      : currentStep > step
                        ? "bg-green-500 text-white"
                        : "bg-zinc-700 text-zinc-400"
                  )}
                >
                  {step}
                </div>
                <span className="text-xs text-zinc-300 capitalize">
                  {
                    [
                      "Personal Details",
                      "Professional Details & Availability",
                      "Payment & Files",
                    ][step - 1]
                  }
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2">
            {currentStep === 1 && (
              <PersonalDetails
                formData={formData.personal}
                onUpdate={onUpdatePersonal}
                onAddLanguage={onAddLanguage}
                onRemoveLanguage={onRemoveLanguage}
                onUpdateLanguage={onUpdateLanguage}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <ProfessionalDetails
                formData={formData.professional}
                departments={departments}
                onUpdate={onUpdateProfessional}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <PaymentDetails
                formData={formData.payment}
                onUpdate={onUpdatePayment}
                onAddDocument={onAddDocument}
                onRemoveDocument={onRemoveDocument}
                errors={errors}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;