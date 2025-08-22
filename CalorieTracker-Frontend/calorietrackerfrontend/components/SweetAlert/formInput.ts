import Swal from "sweetalert2";

export async function sweetAlertInput(title: string, mealPlanName: string) {
    const result = await Swal.fire( {
        title: title,
        input: "text",
        inputPlaceholder: "Enter name",
        inputValue: mealPlanName,
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel"
    });
    if ( result.isDismissed || !result.value) {
        return;
    }
    return result.value;
}

export async function sweetAlertAddMealPlan() {
  const result = await Swal.fire({
    title: "Add meal plan name",
    input: "text",
    inputPlaceholder: "Enter name",
    showCancelButton: false,
    confirmButtonText: "Add",
    //cancelButtonText: "Cancel",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value || !value.trim()) {
        return "Meal plan name cannot be empty";
      }
      if (value.trim().length < 2) {
        return "At least 2 characters";
      }
      return null;
    },
  });
  return result.value.trim();
}