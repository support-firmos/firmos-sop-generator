// components/SOPForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from './Button';

const formSchema = z.object({
  title: z.string().min(1, 'SOP title is required'),
  description: z.string().min(10, 'Please provide more details (min 10 characters)'),
  department: z.string().min(1, 'Department is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SOPForm({ onSubmit }: { onSubmit: (values: FormValues) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  
  const submitHandler = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-vampireBlack font-medium mb-1">
          SOP Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full px-4 py-2 border border-argent rounded focus:outline-none focus:ring-2 focus:ring-vampireBlack"
          placeholder="e.g., Client Onboarding Process"
          {...register('title')}
        />
        {errors.title && (
          <p className="mt-1 text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="department" className="block text-vampireBlack font-medium mb-1">
          Department
        </label>
        <select
          id="department"
          className="w-full px-4 py-2 border border-argent rounded focus:outline-none focus:ring-2 focus:ring-vampireBlack"
          {...register('department')}
        >
          <option value="">Select a department</option>
          <option value="Accounting">Accounting</option>
          <option value="Tax">Tax</option>
          <option value="Audit">Audit</option>
          <option value="Advisory">Advisory</option>
          <option value="Client Services">Client Services</option>
          <option value="Administration">Administration</option>
        </select>
        {errors.department && (
          <p className="mt-1 text-red-600 text-sm">{errors.department.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-vampireBlack font-medium mb-1">
          Process Description
        </label>
        <textarea
          id="description"
          rows={5}
          className="w-full px-4 py-2 border border-argent rounded focus:outline-none focus:ring-2 focus:ring-vampireBlack"
          placeholder="Describe the process in detail. What are the steps involved? Who is responsible for each step?"
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>
      
      <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
        Generate SOP Document
      </Button>
    </form>
  );
}