import Swal from "sweetalert2";

export default function SweetAlertSuccess() {
    return Swal.fire({
        title: "User created!",
        icon: "success",
        confirmButtonText: "Go to dashboard"
    })
}