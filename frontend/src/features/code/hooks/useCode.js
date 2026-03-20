import { useState } from "react";
import { runCodeApi } from "../services/code.api";
import { LANGUAGE_MAP } from "../utils/languageMap";

const useCode = () => {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const runCode = async ({ code, language }) => {
    try {
      setIsRunning(true);
      setError(null);
      setOutput("");

      const language_id = LANGUAGE_MAP[language] || 63; // default JS

      const res = await runCodeApi({ code, language_id });
      setOutput(res.output);

    } catch (err) {
      setError("Code execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  return {
    output,
    isRunning,
    error,
    runCode,
  };
};

export default useCode;