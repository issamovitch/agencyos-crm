'use client';

import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import LoadingComponent from '@/components/LoadingComponent';
import { createAccount } from '@/actions/account/account';

type Props = {
  industries: any[];
  users: any[];
  onFinish: () => void;
};

export function NewAccountForm({ industries, users, onFinish }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(3).max(50),
    office_phone: z.string().optional(),
    website: z.string().optional(),
    company_id: z.string().min(5).max(10),
    email: z.string().email(),
    billing_street: z.string().min(3).max(50),
    billing_postal_code: z.string().min(2).max(10),
    billing_city: z.string().min(3).max(50),
    billing_country: z.string().min(3).max(50),
    description: z.string().optional(),
    assigned_to: z.string().min(3).max(50).optional(),
    status: z.string().min(3).max(50).optional(),
    annual_revenue: z.string().optional(),
    industry: z.string().min(3).max(50),
  });

  type NewAccountFormValues = z.infer<typeof formSchema>;

  const form = useForm<NewAccountFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: NewAccountFormValues) => {
    setIsLoading(true);
    try {
      await createAccount(data);
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });
      onFinish();
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full px-10">
        {isLoading && (
          <div className="absolute inset-0 z-[9999] bg-background/50 backdrop-blur-sm">
            <LoadingComponent fullScreen={false} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 pb-5 text-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Account name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="AgencyOS Inc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  E-mail <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="account@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="office_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="+420 ...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="https://www.domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Account ID <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="1234567890"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annual_revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual revenue</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="1.000.000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billing_street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Billing street <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="1931 Norris Ave."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billing_postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Billing postal code <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="L2A5M4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billing_city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Billing city <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Berlin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billing_country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Billing country <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Germany"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Choose industry <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new account industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="flex max-h-56 overflow-y-auto">
                    {industries.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assigned_to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned to</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user to assign the account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-56 overflow-y-auto">
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="ml-auto flex w-[250px] gap-3 py-5">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onFinish()}
            className="w-3/6"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit" className="w-5/6">
            Create account
          </Button>
        </div>
      </form>
    </Form>
  );
}