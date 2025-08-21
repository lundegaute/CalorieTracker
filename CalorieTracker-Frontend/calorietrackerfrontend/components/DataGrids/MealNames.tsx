"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {MealSummary, ErrorResponse, UpdateMealNameDTO, SuccessMessage, AddMealPlanDTO, ResponseMealPlanDTO} from '@/Types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {fetchGet} from "@/Fetch/fetchGet";
import { fetchPut} from "@/Fetch/fetchPut";
import {fetchDelete} from "@/Fetch/fetchDelete";
import DeleteIcon from '@mui/icons-material/Delete';
import {sweetAlertAddMealPlan, sweetAlertInput} from "@/components/SweetAlert/formInput";
import { useEffect, useState } from "react";
import { fetchPost } from '@/Fetch/fetchPost';
import useMealPlanStore from "@/components/Zustand/MealPlanStore";



export default function MealGrid() {
  const queryClient = useQueryClient();
  const mealPlanStore = useMealPlanStore();
  const [filteredData, setFilteredData] = useState<MealSummary[]>([]); // might need this to filter data based on mealPlanID

  const { data: mealsSummary, error, isLoading: isLoadingMealNames, refetch: refetchMealNames } = useQuery<MealSummary[], ErrorResponse>({
    queryKey: ["MealsSummary", mealPlanStore.mealPlanId],
    queryFn: async () => await fetchGet<MealSummary[]>("/api/Meals"),
    select: (data) => data.filter((meal) => meal.mealPlanId === mealPlanStore.mealPlanId),
    retry: 0,
    enabled: mealPlanStore.mealPlanId !== null, // Only run this query if we have mealPlanId
  });
  const { data: mealPlans, error: mealPlanError, isLoading: isLoadingMealPlans, refetch: refetchMealPlans } = useQuery<ResponseMealPlanDTO[], ErrorResponse>({
    queryKey: ["MealPlans"],
    queryFn: async () => fetchGet<ResponseMealPlanDTO[]>("/api/MealPlan"), 
    retry: 0,
  });


  async function handleMealNameChange(mealNameId: number, updatedName: string) {
      console.log(updatedName);
      const mealNameUpdate: UpdateMealNameDTO = {
        id: mealNameId,
        name: updatedName,
      }
      const res = await fetchPut<SuccessMessage, UpdateMealNameDTO>(`/api/MealName`, mealNameUpdate);
      if ( res.success ) {
        queryClient.refetchQueries({queryKey: ["MealsSummary"]})
      };
  };

  async function handleAddMealPlanName() {
    const mealPlanName = { name: await sweetAlertAddMealPlan() };
    if ( mealPlanName ) {
      console.log(mealPlanName);
      const res = await fetchPost<ResponseMealPlanDTO, AddMealPlanDTO>(`/api/MealPlan`, mealPlanName);
      if ( res.success) {
        queryClient.refetchQueries({queryKey: ["MealPlans"]})
      };
    };
  };

  useEffect(() => {
    if (mealPlans && mealPlans.length > 0) {
      mealPlanStore.setMealPlanList(mealPlans);
      mealPlanStore.setMealPlanId(mealPlans[mealPlans.length - 1].id); // Set the current meal plan ID to the last meal plan in the list
    }
  }, [mealPlans]);

  if (isLoadingMealNames || isLoadingMealPlans) {
    return <div>Loading meals...</div>;
  }
  if (error) {
    return <div>Error loading meals: {error.message.Error[0]}</div>;
  }
  if (!mealsSummary || !mealPlans) { 
    console.log(mealsSummary)
    console.log("MealPlans:" + mealPlans)
    return <>No meals data available</>;
  }
  if (mealPlans.length == 0) {
    handleAddMealPlanName();
    return <>No mealplans found</>;
  }

  const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 70, },
      { field: 'name', headerName: 'Name', width: 120, editable: true },
      { field: 'totalCalories', headerName: 'Kcal', type: 'number', width: 65 },
      { field: 'totalProtein', headerName: 'Protein', type: 'number', width: 65 },
      { field: 'totalCarbohydrate', headerName: 'Carbs', type: 'number', width: 65 },
      { field: 'totalFat', headerName: 'Fat', type: 'number', width: 65 },
      { 
          field: 'Details', headerName: 'Details', type: 'actions', width: 100, 
          renderCell: (params) => (
              <strong>
                  <Button variant="contained" color="primary" href={`/Meals/${params.row.id}`}>
                      Details
                  </Button>
              </strong>
          )
      },
      { 
          field: 'Delete', headerName: 'Delete', type: 'actions', width: 100, 
          renderCell: (params) => (
              <strong>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => fetchDelete(`/api/MealName/`, params.row.id).then(() => refetchMealNames())}>
                      <DeleteIcon />
                  </Button>
              </strong>
          )
      },
  ];

  return (
  <DataGrid
    rows={mealsSummary}
    columns={columns}
    getRowId={(row) => row.id}
    autoHeight
    disableRowSelectionOnClick
    columnVisibilityModel={{ id: false }}
    processRowUpdate={(newRow, oldRow) => {
      if ( newRow.name !== oldRow.name) {
          handleMealNameChange(newRow.id, newRow.name);
      }
      return newRow;
    }}
    onProcessRowUpdateError={(err) => console.error(err)}
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    pageSizeOptions={[5, 10, 20]}
    sx={{
      fontSize: 15,
      // Remove its own panel look so it inherits parent card aesthetics
      border: 'none',
      backgroundColor: 'transparent',
      color: '#E2E8F0',

      '--DataGrid-rowBorderColor': 'rgba(255,255,255,0.06)',

      '& .MuiDataGrid-columnHeaders': {
        background:
          'linear-gradient(90deg, rgba(30,41,59,0.85), rgba(15,23,42,0.75))',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0.5rem 0.5rem 0 0',
      },
      '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: '.4px',
        color: '#F1F5F9',
      },
      '& .MuiDataGrid-cell': {
        fontSize: 15,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiDataGrid-row:nth-of-type(even)': {
        backgroundColor: 'rgba(255,255,255,0.02)',
      },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: 'rgba(16,185,129,0.06)',
      },
      '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: 'rgba(16,185,129,0.14) !important',
        '&:hover': { backgroundColor: 'rgba(16,185,129,0.18) !important' },
        boxShadow: 'inset 3px 0 0 0 #10b981',
      },
      '& .MuiDataGrid-footerContainer': {
        background:
          'linear-gradient(90deg, rgba(15,23,42,0.75), rgba(30,41,59,0.85))',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0 0 0.5rem 0.5rem',
      },
      '& .MuiTablePagination-root, & .MuiTablePagination-root *': {
        color: '#94A3B8',
      },
      '& .MuiDataGrid-columnSeparator': { color: 'rgba(255,255,255,0.08)' },
      '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
        outline: 'none',
      },
      '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within':
        { outline: 'none' },
      // Remove internal scrollbars if wide enough parent
      '& .MuiDataGrid-virtualScroller': {
        scrollbarWidth: 'thin',
      },
    }}
  />
);
}