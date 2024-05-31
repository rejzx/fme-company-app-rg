'use client'

import React, { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Link from 'next/link';
import * as z from "zod";
import { RegisterSchema } from "@/src/schemas";
import { companyRegister } from '@/src/actions/register';
import Notification from '@/src/components/Notification'
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      companyRegister(values).then(data => {
        if (data.success) {
          setMessage('Registration successful!');
          setMessageType('success');

          router.push('/auth/login');
        } else if (data.error) {
          setMessage(data.error);
          setMessageType('error');
        }
      }).catch(error => {
        console.error("Network or server error", error);
        setMessage('Registration failed. Please try again.');
        setMessageType('error');
      });
    });
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            disabled={isPending}
            autoFocus
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name ? String(errors.name.message) : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            disabled={isPending}
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
            id="password"
            autoComplete="new-password"
            disabled={isPending} 
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password ? String(errors.password.message) : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            disabled={isPending}
            {...register('confirmPassword')}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword ? String(errors.confirmPassword.message) : ''}
          />
          <Button
            type="submit"
            disabled={isPending}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {message && <Notification message={message} type={messageType} />}
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            {"Already have an account? "}
            <Link href="/auth/login" style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={{ color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
              Sign in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
