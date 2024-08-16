/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import ProtectedContent from '@/components/ProtectedContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newEventSchema, registrationTypeSchema } from '@/lib/formSchema';
import useClientAdmin from '@/lib/hooks/useClientAdmin';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { createEvent } from '@/lib/serverActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditIcon, Loader2Icon, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

const registrationDefaultValues: z.infer<typeof registrationTypeSchema> = {
  'name': '',
  'amount': 1,
  'description': ''
}

const defaultValues: z.infer<typeof newEventSchema> = {
  'title': '',
  'description': '',
  'date': new Date(),
  'time': '',
  'price': '',
  'location': '',
  'duration': '',
  'registrationTypes': []
}

function page() {
  const [isAM, setIsAM] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [newFormPortal, setNewFormPortal] = useState<HTMLElement | null>(null)
  const [editFormIndex, setEditFormIndex] = useState(0)
  const isAdmin = useClientAdmin()

  const router = useRouter();

  //Main Form
  const form = useForm<z.infer<typeof newEventSchema>>({
    resolver: zodResolver(newEventSchema),
    defaultValues
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'registrationTypes',
  });

  // New / Edit Registration Type forms
  const newForm = useForm<z.infer<typeof registrationTypeSchema>>({
    resolver: zodResolver(registrationTypeSchema),
    defaultValues: registrationDefaultValues
  })
  const editForm = useForm<z.infer<typeof registrationTypeSchema>>({
    resolver: zodResolver(registrationTypeSchema),
    defaultValues: registrationDefaultValues
  })

  useEffect(() => {
    setNewFormPortal(document.getElementById('newFormPortal'))
  }, [])

  async function handleNewRegistration() {
    // Validate the new values
    await newForm.trigger()
    if (!newForm.formState.isValid) {
      return
    }
    // Append to array if valid
    const newRegistration = newForm.getValues()
    append(newRegistration)
    newForm.reset(registrationDefaultValues)
  }

  function handleEditRegistration(index: number) {
    setEditFormIndex(index)
    const values = form.getValues(`registrationTypes.${index}`)
    // Update edit form values
    editForm.reset(values)
    setOpen(true)
  }

  async function handleUpdateRegistration() {
    // Validate the new values
    await editForm.trigger()
    if (!editForm.formState.isValid) {
      return
    }
    // If new values are valid update the original field
    const values = editForm.getValues()
    form.setValue(`registrationTypes.${editFormIndex}`, values)
    setOpen(false)
  }

  function handleEditFormDelete() {
    remove(editFormIndex)
    setOpen(false)
  }

  async function onSubmit(values: z.infer<typeof newEventSchema>) {
    setSubmitting(true);
    try {
      const res = await createEvent(values, isAM)
      setSubmitting(false)
      router.push('/events/' + res.id)

    } catch (error) {
      console.error(error);
      setSubmitting(false)
    }
  }
  return (
    <ProtectedContent>
      <div className="mt-8 container">
        <Card>
          <CardHeader>
            <CardTitle>New Event</CardTitle>
            <CardDescription>Enter the information for your new event below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit
                ={form.handleSubmit(onSubmit)}
                className="grid grid-cols-12 gap-x-4 gap-y-2"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-8">
                      <FormLabel>
                        Event Name
                        <sup className="text-muted-foreground">*</sup>
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
                  name="price"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-2">
                      <FormLabel>
                        Price <span className="text-muted-foreground">($)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-2">
                      <FormLabel>
                        Duration <span className="text-muted-foreground">(h)</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>
                        Description<sup className="text-muted-foreground">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>
                        Location<sup className="text-muted-foreground">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="col-span-6 md:col-span-3">
                      <DatePicker field={field} />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="col-span-6 md:col-span-3">
                      <FormLabel>
                        Time <span className="text-muted-foreground">(hh:mm)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} />
                          <button
                            onClick={() => setIsAM(!isAM)}
                            type="button"
                            className="hover:bg-muted text-[8px] p-1 border border-muted rounded-sm absolute top-1/2 -translate-y-1/2 right-2"
                          >
                            {isAM ? 'AM' : 'PM'}
                          </button>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <hr className='my-4 col-span-12' />

                {/** ------------------- Registration Types ---------------------- */}
                <div className='col-span-12 space-y-2 mb-6 mt-2'>
                  <CardTitle>Registration Info</CardTitle>
                  <CardDescription>Enter the information about available registration types for the event.</CardDescription>
                </div>

                {/** ------------------- New Registration Type ---------------------- */}

                <div id='newFormPortal' className='col-span-12 md:col-span-6 relative'>
                  {!newFormPortal && <div className='flex h-full w-full items-center justify-center'>
                    <Loader2Icon className='animate-spin' />
                  </div>}
                </div>

                <div className='col-span-12 md:col-span-6 space-y-2 mb-2'>
                  <FormLabel className={`${!fields.length && form.formState.submitCount ? 'text-destructive' : ''}`}>
                    Registration Types
                  </FormLabel>

                  {!fields.length && <div className='w-full h-full min-h-[240px] bg-muted/50 rounded-md relative'>
                    <p className='absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-muted-foreground'>
                      You haven{"'"}t created any registration types yet.
                    </p>
                  </div>
                  }

                  {fields.map((field, index) => (
                    <div key={field.id} className='grid grid-cols-12 items-center'>
                      <span className='text-center text-sm text-muted-foreground'>x{form.getValues(`registrationTypes.${index}.amount`)}</span>
                      <Input readOnly className='col-span-9' value={form.getValues(`registrationTypes.${index}.name`)} />

                      {/** Edit Modal */}

                      <Button variant={'ghost'} className='aspect-square' onClick={() => handleEditRegistration(index)} type='button'>
                        <i>
                          <EditIcon size={20} />
                        </i>
                      </Button>
                      <Button type='button' className='aspect-square' variant={'ghost'} onClick={() => remove(index)}>
                        <i>
                          <Trash2 className='text-destructive' />
                        </i>
                      </Button>
                    </div>
                  ))}

                </div>

                <div className='mt-8 flex justify-end items-center col-span-12 gap-4'>
                  <Button className='w-1/2' variant={'outline'}>Reset</Button>
                  <Button
                    type="submit"
                    className="w-1/2"
                    disabled={submitting}
                  >
                    Create
                    {submitting && (
                      <Loader2Icon
                        size={16}
                        className="animate-spin"
                      />
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {newFormPortal && createPortal(
              <Form {...newForm}>
                <div className='gap-2 grid grid-cols-12'>
                  <FormField
                    control={newForm.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='col-span-12 sm:col-span-8'>
                        <FormLabel>Registration Type Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newForm.control}
                    name='amount'
                    render={({ field }) => (
                      <FormItem className='col-span-12 sm:col-span-4'>
                        <FormLabel>Limit</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newForm.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem className='col-span-12'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='button' className='col-span-12 mt-2' onClick={handleNewRegistration}>Add</Button>
                </div>
              </Form>
              , newFormPortal)}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader className='col-span-6'>
                  <DialogTitle>Edit Registration Type</DialogTitle>
                  <DialogDescription>Update the information for the current registration type.</DialogDescription>
                </DialogHeader>
                <Form {...editForm}>

                  <div id='editFormPortal' className='col-span-6 gap-2 grid grid-cols-12'>
                    <FormField
                      control={editForm.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem className='col-span-8'>
                          <FormLabel>Registration Type Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name='amount'
                      render={({ field }) => (
                        <FormItem className='col-span-4'>
                          <FormLabel>Quantity Available</FormLabel>
                          <FormControl>
                            <Input type='number' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem className='col-span-12'>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type='button' className='col-span-6 mt-2' variant={'destructive'} onClick={handleEditFormDelete}>Delete</Button>
                    <Button type='button' className='col-span-6 mt-2' onClick={handleUpdateRegistration}>Save</Button>
                  </div>
                </Form>

              </DialogContent>
            </Dialog>

          </CardContent>
        </Card>
      </div>
    </ProtectedContent>
  );
}

export default page;
