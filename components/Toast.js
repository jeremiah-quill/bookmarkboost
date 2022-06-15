import { useToast } from "../utils/useToast";

const Toast = () => {
  const { toast } = useToast();

  if (toast.showing)
    return (
      <div className="transition-all p-5 bg-green-400 rounded-tl-md fixed bottom-0 right-0">
        {toast.message}
      </div>
    );
};

export default Toast;
