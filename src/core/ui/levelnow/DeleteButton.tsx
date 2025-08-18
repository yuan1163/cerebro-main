import { useState } from 'react';
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
  onDelete: () => void;
  disabled?: boolean;
  isloading?: boolean;
};

export default function DeleteButton({ type, name, onDelete, disabled = false, isloading }: DeleteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsDialogOpen(!isDialogOpen);
  };

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
            <p>Confirm removal of customer from the tank?</p>
            <p className='mt-2'>[ {name} ]</p>
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
            <p>This action will remove the currently assigned customer.</p>
            <p>To reassign the same customer, please edit the Customer field in the tank settings.</p>
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
        <DialogContent className='bg-white min-w-fit p-11 gap-15 rounded-[10px]'>
          <DialogHeader className='gap-5 p-5'>
            <DialogTitle className='text-2xl font-bold leading-6 text-center text-black'>{title} </DialogTitle>
            <DialogDescription className='text-xl font-medium text-center text-secondary-500'>
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex items-center gap-3'>
            <Button
              variant='outlined'
              className='flex-1 p-4'
              onClick={() => setIsDialogOpen(false)}
              disabled={isloading}
            >
              Cancel
            </Button>
            <Button variant='delete' className='flex-1 p-4' onClick={handleDelete} loading={isloading}>
              Delete {type === 'customer-assign' ? 'customer' : type}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
