import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Meal, MealSummary, ErrorResponse} from '@/Types/types';
import {helper} from "@/HelperFunctions/helper";
import { useQuery } from '@tanstack/react-query';
import {fetchGet} from "@/Fetch/fetchGet";
import DeleteIcon from '@mui/icons-material/Delete';



export default function MealGrid() {
  
  const { data: meals, error, isLoading: isLoadingMeals, refetch: refetchMeals } = useQuery<Meal[], ErrorResponse>({
    queryKey: ["MealsSummary"],
    queryFn: async () => fetchGet<Meal[]>("/api/Meals"), 
    retry: 0,
  })

  // Early returns - prevent rest of code from executing
  if (isLoadingMeals) {
    return <div>Loading meals...</div>;
  }
  if (error) {
    return <div>Error loading meals: {error.message.error[0]}</div>;
  }
  if (!meals) {
    return <>No meals data available</>;
  }

  const mealMap = helper.buildMealSummery(meals); // Map is equivalent to C# Dictionary
  const mealSummary: MealSummary[] = Array.from(mealMap.values()); // Convert the map to an array for DataGrid
  
  const columns: GridColDef[] = [
      { field: "mealNameId", headerName: "ID", width: 90 },
      { field: 'mealName', headerName: 'Name', width: 150 },
      { field: 'totalCalories', headerName: 'Calories', type: 'number', width: 120 },
      { field: 'totalProtein', headerName: 'Protein', type: 'number', width: 120 },
      { field: 'totalCarbohydrates', headerName: 'Carbohydrates', type: 'number', width: 200 },
      { field: 'totalFat', headerName: 'Fat', type: 'number', width: 110 },
      { 
          field: 'Details', headerName: 'Details', type: 'actions', width: 120, 
          renderCell: (params) => (
              <strong>
                  <Button variant="contained" color="primary" href={`/Meals/${params.row.mealNameId}`}>
                      Details
                  </Button>
              </strong>
          )
      },
      { 
          field: 'Delete', headerName: 'Delete', type: 'actions', width: 120, 
          renderCell: (params) => (
              <strong>
                  <Button variant="outlined" color="error" onClick={() => alert(`Delete for ${params.row.mealNameId}`)}>
                      <DeleteIcon />
                  </Button>
              </strong>
          )
      },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={mealSummary}
        columns={columns}
        getRowId={(row) => row.mealNameId} // DataGrid requires a id for each row, the field name should be "id", but i have mealNameId, so i need this line
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