'use client'

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Snackbar, SnackbarContent, IconButton, Divider, Paper, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PostSchema } from '@/src/schemas';
import * as z from 'zod';
import { sendMessage } from '@/src/actions/message';

interface StudentPostProps {
  post: z.infer<typeof PostSchema>;
  companyId: string;
}

const StudentPostView = ({ post, companyId }: StudentPostProps) => {
  const [messageContent, setMessageContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const checkMessage = async () => {
      const sent = (post.messages ?? []).some(message => message.fromCompanyId === companyId);
      setHasSentMessage(sent);
    };

    checkMessage();
  }, [post.messages, companyId]);

  const handleSendMessage = async () => {
    setIsSending(true);
    try {
      const result = await sendMessage({
        content: messageContent,
        postId: post.id,
        toStudentId: post.studentId,
        fromCompanyId: companyId,
      });

      if (result.error) {
        alert(result.error);
      } else {
        setMessageContent('');
        setHasSentMessage(true);
        alert('Message sent successfully');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography component="h1" variant="h4" gutterBottom>
            Student Post Details
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {post.isActive ? 'Active' : 'Inactive'}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            {post.content}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Work Experiences
            </Typography>
            <Divider />
            {post.workExperiences?.map((experience, index) => (
              <Box key={index} sx={{ marginBottom: 4 }}>
                <Typography variant="body2">
                  <strong>Company:</strong> {experience.company}
                </Typography>
                <Typography variant="body2">
                  <strong>Position:</strong> {experience.position} - {experience.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {experience.startDate} to {experience.endDate}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Education
            </Typography>
            <Divider />
            {post.education?.map((edu, index) => (
              <Box key={index} sx={{ marginBottom: 4 }}>
                <Typography variant="body2">
                  <strong>Degree:</strong> {edu.degree} - {edu.institution}
                </Typography>
                <Typography variant="body2">
                  <strong>Graduation Year:</strong> {edu.yearOfGraduation}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Skills
            </Typography>
            <Divider />
            {post.skills?.map((skill, index) => (
              <Box key={index} sx={{ marginBottom: 4 }}>
                <Typography variant="body2">
                  <strong>Skill:</strong> {skill.skillName}
                </Typography>
                <Typography variant="body2">
                  <strong>Level:</strong> {skill.level}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>

        {hasSentMessage ? (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', marginTop: 4 }}>
            You have already sent a message to this post.
          </Typography>
        ) : (
          <Box sx={{ marginTop: 4 }}>
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleSendMessage}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <SnackbarContent
            message="Post updated successfully!"
            sx={{ backgroundColor: 'green' }}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default StudentPostView;
