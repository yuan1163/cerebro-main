import { useEffect, useState } from 'react';
// ui components
import { Button } from '@core/ui/components/Button';
// shadcn ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog';
// icons
import DeleteIcon from '@assets/icons/LevelNOW/delete.svg?component';

type DeleteButtonProps = {
  type?: 'tank' | 'customer' | 'customer-assign' | 'user';
  name?: string;
  onDelete: () => Promise<void> | void;
  disabled?: boolean;
  isloading?: boolean;
};

export default function DeleteButton({ type, name, onDelete, disabled = false, isloading }: DeleteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Delete operation failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setIsDeleting(false);
    }
  }, [isDialogOpen]);

  const title = (() => {
    switch (type) {
      case 'tank':
        if (name) {
          return `Confirm to delete this tank [ ${name} ]?`;
        }
        return 'Confirm to delete this tank?';
      case 'customer':
        return `Confirm to delete this customer［ ${name} ］?`;
      case 'customer-assign':
        return (
          <>
            <div>Confirm removal of customer from the tank?</div>
            <div className='mt-2'>[ {name} ]</div>
          </>
        );
      default:
        return `Confirm to delete this ${type}?`;
    }
  })();

  const description = (() => {
    switch (type) {
      case 'tank':
        return 'This action will permanently delete the tank.';
      case 'customer':
        return 'This action will permanently delete the customer.';
      case 'customer-assign':
        return (
          <>
            <div>This action will remove the currently assigned customer.</div>
            <div>To reassign the same customer, please edit the Customer field in the tank settings.</div>
          </>
        );
      default:
        return `This action will permanently delete the ${type}.`;
    }
  })();

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        variant='outlined'
        className='p-0 w-9 h-9 aspect-square border-neutral-200'
        disabled={disabled}
      >
        <DeleteIcon />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className='bg-white min-w-fit p-11 gap-15 rounded-[10px]'
          onEscapeKeyDown={(e) => {
            if (isDeleting) {
              e.preventDefault();
            }
          }}
          onPointerDownOutside={(e) => {
            if (isDeleting) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            if (isDeleting) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader className='gap-5 p-5'>
            <DialogTitle className='text-2xl font-bold leading-6 text-center text-black'>{title} </DialogTitle>
            <DialogDescription className='text-xl font-medium text-center text-secondary-500'>
              {description}
            </DialogDescription>
          </DialogHeader>
          {errorMessage && <div className='mt-4 text-center text-red-500'>{errorMessage}</div>}
          <DialogFooter className='flex items-center gap-3'>
            <Button
              variant='outlined'
              className='flex-1 p-4'
              onClick={() => setIsDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button variant='delete' className='flex-1 p-4' onClick={handleDelete} loading={isDeleting}>
              Delete {type === 'customer-assign' ? 'customer' : type}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
