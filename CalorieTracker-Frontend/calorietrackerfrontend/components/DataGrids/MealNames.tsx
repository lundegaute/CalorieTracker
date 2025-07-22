import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Meal, MealSummary} from '@/Types/types';


export default function MealGrid() {
    const meals: Meal[] = [
        {id: 1, Quantity: 140, MealName: {id: 1, Name: "Havregrøt"}, Food: {id: 1, Name: "Havregryn", Calories: 525, Protein: 16.8, Carbohydrates: 84, Fat: 9.38}},
        {id: 2, Quantity: 300, MealName: {id: 1, Name: "Havregrøt"}, Food: {id: 2, Name: "Helmelk", Calories: 192, Protein: 9.86, Carbohydrates: 13.05, Fat: 10.15}},
        {id: 3, Quantity: 35, MealName: {id: 1, Name: "Havregrøt"}, Food: {id: 3, Name: "Protein Pulver", Calories: 137.9, Protein: 26.25, Carbohydrates: 1.89, Fat: 2.38}},
        {id: 4, Quantity: 100, MealName: {id: 2, Name: "Lunch"}, Food: {id: 4, Name: "Kyllingfilet", Calories: 165, Protein: 31.0, Carbohydrates: 0.0, Fat: 3.6}},
    ]

    const mealMap = new Map<number, MealSummary>(); 

    meals.forEach((meal) => {
        if ( !mealMap.get(meal.MealName.id)) {
            mealMap.set(meal.MealName.id, {
                MealNameId: meal.MealName.id,
                MealName: meal.MealName.Name,
                TotalCalories: 0,
                TotalProtein: 0,
                TotalCarbohydrates: 0,
                TotalFat: 0
            });
        }
        const summary = mealMap.get(meal.MealName.id)!;
        summary.TotalCalories += meal.Food.Calories;
        summary.TotalProtein += meal.Food.Protein;
        summary.TotalCarbohydrates += meal.Food.Carbohydrates;
        summary.TotalFat += meal.Food.Fat;

    });

    const mealSummary: MealSummary[] = Array.from(mealMap.values());
    

    const columns: GridColDef[] = [
        { field: "MealNameId", headerName: "ID", width: 90 },
        { field: 'MealName', headerName: 'Name', width: 150 },
        { field: 'TotalCalories', headerName: 'Calories', type: 'number', width: 120 },
        { field: 'TotalProtein', headerName: 'Protein', type: 'number', width: 120 },
        { field: 'TotalCarbohydrates', headerName: 'Carbohydrates', type: 'number', width: 200 },
        { field: 'TotalFat', headerName: 'Fat', type: 'number', width: 110 },
        { 
            field: 'Details', headerName: 'Details', type: 'actions', width: 120, 
            renderCell: (params) => (
                <strong>
                    <Button variant="contained" color="primary" href={`/Meals/${params.row.MealNameId}`}>
                        Details
                    </Button>
                </strong>
            )
        },
        { 
            field: 'Delete', headerName: 'Delete', type: 'actions', width: 120, 
            renderCell: (params) => (
                <strong>
                    <Button variant="outlined" color="warning" onClick={() => alert(`Delete for ${params.row.MealNameId}`)}>
                        Delete
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
        getRowId={(row) => row.MealNameId}
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