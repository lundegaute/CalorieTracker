"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {MealSummary, ErrorResponse} from '@/Types/types';
import {helper} from "@/HelperFunctions/helper";
import { useQuery } from '@tanstack/react-query';
import {fetchGet} from "@/Fetch/fetchGet";
import DeleteIcon from '@mui/icons-material/Delete';
import AddMealName from "@/components/MealName/AddMealName";



export default function MealGrid() {
  
  const { data: mealsSummary, error, isLoading: isLoadingMeals, refetch: refetchMeals } = useQuery<MealSummary[], ErrorResponse>({
    queryKey: ["MealsSummary"],
    queryFn: async () => fetchGet<MealSummary[]>("/api/Meals"), 
    retry: 0,
  })

  // Early returns - prevent rest of code from executing
  if (isLoadingMeals) {
    return <div>Loading meals...</div>;
  }
  if (error) {
    return <div>Error loading meals: {error.message.error[0]}</div>;
  }
  if (!mealsSummary) {
    return <>No meals data available</>;
  }

  const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 90 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'totalCalories', headerName: 'Calories', type: 'number', width: 120 },
      { field: 'totalProtein', headerName: 'Protein', type: 'number', width: 120 },
      { field: 'totalCarbohydrate', headerName: 'Carbohydrates', type: 'number', width: 200 },
      { field: 'totalFat', headerName: 'Fat', type: 'number', width: 110 },
      { 
          field: 'Details', headerName: 'Details', type: 'actions', width: 120, 
          renderCell: (params) => (
              <strong>
                  <Button variant="contained" color="primary" href={`/Meals/${params.row.id}`}>
                      Details
                  </Button>
              </strong>
          )
      },
      { 
          field: 'Delete', headerName: 'Delete', type: 'actions', width: 120, 
          renderCell: (params) => (
              <strong>
                  <Button variant="outlined" color="error" onClick={() => alert(`Delete for ${params.row.id}`)}>
                      <DeleteIcon />
                  </Button>
              </strong>
          )
      },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <AddMealName />
      </Box>
      <DataGrid
        rows={mealsSummary}
        columns={columns}
        getRowId={(row) => row.id} // DataGrid requires a id for each row, the field name should be "id", but i have mealNameId, so i need this line
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          fontSize: '20px', // Increase font size for all text
          '& .MuiDataGrid-columnHeaders': {
            fontSize: '20px', // Header text size
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '20px', // Cell text size
          },
        }}
      />
    </Box>
  );
}