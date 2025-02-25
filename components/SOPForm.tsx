// components/SOPForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from './Button';

const formSchema = z.object({
  title: z.string().min(1, 'SOP title is required'),
  department: z.string().min(1, 'Department is required'),
  description: z.string().min(10, 'Please provide more details (min 10 characters)'),
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
        <input
          id="title"
          type="text"
          className="input-field text-lg"
          placeholder="e.g., Client Onboarding Process"
          {...register('title')}
        />
        {errors.title && (
          <p className="mt-2 text-red-400 text-sm">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <select
          id="department"
          className="input-field"
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
          <p className="mt-2 text-red-400 text-sm">{errors.department.message}</p>
        )}
      </div>
      
      <div>
        <textarea
          id="description"
          rows={6}
          className="input-field"
          placeholder="Describe the process in detail. What are the steps involved? Who is responsible for each step?"
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-2 text-red-400 text-sm">{errors.description.message}</p>
        )}
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          isLoading={isSubmitting} 
          size="lg" 
          className="w-full"
        >
          Generate SOP Document
        </Button>
      </div>
    </form>
  );
}