import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { CircleCheck, Loader2, X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    firstname: z.string().min(3, {
        message: "First name must be at least 3 characters.",
    }),
    lastname: z.string().min(3, {
        message: "Last name must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    type: z.enum(["none", "general", "support"], {
        required_error: "Please select a query type",
    }),
    message: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
        .max(160, {
            message: "Message must not be longer than 160 characters.",
        }),
    consent: z.boolean().refine((val) => val === true, {
        message: "To submit this form, please consent to being contacted.",
    }),
});

export function MainItem() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            message: "",
            type: "none",
            email: "",
            consent: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            console.log(values);
            setTimeout(() => {
                setLoading(false);
                setMessage(true);
                form.reset();
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full max-w-[768px] px-4 my-8 relative"
            >
                {message && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-fit px-5 py-3 rounded-xl bg-popover text-white text-sm  z-50">
                        <h2 className=" flex gap-2 items-center font-semibold mb-2 ">
                            {" "}
                            <CircleCheck size={18} /> Message Sent!{" "}
                            <div
                                className=" outline outline-1 outline-white rounded-sm ml-auto cursor-pointer "
                                onClick={() => setMessage(false)}
                            >
                                {" "}
                                <X size={16} />{" "}
                            </div>
                        </h2>
                        <p className=" text-pretty ">
                            Thanks for completing the form. We'll be in touch
                            soon!
                        </p>
                    </div>
                )}

                <div className="grid gap-8 bg-background p-8 rounded-xl">
                    <h2 className="text-3xl font-bold tracking-wide">
                        Contact Us
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        First name{" "}
                                        <span className="text-primary">*</span>{" "}
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Last name{" "}
                                        <span className="text-primary">*</span>{" "}
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email Address{" "}
                                        <span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        Query Type{" "}
                                        <span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col md:flex-row gap-4"
                                        >
                                            <FormItem className="w-full border rounded-lg p-4 flex items-center space-x-3 space-y-0 peer-checked:bg-secondary peer-checked:outline peer-checked:outline-1 peer-checked:outline-primary">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="general"
                                                        className="peer"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    General Enquiry
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="w-full border rounded-lg p-4 flex items-center space-x-3 space-y-0 peer-checked:bg-secondary peer-checked:outline peer-checked:outline-1 peer-checked:outline-primary">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="support"
                                                        className="peer"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Support Request
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Message{" "}
                                        <span className="text-primary">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={5}
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormDescription>
                                                I consent to being contacted by
                                                the team{" "}
                                                <span className="text-primary">
                                                    *
                                                </span>
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="text-white font-semibold w-full my-4 hover:bg-popover "
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            <>Submit</>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
