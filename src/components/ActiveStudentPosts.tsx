'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridEventListener, GridPaginationModel } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import { PostSchema } from '@/src/schemas';
import * as z from 'zod';

interface DataTableProps {
  posts: (z.infer<typeof PostSchema> & { hasSentMessage: boolean })[] | null;
}

const ActiveStudentPosts = ({ posts }: DataTableProps) => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'studentFirstName', headerName: 'Student First Name', width: 150 },
    { field: 'studentSurname', headerName: 'Student Surname', width: 150 },
    // choice of desired columns
    // { field: 'content', headerName: 'Content', width: 300 }, // Content column commented out
    // {
    //   field: 'createdAt', headerName: 'Date Created', width: 200, type: 'dateTime', // Date Created column commented out
    //   valueFormatter: (params: GridCellParams) => {
    //     const date = new Date(params.value as string);
    //     return date.toLocaleDateString('en-GB');
    //   },
    // },
    // {
    //   field: 'isActive', headerName: 'Active Status', width: 120, type: 'boolean', // Active Status column commented out
    //   renderCell: (params: GridCellParams) => (params.value ? 'Yes' : 'No'),
    // },
    {
      field: 'hasSentMessage', headerName: 'Message Sent', width: 150, type: 'boolean',
      renderCell: (params: GridCellParams) => (params.value ? 'Yes' : 'No'),
    },
    { field: 'education', headerName: 'Education', width: 300 },
    { field: 'workExperiences', headerName: 'Work Experiences', width: 300 },
    { field: 'skills', headerName: 'Skills', width: 300 },
  ];

  const rows = posts?.map(post => ({
    id: post.id,
    studentFirstName: post.student?.firstname,
    studentSurname: post.student?.surname,
    // choice of desired columns
    // content: post.content,
    // createdAt: post.createdAt,
    // isActive: post.isActive,
    hasSentMessage: post.hasSentMessage,
    education: post.education?.map(edu => `${edu.degree} at ${edu.institution} (${edu.yearOfGraduation})`).join('\n') || '',
    workExperiences: post.workExperiences?.map(work => `${work.position} at ${work.company}`).join('\n') || '',
    skills: post.skills?.map(skill => `${skill.skillName} (${skill.level})`).join('\n') || '',
  })) || [];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push(`/posts/${params.row.id}`);
  };

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Active Student Posts
        </Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        onRowClick={handleRowClick}
      />
    </Container>
  );
};

export default ActiveStudentPosts;