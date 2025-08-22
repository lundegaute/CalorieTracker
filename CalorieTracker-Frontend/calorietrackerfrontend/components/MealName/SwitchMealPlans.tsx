"use client";
import { useEffect, useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import useMealPlanStore from "../Zustand/MealPlanStore";
import { AddMealPlanDTO, ResponseMealPlanDTO, UpdateMealPlanDTO } from "@/Types/types";
import { sweetAlertAddMealPlan, sweetAlertInput } from "../SweetAlert/formInput";
import { fetchPost } from "@/Fetch/fetchPost";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPut } from "@/Fetch/fetchPut";
import { fetchDelete } from "@/Fetch/fetchDelete";
import {sweetAlertConfirm} from "@/components/SweetAlert/confirmAction";



export default function SwitchMealPlans() {
  const queryClient = useQueryClient();
  const { mealPlanId, mealPlanList, setMealPlanId, setMealPlanList } = useMealPlanStore();
  const [mealPlanIndex, setMealPlanIndex] = useState(0);

  // Keep index in bounds if list changes
  useEffect(() => {
    if (!mealPlanList || mealPlanList.length === 0) return;
    if (mealPlanIndex > mealPlanList.length - 1) {
      setMealPlanIndex(mealPlanList.length - 1);
    }
  }, [mealPlanList, mealPlanIndex]);

  // Sync selected id when index changes
  useEffect(() => {
    if (mealPlanList && mealPlanList[mealPlanIndex]) {
      const id = mealPlanList[mealPlanIndex].id;
      if (id && id !== mealPlanId) setMealPlanId(id);
    }
  }, [mealPlanIndex, mealPlanList, mealPlanId, setMealPlanId]);

  // Debug: log after it actually updates
  useEffect(() => {
    if (mealPlanId != null) {
      console.log("Current mealPlanId:", mealPlanId);
    }
  }, [mealPlanId]);

  const canPrev = mealPlanList && mealPlanIndex > 0;
  const canNext = mealPlanList && mealPlanList.length > 0 && mealPlanIndex < mealPlanList.length - 1;

  function goPrev () {
    if ( canPrev) {
        setMealPlanIndex(i => i - 1);
    }
  }

  function goNext () {
    if ( canNext ) {
        setMealPlanIndex(i => i + 1);
    }
  }

  async function handleAddMealPlanName() {
    const name = await sweetAlertAddMealPlan();
    if (!name) return;
    const payload: AddMealPlanDTO = { name };
    const res = await fetchPost<ResponseMealPlanDTO, AddMealPlanDTO>("/api/MealPlan", payload);
    if (res.success) {
      // Optimistic append (optional)
      const newPlan = res.data;
      if (newPlan) {
        setMealPlanList([...mealPlanList, newPlan]);
        setMealPlanIndex(mealPlanList.length); // jump to new
      }
      queryClient.invalidateQueries({ queryKey: ["MealPlans"] });
    }
  }

  async function handleRenameMealPlan() {
    if (!mealPlanList || !mealPlanList[mealPlanIndex]) return;
    
    const currentPlan = mealPlanList[mealPlanIndex];
    const newName = await sweetAlertInput("Rename meal plan", currentPlan.name);
    if (!newName || newName === currentPlan.name) return;

    // Update the meal plan name via API
    const payload = { id: currentPlan.id, name: newName };
    const res = await fetchPut<ResponseMealPlanDTO, UpdateMealPlanDTO>("/api/MealPlan", payload);
    
    if (res.success) {
      // Optimistic update is when we update the UI before the server confirms
      const updatedList = mealPlanList.map(plan => 
        plan.id === currentPlan.id ? { ...plan, name: newName } : plan
      );
      setMealPlanList(updatedList);
      queryClient.invalidateQueries({ queryKey: ["MealPlans"] });
    }
  }

  async function handleDeleteMealPlan() {
    if (!mealPlanList || !mealPlanList[mealPlanIndex]) return;

    const currentPlan = mealPlanList[mealPlanIndex];
    const confirmed = await sweetAlertConfirm("Delete meal plan", `Are you sure you want to delete "${currentPlan.name}"?`);
    if (!confirmed) return;
    console.log(currentPlan.id)
    await fetchDelete("/api/MealPlan", String(currentPlan.id));
    //Optimistically remove the deleted plan from the list
    const updatedList = mealPlanList.filter(plan => plan.id !== currentPlan.id);
    setMealPlanList(updatedList);
    queryClient.invalidateQueries({ queryKey: ["MealPlans"] });
    
  }

  // Empty state (no plans yet)
  if (!mealPlanList || mealPlanList.length === 0) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <Tooltip title="Create meal plan">
          <IconButton
            size="small"
            onClick={handleAddMealPlanName}
            sx={{
              backgroundColor: "rgba(255,255,255,0.06)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
            }}
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <span className="text-sm text-slate-400">No meal plans yet</span>
      </div>
    );
  }

  const currentName = mealPlanList[mealPlanIndex]?.name ?? "—";

  return (
    <div className="flex items-center justify-between mb-4 gap-2">
      <div className="flex items-center gap-1">
        <Tooltip key={`prev-${canPrev}`} title={canPrev ? "Previous plan" : ""}  disableHoverListener={!canPrev}>
          <span>
            <IconButton
              size="small"
              onClick={goPrev}
              disabled={!canPrev}
              sx={iconStyle}
              aria-label="Previous meal plan"
            >
              <ChevronLeftRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Add meal plan">
          <IconButton
            size="small"
            onClick={handleAddMealPlanName}
            sx={{
              ...iconStyle,
              mx: 0.5,
              backgroundColor: "rgba(16,185,129,0.15)",
              "&:hover": { backgroundColor: "rgba(16,185,129,0.28)" },
            }}
            aria-label="Add meal plan"
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip key={`next-${canNext}`} title={canNext ? "Next plan" : ""} disableHoverListener={!canNext}>
          <span>
            <IconButton
              size="small"
              onClick={goNext}
              disabled={!canNext}
              sx={iconStyle}
              aria-label="Next meal plan"
            >
              <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </div>

      <h2 className="text-lg font-semibold text-slate-200 truncate max-w-xs">
        {currentName}
      </h2>
      <Tooltip title="Rename meal plan">
    <IconButton
      size="small"
      onClick={handleRenameMealPlan}
      sx={{
        ...iconStyle,
        padding: "4px",
        minWidth: "auto",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#F59E0B",
        },
      }}
      aria-label="Rename meal plan"
    >
      <EditRoundedIcon fontSize="small" />
    </IconButton>
  </Tooltip>
      <div className="text-xs text-slate-500 tabular-nums">
        {mealPlanIndex + 1}/{mealPlanList.length}
      </div>
      <Tooltip title="Delete meal plan">
    <IconButton
      size="small"
      disabled={mealPlanList.length === 1}
      onClick={handleDeleteMealPlan}
      sx={{
        ...iconStyle,
        padding: "4px",
        minWidth: "auto",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#EF4444",
        },
      }}
      aria-label="Delete meal plan"
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Tooltip>
    </div>
  );
}

const iconStyle = {
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#94A3B8",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#E2E8F0",
  },
  "&.Mui-disabled": {
    opacity: 0.25,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
};