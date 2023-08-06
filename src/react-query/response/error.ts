import axios from "axios";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";
// import { Store } from 'react-notifications-component';
// import { notification } from '../../utils/notification';
import { setSession } from "../../utils/jwt";

class ErrorResponse {
  registerError = (error: string) => {
    // Store.addNotification({
    //   ...notification,
    //   type: 'danger',
    //   container: 'top-center',
    //   insert: 'top',
    //   title: 'Error',
    //   message: error
    // });
  };
}
export default ErrorResponse;
