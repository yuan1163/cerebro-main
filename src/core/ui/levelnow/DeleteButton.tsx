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
  type?: 'tank' | 'customer' | 'user';
  name?: string;
  onDelete: () => void;
  disabled?: boolean;
};

export default function DeleteButton({ type, name, onDelete, disabled = false }: DeleteButtonProps) {
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
        return `Confirm removal of customer from the tank? [ ${name} ]`;
      default:
        return `Confirm to delete this ${type}?`;
    }
  })();

  const description = (() => {
    switch (type) {
      case 'tank':
        return 'This action will permanently delete the tank.';
      case 'customer':
        return 'This action will remove the currently assigned customer. To reassign the same customer, please edit the Customer field in the tank settings.';
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
            <DialogTitle className='text-[24px] leading-6 font-bold text-black text-center l'>{title}</DialogTitle>
            <DialogDescription className='text-[22px] font-medium text-center text-secondary-500'>
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex items-center gap-3'>
            <Button variant='outlined' className='flex-1 p-4' onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant='delete' className='flex-1 p-4' onClick={handleDelete}>
              Delete {type}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
