"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { MealFoods, ErrorResponse, FoodDTO, UpdateMealDTO, SuccessMessage} from "@/Types/types";
import { fetchGet} from "@/Fetch/fetchGet";
import { fetchPut } from "@/Fetch/fetchPut";
import { fetchDelete } from "@/Fetch/fetchDelete";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

interface MealDetailsProps {
  mealNameId: number;
}

export function MealDetails({ mealNameId }: MealDetailsProps) {
  const { data, error, isLoading, refetch: refetchMeal } = useQuery<MealFoods[], ErrorResponse>({
    queryKey: ["MealDetails", mealNameId],
    queryFn: async () => fetchGet<MealFoods[]>(`/api/Meals/${mealNameId}`),
    retry: 0,
    staleTime: 5 * 60 * 1000
  });

  async function handleQuantityChange(quantity: number, mealId: number, mealNameId: number, foodName: string) {
      const foodItem = await fetchGet<FoodDTO>(`/api/Foods/${encodeURIComponent(foodName)}`);
      const foodId = foodItem.id;
      const updateMealDTO: UpdateMealDTO = {
        id: mealId,
        quantity: quantity,
        mealNameId: mealNameId,
        foodId: foodId,
      }
      const res = await fetchPut<SuccessMessage, UpdateMealDTO>(`/api/Meals`, updateMealDTO);
      if ( res.success ) {
        refetchMeal();
      }
      
  }

  if (isLoading) return <p className="text-sm text-slate-400">Loading...</p>;
  if (error) return <p className="text-sm text-rose-400">Failed to load meal details.</p>;

  const columns: GridColDef[] = [
    { field: "mealId", headerName: "ID", width: 50},
    { field: "foodName", headerName: "Food", width: 150},
    { field: "quantity", headerName: "Qty", type: "number", editable: true, width: 70, },
    { field: "calories", headerName: "Kcal", type: "number", width: 70 },
    { field: "protein", headerName: "Prot", type: "number", width: 70 },
    { field: "carbohydrates", headerName: "Carbs", type: "number", width: 70 },
    { field: "fat", headerName: "Fat", type: "number", width: 60 },
    {
      field: "actions",
      headerName: "Del",
      width: 55,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => fetchDelete(`/api/Meals`, params.row.mealId).then(() => refetchMeal())}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )
    }
  ];

  return (
    <Box
      // panel wrapper (same style pattern as MealNames parent panel)
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.4)]"
      sx={{
        width: "fit-content",
        maxWidth: "100%",
        overflowX: "auto"
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-200">
          Meal Items <span className="text-slate-500 font-normal">({data!.length})</span>
        </h2>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(r) => r.mealId}
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterSelectedRowCount
        density="compact"
        columnVisibilityModel={{mealId: false}}
        processRowUpdate={(newRow, oldRow) => {
            if (newRow.quantity !== oldRow.quantity) {
                handleQuantityChange(newRow.quantity, newRow.mealId, mealNameId, newRow.foodName);
            }
            return newRow;
        }}
        onProcessRowUpdateError={(err) => console.error(err)}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        pageSizeOptions={[10, 25, 50]}
        sx={{
          border: "none",
          background: "transparent",
          color: "#E2E8F0",
          "--DataGrid-rowBorderColor": "rgba(255,255,255,0.06)",
          "& .MuiDataGrid-columnHeaders": {
            background:
              "linear-gradient(90deg, rgba(30,41,59,0.85), rgba(15,23,42,0.75))",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.5rem 0.5rem 0 0",
          },
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
            padding: "4px 6px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            fontSize: 13.5,
            letterSpacing: ".35px",
            color: "#F1F5F9",
          },
          "& .MuiDataGrid-cell": {
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "rgba(255,255,255,0.02)",
          },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(16,185,129,0.06)",
            },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "rgba(16,185,129,0.14) !important",
            "&:hover": { backgroundColor: "rgba(16,185,129,0.18) !important" },
            boxShadow: "inset 3px 0 0 0 #10b981",
          },
          "& .MuiDataGrid-footerContainer": {
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.75), rgba(30,41,59,0.85))",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0 0 0.5rem 0.5rem",
          },
          "& .MuiTablePagination-root, & .MuiTablePagination-root *": {
            color: "#94A3B8",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "rgba(255,255,255,0.08)",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}