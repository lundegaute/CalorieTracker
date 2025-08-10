"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {MealSummary, ErrorResponse} from '@/Types/types';
import {helper} from "@/HelperFunctions/helper";
import { useQuery } from '@tanstack/react-query';
import {fetchGet} from "@/Fetch/fetchGet";
import {fetchDelete} from "@/Fetch/fetchDelete";
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
    return <div>Error loading meals: {error.message.Error[0]}</div>;
  }
  if (!mealsSummary) {
    return <>No meals data available</>;
  }

  const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 70, },
      { field: 'name', headerName: 'Name', width: 90 },
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
                  <Button variant="outlined" color="error" onClick={() => fetchDelete(`/api/MealName/`, params.row.id).then(() => refetchMeals())}>
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