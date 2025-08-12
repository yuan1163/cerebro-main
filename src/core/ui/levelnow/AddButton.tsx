import { useState } from 'react';

// shadcn ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@app/components/ui/dialog';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import Input from '@core/ui/levelnow/Input';
// icons
import AddIcon from '@assets/icons/LevelNOW/add.svg?component';
import { useForm, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { customResolver } from '@core/utils/levelnow/resolver';
import { useAddTank } from '@core/storages/controllers/levelnow/tank';
import { on } from 'events';

// zod schema
const addTankSchema = z.object({
  deviceReference: z.string().min(1, 'Warning ! Device Reference can not be blank !'),
});
type AddTankFormData = z.infer<typeof addTankSchema>;

export default function AddButton({ label }: { label: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blankError, setBlankError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<AddTankFormData>({
    resolver: customResolver(addTankSchema),
    defaultValues: {
      deviceReference: '',
    },
  });

  const addTank = useAddTank();

  const onSubmit = async (data: AddTankFormData) => {
    try {
      const result = await addTank.mutateAsync(data.deviceReference);
      if (!result.success) {
        throw new Error(result.message || 'Failed to add tank');
      }
      onClose();
      reset();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Failed to add tank. Please try again.',
      });
    }
  };

  const onChange = () => {
    clearErrors('deviceReference');
    clearErrors('root');
  };

  const onClose = () => {
    reset();
    setIsDialogOpen(false);
  };

  const onInvalid = (errors: FieldErrors<AddTankFormData>) => {
    console.log('Form validation failed:', errors);
    if (errors.deviceReference?.type === 'too_small') {
      setBlankError(true);
    }
  };

  const onConfirmError = () => {
    clearErrors('deviceReference');
    setBlankError(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsDialogOpen(true);
            // reset(); // Clear form when opening dialog
          }}
          variant='solid'
          iconColor='white'
          fontSize='md'
          fontWeight='medium'
          className='px-3 tracking-32 text-common-white'
        >
          <AddIcon className='mr-2' />
          Add {label}
        </Button>
      </DialogTrigger>
      <DialogContent overlay={false} position='top' className='bg-white p-5 rounded-[10px]'>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='flex flex-col'>
          <DialogHeader className='gap-5'>
            <DialogTitle className='text-lg font-medium tracking-36 text-secondary-900 text-start'>
              www.cerebro.level.now/levelnow says
            </DialogTitle>
            {errors.deviceReference ? (
              <DialogDescription className='font-medium text-start text-md tracking-32 text-error-500'>
                {errors.deviceReference.message}
              </DialogDescription>
            ) : (
              <span className='font-medium text-start text-md tracking-32 text-secondary-500'>
                Please type in new Device Reference of a tank
              </span>
            )}
          </DialogHeader>
          <div className='mt-3 h-9'>
            {!blankError && <Input {...register('deviceReference')} onChange={onChange} />}
          </div>
          <div className='flex items-center h-8'>
            {errors.root && (
              <span className='text-sm font-medium text-error-500 tracking-32'>{errors.root.message}</span>
            )}
          </div>

          {blankError ? (
            <DialogFooter>
              <Button onClick={onConfirmError} type='button' variant='solid' className='flex-1 px-3 py-2'>
                Confirm
              </Button>
            </DialogFooter>
          ) : (
            <DialogFooter className='flex items-center gap-3'>
              <Button
                type='button'
                variant='outlined'
                disabled={isSubmitting}
                onClick={onClose}
                className='flex-1 px-3 py-2'
              >
                Cancel
              </Button>
              <Button type='submit' variant='solid' loading={isSubmitting} className='flex-1 px-3 py-2'>
                Confirm
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent overlay={false} position='top' className='gap-8 bg-white p-5 gap-15 rounded-[10px]'>
          <DialogHeader className='gap'>
            <DialogTitle className='text-lg font-medium tracking-36 text-secondary-900 text-start'>
              www.cerebro.level.now/levelnow says
            </DialogTitle>
            <DialogDescription className='mt-5 font-medium text-start text-md tracking-32 text-secondary-500'>
              Please type in new Device Reference of a tank
            </DialogDescription>
            <Input className='mt-3' />
            {/* <input
              type='text'
              className='px-4 py-2 mt-3 text-sm font-medium border rounded-md h-9 border-neutral-200 text-neutral-900 focus:outline-none'
            /> */
//     </DialogHeader>
//     <DialogFooter className='flex items-center gap-3'>
//       <Button variant='outlined' className='flex-1 px-3 py-2' onClick={() => setIsDialogOpen(false)}>
//         Cancel
//       </Button>
//       <Button variant='solid' className='flex-1 px-3 py-2' onClick={handleAddTank}>
//         Confirm
//       </Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog> */}
