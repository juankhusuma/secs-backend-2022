import { Response } from "express";

export default function send(
  res: Response,
  data: unknown | null,
  error: Error | null
) {
  if (error)
    return res.status(500).json({
      status: "Failed",
      code: 500,
      error: { message: error.message },
    });
  return res.status(200).json({ status: "Success", code: 200, data });
}
