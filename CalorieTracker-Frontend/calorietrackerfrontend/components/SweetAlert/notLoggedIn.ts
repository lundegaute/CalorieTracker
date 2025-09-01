import Swal from "sweetalert2";

export default function notLoggedInWarning() {
    return Swal.fire({
        title: "Only for logged in users",
        icon: "warning",
        confirmButtonText: "Go to login",
    });
}