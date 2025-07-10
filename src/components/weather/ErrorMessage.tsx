
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-4 mb-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-300" />
          <p className="text-red-100">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-red-300 hover:text-red-100 hover:bg-red-500/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
