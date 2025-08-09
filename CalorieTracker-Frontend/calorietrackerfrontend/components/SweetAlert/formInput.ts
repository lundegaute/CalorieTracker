import Swal from "sweetalert2";

async function sweetAlertInput() {
    const result = await Swal.fire( {
        title: "Add Meal Name",
        input: "text",
        inputPlaceholder: "Enter meal name",
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel"
    });
    if ( result.isDismissed || !result.value) {
        return;
    }
    return result.value;
}

export default sweetAlertInput;