import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/tailor', async (req, res) => {
  const { cv, jobDescription } = req.body;

  // Dummy response until GPT is integrated
  const mockResponse = `Tailored CV based on job description: ${jobDescription.slice(0, 30)}...`;

  res.json({ tailoredCV: mockResponse });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
