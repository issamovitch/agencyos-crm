'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingModal from './modals/loading-modal';

const languages = [
  { label: 'English', value: 'en', code: 'us' },
  { label: 'Czech', value: 'cz', code: 'cz' },
  { label: 'German', value: 'de', code: 'de' },
  { label: 'Ukrainian', value: 'uk', code: 'ua' },
  { label: 'Korean', value: 'ko', code: 'kr' },
  { label: 'Turkish', value: 'tr', code: 'tr' },
] as const;

const FormSchema = z.object({
  language: z.string({
    required_error: 'Please select a language.',
  }),
});

type Props = {
  userId: string;
  currentLang?: string;
};

export function SetLanguage({ userId, currentLang }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: currentLang || '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await axios.put(`/api/user/${userId}/set-language`, data);
      toast({
        title: 'Success',
        description: 'You change user language to: ' + data.language,
      });
      router.refresh();
      // Force reload to apply language changes globally if needed
      window.location.reload();
    } catch (e) {
      console.log(e, 'error');
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LoadingModal isOpen={isLoading} description="Changing AgencyOS language" />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="hidden space-y-6 lg:block"
      >
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[70px] justify-start gap-2 px-3',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/w20/${languages.find((l) => l.value === field.value)?.code}.png`}
                            width="20"
                            alt=""
                            className="rounded-xs"
                          />
                          <span className="uppercase">{field.value}</span>
                        </div>
                      ) : (
                        currentLang ? (
                           <div className="flex items-center gap-2">
                            <img
                              src={`https://flagcdn.com/w20/${languages.find((l) => l.value === currentLang)?.code}.png`}
                              width="20"
                              alt=""
                              className="rounded-xs"
                            />
                            <span className="uppercase">{currentLang}</span>
                          </div>
                        ) : 'Select'
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[70px] p-0">
                  <Command>
                    <CommandGroup>
                      {languages
                        .filter((language) => language.value !== (field.value || currentLang))
                        .map((language) => (
                        <CommandItem
                          value={language.value}
                          key={language.value}
                          onSelect={(value) => {
                            form.setValue('language', value);
                            onSubmit(form.getValues());
                          }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://flagcdn.com/w20/${language.code}.png`}
                              width="20"
                              alt=""
                              className="rounded-xs"
                            />
                            <span className="uppercase">{language.value}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
