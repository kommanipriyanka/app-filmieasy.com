// PersonalDetails.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import OthersIcon from "@/components/Icons/Team/OthersIcon";
import FemaleIcon from "@/components/Icons/Team/FemaleIcon";
import MaleIcon from "@/components/Icons/Team/MaleIcon";

interface PersonalFormData {
  fullName: string;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  profileImage?: string;
  languages: { name: string }[];
}

interface PersonalDetailsProps {
  formData: PersonalFormData;
  onUpdate: (updates: Partial<PersonalFormData>) => void;
  onAddLanguage: (name: string) => void;
  onRemoveLanguage: (index: number) => void;
  errors: Record<string, string>;
}

function PersonalDetails({
  formData,
  onUpdate,
  onAddLanguage,
  onRemoveLanguage,
  errors,
}: PersonalDetailsProps) {
return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Basic Info
          </h3>
          <div className="space-y-3.5">
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Full Name
              </Label>
              <Input
                value={formData.fullName}
                onChange={(e) => onUpdate({ fullName: e.target.value })}
                className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                placeholder="Enter full name"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
  <Label className="text-xs text-zinc-300 mb-2 block">
    Gender
  </Label>
  <RadioGroup value={formData.gender} onValueChange={(v) => onUpdate({ gender: v })} className="flex gap-4">
    <div className="flex items-center gap-2 bg-(--input-bg) border-zinc-800/50 rounded px-3 py-2">
      <RadioGroupItem value="Female" id="r1" className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white" />
      <Label htmlFor="r1" className="text-xs text-zinc-300 cursor-pointer font-normal flex items-center gap-1.5">
        <FemaleIcon /> Female
      </Label>
    </div>
    <div className="flex items-center gap-2 bg-(--input-bg) border-zinc-800/50 rounded px-3 py-2">
      <RadioGroupItem value="Male" id="r2" className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white" />
      <Label htmlFor="r2" className="text-xs text-zinc-300 cursor-pointer font-normal flex items-center gap-1.5">
        <MaleIcon /> Male
      </Label>
    </div>
    <div className="flex items-center gap-2 bg-(--input-bg) border-zinc-800/50 rounded px-3 py-2">
      <RadioGroupItem value="Others" id="r3" className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white" />
      <Label htmlFor="r3" className="text-xs text-zinc-300 cursor-pointer font-normal flex items-center gap-1.5">
        <OthersIcon /> Others
      </Label>
    </div>
  </RadioGroup>
  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
</div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Date of Birth
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  maxLength={2}
                  value={formData.dob.slice(0, 2)}
                  onChange={(e) => {
                    let val = e.target.value.slice(0, 2);
                    if (!/^\d*$/.test(val)) val = "";
                    const newDob = val + formData.dob.slice(2);
                    onUpdate({ dob: newDob });
                  }}
                  placeholder="DD"
                  className="w-16 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm text-center placeholder:text-zinc-300"
                />
                <Input
                  type="text"
                  maxLength={2}
                  value={formData.dob.slice(2, 4)}
                  onChange={(e) => {
                    let val = e.target.value.slice(0, 2);
                    if (!/^\d*$/.test(val)) val = "";
                    const newDob = formData.dob.slice(0, 2) + val + formData.dob.slice(4);
                    onUpdate({ dob: newDob });
                  }}
                  placeholder="MM"
                  className="w-16 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm text-center placeholder:text-zinc-300"
                />
                <Input
                  type="text"
                  maxLength={4}
                  value={formData.dob.slice(4)}
                  onChange={(e) => {
                    let val = e.target.value.slice(0, 4);
                    if (!/^\d*$/.test(val)) val = "";
                    const newDob = formData.dob.slice(0, 4) + val;
                    onUpdate({ dob: newDob });
                  }}
                  placeholder="YYYY"
                  className="w-24 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm text-center placeholder:text-zinc-300"
                />
              </div>
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => onUpdate({ address: e.target.value })}
                className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Upload Image</Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onUpdate({ profileImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300 "
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="w-20 h-20 bg-zinc-700/30 border border-zinc-800/50 rounded flex items-center justify-center cursor-pointer hover:bg-zinc-700/50 transition-colors"
                >
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-zinc-600 text-xs">+</span>
                  )}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">
                  Email
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                  className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                  placeholder="Enter Email Id"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      onUpdate({ phone: value });
                    }
                  }}
                  className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            # languages Known
          </h3>
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
            {!formData.languages.some(l => l.name === 'English') && (
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">English</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('English')}
                  className="text-zinc-400 hover:text-white h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {!formData.languages.some(l => l.name === 'Hindi') && (
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">Hindi</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('Hindi')}
                  className="text-zinc-400 hover:text-white h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {!formData.languages.some(l => l.name === 'Telugu') && (
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">Telugu</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('Telugu')}
                  className="text-zinc-400 hover:text-white h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {!formData.languages.some(l => l.name === 'Tamil') && (
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">Tamil</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLanguage('Tamil')}
                  className="text-zinc-400 hover:text-white h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            )}
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">A</span>
                <span className="flex-1 text-white text-sm">{lang.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveLanguage(index)}
                  className="text-red-400 hover:text-red-300 h-8 px-3 text-xs"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;