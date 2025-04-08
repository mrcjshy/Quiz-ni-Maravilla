import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CssBaseline,
  Box
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0d1117',
      paper: '#1e1e2f',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const quizData = [
  { 
    question: 'What is the capital of France?', 
    options: ['Paris', 'London', 'Berlin', 'Madrid'], 
    correctAnswer: 'Paris' 
  },
  { 
    question: 'What is 2 + 2?', 
    options: ['3', '4', '5', '6'], 
    correctAnswer: '4' 
  },
  { 
    question: 'Who wrote "Romeo and Juliet"?', 
    options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'], 
    correctAnswer: 'William Shakespeare' 
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correctAnswer: 'Mars'
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean'
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);


  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ParticleBackground />
      
      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 5
        }}
      >
        <Box textAlign="center" mb={4}>
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              📚 Quiz ni BOSS JOSH   
            </Typography>
          </motion.div>
        </Box>

        {showResult ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ 
              borderRadius: 4, 
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)'
            }}>
              <CardContent sx={{ py: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  🎉 Quiz Completed!
                </Typography>
                
                <Typography variant="h4" align="center" sx={{ mb: 3, color: score > quizData.length / 2 ? '#4caf50' : '#f44336' }}>
                  Score: {score} / {quizData.length}
                </Typography>
                
                <Typography variant="body1" align="center" sx={{ mb: 4, opacity: 0.8 }}>
                  {score === quizData.length ? 'TALINO MONG HAYOP KA!' : 
                   score > quizData.length / 2 ? 'GOODS NA DIN.' : 
                   'BOBO MO PRE'}
                </Typography>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={restartQuiz}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    background: 'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
                    transition: 'transform 0.2s',
                    '&:hover': { 
                      transform: 'scale(1.02)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <>
            <motion.div
              key={currentQuestion}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ 
                mb: 4, 
                borderRadius: 4, 
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                background: 'linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)'
              }}>
                <CardContent sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Question {currentQuestion + 1} of {quizData.length}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    {quizData[currentQuestion].question}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>

            <Grid container spacing={2}>
              {quizData[currentQuestion].options.map((option, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }} 
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleAnswerClick(option)}
                      sx={{
                        borderRadius: 3,
                        py: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.03)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: 'rgba(144, 202, 249, 0.08)'
                        }
                      }}
                    >
                      {option}
                    </Button>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;