import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    type: 'string',
    width: 150,
    editable: true,
  },
  {
    field: 'Calories',
    headerName: 'Calories',
    type: 'number',
    width: 150,
    editable: true,
    valueGetter: (value, row) => `${row.Calories || ''}`,
    
  },
  {
    field: 'Protein',
    headerName: 'Protein',
    type: 'number',
    width: 110,
    editable: true,
    valueGetter: (value, row) => `${row.Protein || ''}`,
  },
  {
    field: 'Carbohydrates',
    headerName: 'Carbohydrates',
    type: 'number',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
    valueGetter: (value, row) => `${row.Carbohydrates || ''}`,
  },
  {
    field: 'Fat',
    headerName: 'Fat',
    type: 'number',
    width: 150,
    editable: true,
    valueGetter: (value, row) => `${row.Fat || ''}`,
  },
];

const rows = [
  { id: 1, Name: 'Havregryn', Calories: 400, Protein: 14, Carbohydrates: 35, Fat: 20 },
  { id: 2, Name: 'Helmelk', Calories: 350, Protein: 31, Carbohydrates: 42, Fat: 24 },
  { id: 3, Name: 'Protein Pulver', Calories: 450, Protein: 31, Carbohydrates: 42, Fat: 24 },
  { id: 4, Name: 'Havreknekkebrød', Calories: 250, Protein: 11, Carbohydrates: 24, Fat: 15 },
  { id: 5, Name: 'Brunost', Calories: 250, Protein: 10, Carbohydrates: 20, Fat: 10 },
  { id: 6, Name: 'Karbonadedeig', Calories: 250, Protein: 150, Carbohydrates: 50, Fat: 20 },
  { id: 7, Name: 'Lefse', Calories: 250, Protein: 44, Carbohydrates: 30, Fat: 20 },
  { id: 8, Name: 'Ris', Calories: 250, Protein: 36, Carbohydrates: 20, Fat: 15 },
  { id: 9, Name: 'Valnøtter', Calories: 250, Protein: 65, Carbohydrates: 30, Fat: 20 },
];

function MealGrid() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default MealGrid;
