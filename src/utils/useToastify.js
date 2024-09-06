import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// warning message
const notify = (message, type) => {
  if (type === "warn") {
    toast.warn(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  }
};

export default notify;
