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
import { t } from '@core/utils/translate';

type DeleteButtonProps = {
  type?: 'tank' | 'customer' | 'customer-assign';
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
          return t(
            `tanks.deleteTank.confirmTitle.label［ ${name} ］?`,
            `Confirm to delete this tank［ ${name} ］?`,
            'Delete tank.',
          );
        }
        return t('tanks.deleteTank.confirmTitle.label', 'Confirm to delete this tank?', 'Delete tank.');
      case 'customer':
        return t(
          'customers.deleteCustomer.confirmTitle.label',
          `Confirm to delete this customer [ ${name} ] ?`,
          'Delete customer.',
        );
      case 'customer-assign':
        return (
          <>
            <div>
              {t(
                'tank.unassignCustomer.confirmTitle.label',
                'Confirm removal of customer from the tank?',
                'Unassign Customer',
              )}
            </div>
            <div className='mt-2'>[ {name} ]</div>
          </>
        );
      default:
        return t('general.deleteItem.title.label', `Confirm to delete this ${type}?`, 'Delete item.');
    }
  })();

  const description = (() => {
    switch (type) {
      case 'tank':
        return t(
          'tanks.deleteTank.confirmDescription.label',
          'This action will permanently delete the tank.',
          'Delete tank.',
        );
      case 'customer':
        return t(
          'customers.deleteCustomer.confirmDescription.label',
          'This action will permanently delete the customer.',
          'Delete customer.',
        );
      case 'customer-assign':
        return (
          <>
            <div>
              {t(
                'tank.unassignCustomer.confirmDescription.label',
                'This action will remove the currently assigned customer.',
                'Unassign Customer',
              )}
            </div>
            <div>
              {t(
                'tank.unassignCustomer.reassignNote.label',
                'To reassign the same customer, please edit the Customer field in the tank settings.',
                'Unassign Customer',
              )}
            </div>
          </>
        );
      default:
        return t(
          'general.deleteItem.description.label',
          `This action will permanently delete the ${type}.`,
          'Delete item.',
        );
    }
  })();

  const buttonLabel = (() => {
    switch (type) {
      case 'tank':
        return t('tanks.deleteTank.label', 'Delete tank', 'Delete tank.');
      case 'customer':
        return t('customers.deleteCustomer.label', 'Delete customer', 'Delete customer.');
      case 'customer-assign':
        return t('tank.unassignCustomer.label', 'Delete Customer', 'Unassign Customer');
      default:
        return t('general.deleteButton.label', `Delete ${type}`, 'Delete button.');
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
              className='flex-1 p-4 dark:bg-surface-03'
              onClick={() => setIsDialogOpen(false)}
              disabled={isDeleting}
            >
              {t('general.cancelButton.label', 'Cancel', 'Cancel button.')}
            </Button>
            <Button variant='delete' className='flex-1 p-4' onClick={handleDelete} loading={isDeleting}>
              {buttonLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
