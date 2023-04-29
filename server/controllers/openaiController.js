// Controller to call openai API
// Path: server/controllers/openaiController.js

const axios = require("axios");
const { handleError } = require("../middleware/errorMiddleware");
const recommendationController = require("./recommendationController");
require("dotenv").config({ path: "./server/config/.env" });

// test if .env is found and passing the api key
console.log("KEY IS THE FOLLOWING: ", process.env.OPENAI_API_KEY);

// prep for openai api call authorization
const openai = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Function that takes prompt and returns a response from openai
async function getOpenaiResponse(prompt, model) {
  try {
    const response = await openai.post(
      "https://api.openai.com/v1/completions/",
      {
        model: model,
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: ["\n", " Human:", " AI:"],
      }
    );
    return response.data.choices[0].text;
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}

// Function that receives user input, calls the getOpenaiResponse() function, and saves the response as a recommendation
exports.getTravelSuggestions = async (req, res, next) => {
  try {
    // Retrieve the user ID from the authentication token
    const userId = req.userId; // Assuming you have set req.userId in the verifyToken middleware

    // Receive the destination and reason prompts from the user
    const destinationPrompt = req.body.destinationPrompt;
    const reasonPrompt = req.body.reasonPrompt;

    // Combine the destination and reason prompts
    const combinedPrompt = `${destinationPrompt} ${reasonPrompt}`;

    // Call getOpenaiResponse() with the combined prompt
    const openaiResponse = await getOpenaiResponse(
      combinedPrompt,
      process.env.OPENAI_MODEL
    );

    // Save the response to the recommendations table, assigned to the current logged-in user
    const savedRecommendation =
      await recommendationController.createRecommendation({
        userId,
        destination: destinationPrompt,
        reason: reasonPrompt,
        recommendation: openaiResponse,
      });

    // Return the saved recommendation to the user
    res.status(200).json(savedRecommendation);
  } catch (error) {
    next(error);
  }
};

/*
getOpenaiResponse(): This function takes a prompt and a model as input, makes a request to the OpenAI API 
using the provided prompt and model, and returns the generated text response.

getTravelSuggestions(): This exported function is an Express route handler that receives user input in the 
form of destination and reason prompts, calls the getOpenaiResponse() function with the combined prompt, 
saves the API response as a recommendation for the currently logged-in user, and returns the saved recommendation to the user.
*/
