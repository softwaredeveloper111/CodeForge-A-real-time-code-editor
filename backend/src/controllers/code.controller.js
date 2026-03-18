import asyncWrapper from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js";
import axios from "axios";



export const runCodeController = asyncWrapper(async (req, res) => {
  const { code, language_id, stdin } = req.body;

  // 1. Submit code
  const submission = await axios.post(
    `https://ce.judge0.com/submissions?base64_encoded=false&wait=false`,
    {
      source_code: code,
      language_id,
      stdin: stdin || "",
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const token = submission.data.token;

  // 2. Poll for result
  let result;
  for (let i = 0; i < 10; i++) {  // ✅ infinite loop mat karo
    await new Promise((r) => setTimeout(r, 1000)); // 1s wait

    const res2 = await axios.get(
      `https://ce.judge0.com/submissions/${token}?base64_encoded=false`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    result = res2.data;
    if (result.status.id >= 3) break;
  }

  return res.status(200).json({
    success: true,
    output:
      result.stdout ||
      result.stderr ||
      result.compile_output ||
      "No output",
  });
});