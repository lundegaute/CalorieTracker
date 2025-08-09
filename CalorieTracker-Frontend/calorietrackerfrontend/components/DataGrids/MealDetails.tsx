"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {MealDTO, MealSummary, ErrorResponse, MealFoods} from '@/Types/types';

import {fetchGet} from "@/Fetch/fetchGet";
import DeleteIcon from '@mui/icons-material/Delete';
import {useQuery} from "@tanstack/react-query";


export function MealDetails(params: {id: number}) {
    const { data: mealDetails, error, isLoading: isLoadingMeal, refetch: refetchMeal } = useQuery<MealFoods[], ErrorResponse>({
        queryKey: ["MealDetails", params.id],
        queryFn: async () => fetchGet<MealFoods[]>(`/api/Meals/${params.id}`), 
        retry: 0,
        staleTime: 5 * 60 * 1000 // 5 minutes before refetching data
    });
    if (isLoadingMeal) {
        return <div>Loading details...</div>
    }


    const columns: GridColDef[] = [
        { field: "mealId", headerName: "ID", width: 90, },
        { field: "quantity", headerName: "Quantity", type: 'number', width: 120, editable: true },
        { field: 'foodName', headerName: 'Name', width: 150 },
        { field: 'calories', headerName: 'Calories', type: 'number', width: 120 },
        { field: 'protein', headerName: 'Protein', type: 'number', width: 120 },
        { field: 'carbohydrates', headerName: 'Carbohydrates', type: 'number', width: 200 },
        { field: 'fat', headerName: 'Fat', type: 'number', width: 110 },
        { 
            field: 'Delete', headerName: 'Delete', type: 'actions', width: 120, 
            renderCell: (params) => (
                <strong>
                    <Button variant="outlined" color="error" onClick={() => alert(`Delete for ${params.row.mealId}`)}>
                        <DeleteIcon />
                    </Button>
                </strong>
            )
        },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={mealDetails}
            columns={columns}
            getRowId={(row) => row.mealId}
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