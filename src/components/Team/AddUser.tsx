// AddUserContainer.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/http/fetch";
import { createUserAPI, getAllDepartmentsAPI } from "@/http/services/team";
import AddUserForm from "../an/Team/AddUserForm";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface FormData {
  personal: {
    fullName: string;
    gender: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    profileImage?: string;
    languages: { name: string }[];
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

const initialFormData: FormData = {
  personal: {
    fullName: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    profileImage: "",
    languages: [],
  },
  professional: {
    department: "",
    roleType: "",
    experience: "",
    unionMembership: "",
    status: "",
    blockFrom: "",
    blockTo: "",
  },
  payment: {
    rateType: "",
    currency: "",
    amount: "",
    paymentMethod: "",
    gstPan: "",
    documents: [],
  },
};

function AddUserContainer() {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const { data: departmentsData, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await getAllDepartmentsAPI();
      return response?.data?.data?.records;
    },
  });

  const departments = (departmentsData || []).map((dept: any) => ({ ...dept, count: 0 }));

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const isEmpty = (value: any): boolean => {
        return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
      };

      const dobFormatted = !isEmpty(data.personal?.dob)
        ? `${data.personal.dob.slice(0, 2)}-${data.personal.dob.slice(2, 4)}-${data.personal.dob.slice(4)}`
        : null;

      const languages = !isEmpty(data.personal?.languages)
        ? data.personal.languages
            .map((lang: any) => lang?.name)
            .filter((name: any) => !isEmpty(name))
        : null;

      const departmentId = !isEmpty(data.professional?.department)
        ? parseInt(data.professional.department, 10)
        : null;

      const payload = {
        email: isEmpty(data.personal?.email) ? null : data.personal.email,
        phone: isEmpty(data.personal?.phone) ? null : data.personal.phone,
        full_name: isEmpty(data.personal?.fullName) ? null : data.personal.fullName,
        gender: isEmpty(data.personal?.gender) ? null : data.personal.gender,
        role_type: isEmpty(data.professional?.roleType) ? null : data.professional.roleType,
        department_id: isNaN(data.professional?.department) ? null : departmentId,
        DOB: dobFormatted,
        languages: isEmpty(languages) ? null : languages,
      };

      return createUserAPI(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setCurrentStep(1);
      toast.success("User created successfully");
      setFormData(initialFormData);
      setErrors({});
      navigate({ to: "/team" });
    },
    onError: (error: any) => {
      setCurrentStep(1);
      toast.error("Failed to create user");
      if (error?.data?.status === 422) {
        const errData = error.data.errData;
        const transformedErrors: Record<string, string> = {};
        Object.entries(errData).forEach(([key, message]) => {
          let fieldKey: string;
          switch (key) {
            case 'full_name':
              fieldKey = 'fullName';
              break;
            case 'role_type':
              fieldKey = 'roleType';
              break;
            case 'department_id':
              fieldKey = 'department';
              break;
            case 'DOB':
              fieldKey = 'dob';
              break;
            case 'languages':
              fieldKey = 'languages';
              break;
            default:
              fieldKey = key;
          }
          transformedErrors[fieldKey] = message as string;
        });
        setErrors(transformedErrors);
      } else {
        setErrors({ general: error.message || 'An error occurred' });
      }
    },
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const clearFieldErrors = (fieldKeys: string[]) => {
    const newErrors = { ...errors };
    fieldKeys.forEach(key => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const updatePersonal = (updates: Partial<FormData["personal"]>) => {
    const fieldKeys = Object.keys(updates) as (keyof FormData["personal"])[];
    clearFieldErrors(fieldKeys);
    updateFormData({ personal: { ...formData.personal, ...updates } });
  };

  const updateProfessional = (updates: Partial<FormData["professional"]>) => {
    const fieldKeys = Object.keys(updates) as (keyof FormData["professional"])[];
    clearFieldErrors(fieldKeys);
    updateFormData({ professional: { ...formData.professional, ...updates } });
  };

  const updatePayment = (updates: Partial<FormData["payment"]>) => {
    const fieldKeys = Object.keys(updates) as (keyof FormData["payment"])[];
    clearFieldErrors(fieldKeys);
    updateFormData({ payment: { ...formData.payment, ...updates } });
  };

  const addSpecificLanguage = (name: string) => {
    clearFieldErrors(['languages']);
    updatePersonal({ languages: [...formData.personal.languages, { name }] });
  };

  const removeLanguage = (index: number) => {
    clearFieldErrors(['languages']);
    const languages = formData.personal.languages.filter((_, i) => i !== index);
    updatePersonal({ languages });
  };

  const updateLanguage = (index: number, name: string) => {
  };

  const addDocument = (file: File) => {
    clearFieldErrors(['documents']);
    updatePayment({ documents: [...formData.payment.documents, file] });
  };

  const removeDocument = (index: number) => {
    clearFieldErrors(['documents']);
    const documents = formData.payment.documents.filter((_, i) => i !== index);
    updatePayment({ documents });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const isLoading = mutation.isPending;

  return (
    <AddUserForm
      currentStep={currentStep}
      formData={formData}
      departments={departments}
      onUpdatePersonal={updatePersonal}
      onUpdateProfessional={updateProfessional}
      onUpdatePayment={updatePayment}
      onAddLanguage={addSpecificLanguage}
      onRemoveLanguage={removeLanguage}
      onUpdateLanguage={updateLanguage}
      onAddDocument={addDocument}
      onRemoveDocument={removeDocument}
      onNext={nextStep}
      onPrev={prevStep}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errors={errors}
    />
  );
}

export default AddUserContainer;