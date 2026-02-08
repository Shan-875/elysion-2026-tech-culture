import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QRCodeSVG } from "qrcode.react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const registrationSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    college: z.string().min(1, "College is required"),
    department: z.string().min(1, "Department is required"),
    year: z.string().min(1, "Year is required"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .max(15, "Enter a valid phone number"),
    isIeeeMember: z.enum(["yes", "no"], {
      required_error: "Please select IEEE membership",
    }),
    memId: z.string().optional(),
    foodPreference: z.enum(["veg", "nonveg"], {
      required_error: "Please choose your food preference",
    }),
    workshopPreference: z
      .array(z.enum(["embedded", "game", "fashion"]))
      .min(1, "Please choose at least one workshop")
      .max(3, "You can choose up to three workshops"),
    ticketType: z.enum(["single", "couple"], {
      required_error: "Please choose entry type",
    }),
    accommodation: z.enum(["yes", "no"], {
      required_error: "Please select accommodation preference",
    }),
    partnerName: z.string().optional(),
    partnerEmail: z.string().optional(),
    partnerPhone: z.string().optional(),
    partnerCollege: z.string().optional(),
    partnerDepartment: z.string().optional(),
    partnerYear: z.string().optional(),
    partnerFood: z.enum(["veg", "nonveg"]).optional(),
    partnerAccommodation: z.enum(["yes", "no"]).optional(),
    partnerIsIeeeMember: z.enum(["yes", "no"]).optional(),
    partnerMemId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.ticketType === "couple") {
      if (!data.partnerName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerName"],
          message: "Partner name is required for couple entry",
        });
      }
      if (!data.partnerEmail || !z.string().email().safeParse(data.partnerEmail).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerEmail"],
          message: "Valid partner email is required",
        });
      }
      if (!data.partnerPhone || data.partnerPhone.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerPhone"],
          message: "Valid partner phone is required",
        });
      }
      if (!data.partnerCollege) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerCollege"],
          message: "Partner college is required",
        });
      }
      if (!data.partnerDepartment) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerDepartment"],
          message: "Partner department is required",
        });
      }
      if (!data.partnerYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerYear"],
          message: "Partner year is required",
        });
      }
      if (!data.partnerFood) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerFood"],
          message: "Partner food preference is required",
        });
      }
      if (!data.partnerAccommodation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerAccommodation"],
          message: "Partner accommodation preference is required",
        });
      }
      if (!data.partnerIsIeeeMember) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partnerIsIeeeMember"],
          message: "Partner IEEE membership status is required",
        });
      }
    }
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const RegistrationSection = () => {
  const { toast } = useToast();
  const [qrPayload, setQrPayload] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [pendingPayload, setPendingPayload] = useState<string | null>(null);
  const [pendingRegistrationId, setPendingRegistrationId] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      college: "",
      department: "",
      year: "",
      email: "",
      phone: "",
      isIeeeMember: "no",
      memId: "",
      foodPreference: "veg",
      workshopPreference: [],
      ticketType: "single",
      accommodation: "no",
      partnerName: "",
      partnerEmail: "",
      partnerPhone: "",
      partnerCollege: "",
      partnerDepartment: "",
      partnerYear: "",
      partnerFood: "veg",
      partnerAccommodation: "no",
      partnerIsIeeeMember: "no",
      partnerMemId: "",
    },
  });

  const onSubmit = (values: RegistrationFormValues) => {
    const id = `ELYSION26-${Date.now().toString(36).toUpperCase()}`;

    const payload = {
      id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      college: values.college,
      department: values.department,
      year: values.year,
      ieeeMember: values.isIeeeMember,
      memId: values.memId,
      food: values.foodPreference,
      workshops: values.workshopPreference,
      ticketType: values.ticketType,
      accommodation: values.accommodation,
      partnerName: values.partnerName,
      partnerEmail: values.partnerEmail,
      partnerPhone: values.partnerPhone,
      partnerCollege: values.partnerCollege,
      partnerDepartment: values.partnerDepartment,
      partnerYear: values.partnerYear,
      partnerFood: values.partnerFood,
      partnerAccommodation: values.partnerAccommodation,
      partnerIsIeeeMember: values.partnerIsIeeeMember,
      partnerMemId: values.partnerMemId,
    };

    // Clear any previously generated QR and move this registration into "awaiting payment"
    setQrPayload(null);
    setRegistrationId(null);
    setPendingPayload(JSON.stringify(payload));
    setPendingRegistrationId(id);

    toast({
      title: "Details saved",
      description:
        "Please complete the UPI payment using the shown fee. After payment, confirm below to generate your entry QR.",
    });

    // NOTE: In a real setup, this is where you'd:
    // 1. Call your backend / payment gateway with `values`
    // 2. Wait for payment confirmation webhook
    // 3. Then mark the registration as paid and email the same QR payload to the participant
  };

  const ieeeMember = form.watch("isIeeeMember");
  const partnerIeeeMember = form.watch("partnerIsIeeeMember");
  const ticketType = form.watch("ticketType");
  const workshops = form.watch("workshopPreference");

  const awaitingPayment = useMemo(
    () => !!pendingPayload && !qrPayload,
    [pendingPayload, qrPayload],
  );

  const handlePaymentConfirmed = () => {
    if (!pendingPayload || !pendingRegistrationId) return;

    setQrPayload(pendingPayload);
    setRegistrationId(pendingRegistrationId);

    toast({
      title: "Payment marked complete",
      description: "Your QR has been generated. Show this at the gate for entry.",
    });
  };

  const feeInfo = useMemo(() => {
    const isPrimaryIeee = ieeeMember === "yes";
    const isPartnerIeee = partnerIeeeMember === "yes";
    const isAnyIeee = isPrimaryIeee || isPartnerIeee;

    if (ticketType === "single") {
      const perHead = isPrimaryIeee ? 550 : 600;
      return {
        label: isPrimaryIeee ? "IEEE member single" : "Non-IEEE single",
        perHead,
        total: perHead,
      };
    }

    // Couple
    // If at least one is IEEE → ₹500/head (₹1000 total)
    // If both non-IEEE → ₹550/head (₹1100 total)
    const perHead = isAnyIeee ? 500 : 550;
    return {
      label: isAnyIeee ? "Couple (at least one IEEE)" : "Couple (both non-IEEE)",
      perHead,
      total: perHead * 2,
    };
  }, [ieeeMember, partnerIeeeMember, ticketType]);

  return (
    <section
      id="register"
      className="py-24 bg-[#F8F4ED] border-y border-[#CBA24B]/20 relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-body text-sm text-secondary tracking-[0.25em] uppercase">
            Registration
          </span>
          <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl text-primary mt-4 mb-3">
            Secure Your Entry
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Step 1: Fill in your details. Step 2: Complete UPI payment. Step 3:
            Your unique QR will be generated for check-in.
          </p>
          <div className="w-20 h-0.5 bg-gradient-gold mx-auto mt-5" />
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-background/80 border border-[#CBA24B]/30 shadow-card p-6 md:p-8"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Department" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College</FormLabel>
                        <FormControl>
                          <Input placeholder="College / University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workshopPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workshop preference</FormLabel>
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                            <label className="flex items-center gap-2 font-body text-sm">
                              <Checkbox
                                checked={field.value?.includes("embedded")}
                                onCheckedChange={(checked) => {
                                  const valueArray = field.value ?? [];
                                  if (checked) {
                                    field.onChange([...valueArray, "embedded"]);
                                  } else {
                                    field.onChange(valueArray.filter((v) => v !== "embedded"));
                                  }
                                }}
                              />
                              Embedded Systems Workshop
                            </label>
                            <label className="flex items-center gap-2 font-body text-sm">
                              <Checkbox
                                checked={field.value?.includes("game")}
                                onCheckedChange={(checked) => {
                                  const valueArray = field.value ?? [];
                                  if (checked) {
                                    field.onChange([...valueArray, "game"]);
                                  } else {
                                    field.onChange(valueArray.filter((v) => v !== "game"));
                                  }
                                }}
                              />
                              Game Development Workshop
                            </label>
                            <label className="flex items-center gap-2 font-body text-sm">
                              <Checkbox
                                checked={field.value?.includes("fashion")}
                                onCheckedChange={(checked) => {
                                  const valueArray = field.value ?? [];
                                  if (checked) {
                                    field.onChange([...valueArray, "fashion"]);
                                  } else {
                                    field.onChange(valueArray.filter((v) => v !== "fashion"));
                                  }
                                }}
                              />
                              Fashion Choreography Workshop
                            </label>
                          </div>
                          <FormDescription>
                            You can choose up to three workshops.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="yourmail@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone No.</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="10 digit mobile number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isIeeeMember"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IEEE member</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            <label className="flex items-center gap-2 font-body text-sm">
                              <RadioGroupItem value="yes" />
                              Yes
                            </label>
                            <label className="flex items-center gap-2 font-body text-sm">
                              <RadioGroupItem value="no" />
                              No
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="memId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          IEEE Membership ID{" "}
                          <span className="text-xs text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              ieeeMember === "yes"
                                ? "If available, enter your IEEE ID"
                                : "Not required for non-members"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Providing this helps us verify IEEE member benefits
                          faster.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="foodPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food preference</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            <label className="flex items-center gap-2 font-body text-sm">
                              <RadioGroupItem value="veg" />
                              Veg
                            </label>
                            <label className="flex items-center gap-2 font-body text-sm">
                              <RadioGroupItem value="nonveg" />
                              Non-veg
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ticketType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entry type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            <label className="flex items-center gap-2 font-body text-sm">
                              <RadioGroupItem value="single" />
                              Single entry {ieeeMember === "yes" ? "(₹550)" : "(₹600)"}
                            </label>
                            <label className="flex items-center gap-2 font-body text-sm">
                              <RadioGroupItem value="couple" />
                              Couple entry {(ieeeMember === "yes" || partnerIeeeMember === "yes") ? "(₹1000)" : "(₹1100)"}
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Couple entry allows you to register with your partner.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="accommodation"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Accommodation Required?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3 space-y-0">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No
                              </FormLabel>
                            </FormItem>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription className="text-secondary font-semibold">
                        Accommodation is available; additional charges apply.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {ticketType === "couple" && (
                  <div className="space-y-4 border-l-2 border-primary/20 pl-4 mt-2">
                    <FormField
                      control={form.control}
                      name="partnerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Name of partner"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="partnerCollege"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner College</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Partner's college"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partnerDepartment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner Department</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Partner's department"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="partnerYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner Year</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Year (e.g., 2nd Year)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partnerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Partner's email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partnerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Partner's mobile number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="partnerIsIeeeMember"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner IEEE member</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-6"
                              >
                                <label className="flex items-center gap-2 font-body text-sm">
                                  <RadioGroupItem value="yes" />
                                  Yes
                                </label>
                                <label className="flex items-center gap-2 font-body text-sm">
                                  <RadioGroupItem value="no" />
                                  No
                                </label>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partnerMemId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Partner IEEE ID{" "}
                              <span className="text-xs text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  partnerIeeeMember === "yes"
                                    ? "If available, enter IEEE ID"
                                    : "Not required"
                                }
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="partnerFood"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Partner Food Preference</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-3 space-y-0">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="veg" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Veg
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="nonveg" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Non-Veg
                                  </FormLabel>
                                </FormItem>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="partnerAccommodation"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Partner Accommodation Required?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-3 space-y-0">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
                                  </FormLabel>
                                </FormItem>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        <FormDescription className="text-secondary font-semibold">
                          Accommodation is available; additional charges apply.
                        </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="pt-2 space-y-3">
                  
                  <div className="flex justify-end">
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        type="submit"
                        className="bg-gradient-gold text-primary font-display tracking-[0.18em] uppercase px-7 py-3 rounded-sm shadow-gold hover:shadow-elegant"
                      >
                        Save Details &amp; Proceed
                      </Button>
                      {awaitingPayment && (
                        <Button
                          type="button"
                          variant="secondary"
                          className="text-sm font-body"
                          onClick={handlePaymentConfirmed}
                        >
                          I have completed UPI payment – generate QR
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-[#CBA24B]/30 mt-6 pt-4 space-y-2">
                    <h4 className="font-display text-base text-primary">Terms &amp; Conditions</h4>
                    <ul className="list-disc list-inside font-body text-xs text-muted-foreground space-y-1">
                      <li>Couple entry requires one girl and one boy.</li>
                      <li>All decisions of the programme committee are final.</li>
                      <li>Entry is valid only after payment confirmation.</li>
                      <li>Participants must carry a valid college ID card.</li>
                      <li>Accommodation is available; additional charges apply.</li>
                    </ul>
                  </div>
                </div>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-theme-velvet text-primary-foreground/90 p-6 md:p-7 flex flex-col gap-6 shadow-elegant"
          >
            <div>
              <h3 className="font-display text-xl md:text-2xl mb-2">
                Check-in with QR
              </h3>
              <p className="font-body text-sm md:text-base text-primary-foreground/80">
                Complete the form and UPI payment. After you confirm payment,
                a unique QR will be generated for you. At the venue, the
                programme committee can scan this QR at the gate and give you
                access.
              </p>
            </div>

            <div className="border border-secondary/40 bg-black/10 p-4 flex flex-col items-center justify-center min-h-[240px]">
              {qrPayload && registrationId ? (
                <>
                  <QRCodeSVG
                    value={qrPayload}
                    size={196}
                    bgColor="transparent"
                    fgColor="#FBF7EF"
                  />
                  <p className="font-mono text-xs mt-3 text-secondary/90">
                    ID: {registrationId}
                  </p>
                  <p className="font-body text-xs text-primary-foreground/80 mt-2 text-center max-w-xs">
                    Save or screenshot this QR. The same code can also be sent
                    via mail once payment is verified by the organisers.
                  </p>
                </>
              ) : awaitingPayment ? (
                <p className="font-body text-sm text-primary-foreground/75 text-center max-w-xs">
                  Your details are saved. Once you have completed the UPI
                  payment, click &quot;I have completed UPI payment – generate
                  QR&quot; to see your personalised entry QR here.
                </p>
              ) : (
                <p className="font-body text-sm text-primary-foreground/75 text-center max-w-xs">
                  Your personalised QR will appear here after you submit the
                  registration form and confirm that payment is complete. This
                  QR can be scanned at the gate by the programme committee to
                  give you entry.
                </p>
              )}
            </div>

            <div className="border-t border-secondary/30 pt-4 space-y-2">
              <p className="font-body text-sm text-primary-foreground/80">
                <span className="font-semibold">Idea for organisers:</span> you
                can connect this form to a backend that:
              </p>
              <ul className="list-disc list-inside font-body text-sm text-primary-foreground/75 space-y-1">
                <li>creates a unique registration record with the same QR ID</li>
                <li>
                  triggers payment verification (UPI / payment gateway callback)
                </li>
                <li>sends the QR as a PDF or image to the participant&apos;s mail</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
