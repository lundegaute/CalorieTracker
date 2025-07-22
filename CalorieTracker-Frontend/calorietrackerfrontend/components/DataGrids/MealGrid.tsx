import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Meal, Food, MealName, MealPreview } from '@/Types/types';


export default function MealGrid() {
    const Meals: Meal[] = [
        {id: 1, Quantity: 140, MealName: {id: 1, Name: "Breakfast", UserId: 1}, Food: {id: 1, Name: "Havregryn", Calories: 525, Protein: 16.8, Carbohydrates: 84, Fat: 9.38}},
        {id: 2, Quantity: 300, MealName: {id: 1, Name: "Breakfast", UserId: 1}, Food: {id: 2, Name: "Helmelk", Calories: 192, Protein: 9.86, Carbohydrates: 13.05, Fat: 10.15}},
        {id: 3, Quantity: 35, MealName: {id: 1, Name: "Breakfast", UserId: 1}, Food: {id: 3, Name: "Protein Pulver", Calories: 137.9, Protein: 26.25, Carbohydrates: 1.89, Fat: 2.38}},
        {id: 4, Quantity: 100, MealName: {id: 2, Name: "Lunch", UserId: 1}, Food: {id: 4, Name: "Kyllingfilet", Calories: 165, Protein: 31.0, Carbohydrates: 0.0, Fat: 3.6}},
    ]
    

    const columns: GridColDef<typeof rows>[] = [
        
        { field: "Quantity", headerName: "Quantity", width: 120, editable: true },
        { field: 'Name', headerName: 'Name', width: 150 },
        { field: 'Calories', headerName: 'Calories', type: 'number', width: 120 },
        { field: 'Protein', headerName: 'Protein', type: 'number', width: 120 },
        { field: 'Carbohydrates', headerName: 'Carbohydrates', type: 'number', width: 200 },
        { field: 'Fat', headerName: 'Fat', type: 'number', width: 110 },
    ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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