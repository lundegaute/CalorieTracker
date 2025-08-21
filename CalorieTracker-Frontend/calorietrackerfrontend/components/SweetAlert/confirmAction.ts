import Swal from "sweetalert2";

export async function sweetAlertConfirm(title: string, text: string): Promise<boolean> {
    return new Promise((resolve) => {
        Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            resolve(result.isConfirmed);
        });
    });
}