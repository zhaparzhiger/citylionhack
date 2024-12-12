import express from 'express';

const eventsRouter = express.Router();

eventsRouter.get('/health', (req, res) => {
  res.json({ ok: true });
});

export default eventsRouter;
