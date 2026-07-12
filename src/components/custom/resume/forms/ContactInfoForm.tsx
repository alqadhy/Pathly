import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactInfoSchema, type ContactInfoFormValues } from "@/schemas/contactInfo.schema";
import { useCVStore } from "@/store/useCVStore";

const inputClass =
  "bg-(--input) border-transparent rounded-(--radius-sm) h-11 px-4 text-(--text-primary) placeholder:text-(--muted-foreground) focus-visible:ring-2 focus-visible:ring-(--ring)";

function ContactInfoForm() {
  const contactInfo = useCVStore((s) => s.draft.contactInfo);
  const setContactInfo = useCVStore((s) => s.setContactInfo);
  const addContactLink = useCVStore((s) => s.addContactLink);
  const removeContactLink = useCVStore((s) => s.removeContactLink);

  const [newLinkUrl, setNewLinkUrl] = useState("");

  const {
    register,
    formState: { errors },
  } = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: { email: contactInfo.email, phoneNumber: contactInfo.phoneNumber },
    mode: "onBlur",
  });

  function handleField<K extends keyof ContactInfoFormValues>(field: K, value: ContactInfoFormValues[K]) {
    setContactInfo({ ...contactInfo, [field]: value });
  }

  function handleAddLink() {
    if (!newLinkUrl.trim()) return;
    addContactLink({ label: "Link", url: newLinkUrl.trim() });
    setNewLinkUrl("");
  }

  return (
    <div className="rounded-(--radius-lg) border border-(--border) bg-(--card) shadow-(--shadow-card) p-6 flex flex-col gap-5">
      <h3 className="text-h4-size! text-bold!">Contact info</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-semibold! text-body-md!">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { onChange: (e) => handleField("email", e.target.value) })}
            placeholder="you@email.com"
            className={inputClass}
          />
          {errors.email && <p className="text-xs text-(--danger)">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phoneNumber" className="text-semibold! text-body-md!">Phone number</Label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber", { onChange: (e) => handleField("phoneNumber", e.target.value) })}
            placeholder="+201012345678"
            className={inputClass}
          />
          {errors.phoneNumber && <p className="text-xs text-(--danger)">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-semibold! text-body-md!">Links</Label>
        {contactInfo.links.map((link : { id: string; url: string }) => (
          <div key={link.id} className="flex items-center gap-2 text-(--body-sm)">
            <LinkIcon size={14} className="text-(--secondary)" />
            <span className="text-(--secondary) flex-1 truncate">{link.url}</span>
            <button type="button" onClick={() => removeContactLink(link.id)} className="text-(--muted-foreground) hover:text-(--danger)">
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            value={newLinkUrl}
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setNewLinkUrl(e.target.value)}
            placeholder="behance.net/yourname"
            className={inputClass + " flex-1"}
          />
          <Button
            type="button"
            onClick={handleAddLink}
            className="bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 shrink-0"
          >
            Add other Link +
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactInfoForm;