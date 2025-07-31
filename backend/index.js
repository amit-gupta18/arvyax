const express = require('express')
const app = express();
const sessionRouter = require('./routes/sessionRoutes');
const authRouter = require('./routes/authRoutes');
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", sessionRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

