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
import { LogOut, AlertTriangle } from "lucide-react";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmLogout: () => void;
}

export function LogoutDialog({ open, onOpenChange, onConfirmLogout }: LogoutDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-amber-100 rounded-full">
              <LogOut className="h-6 w-6 text-amber-600" />
            </div>
            <AlertDialogTitle className="text-xl">Logout Confirmation</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base pt-2">
            Are you sure you want to logout from Clinico Doctor Portal?
          </AlertDialogDescription>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#174880] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-[#174880] mb-1">Please note:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Any unsaved changes will be lost</li>
                <li>Active consultations will be disconnected</li>
                <li>You'll need to login again to access the portal</li>
              </ul>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="hover:bg-gray-100">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
