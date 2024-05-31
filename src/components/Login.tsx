'use client'

import React, { startTransition, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Link from 'next/link';
import * as z from "zod";
import { LoginSchema } from "@/src/schemas";
import { companyLogin } from '@/src/actions/login';

const LoginPageComponent: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // Clear errors and success
    startTransition(() => {
      companyLogin(values)
        .then((data) => {
          // TODO: Set errors or do something with data
        }) 
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            disabled={isPending}            
            autoFocus
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email ? String(errors.email.message) : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            disabled={isPending}
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password ? String(errors.password.message) : ''}
          />
          <Button
            type="submit"
            disabled={isPending}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            {"Don't have an account? "}
            <Link href="/auth/register" style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                Register
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPageComponent;
