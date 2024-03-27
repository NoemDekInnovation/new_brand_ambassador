import useLoading from "../hooks/modals/useLoading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function LoadingComp() {
  const { isOpen, onClose, setData, data } = useLoading();

  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent className="p-0 bg-transparent flex justify-center items-center">
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
