import re
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from responses import responses  # Import responses from the external file
from shortforms import short_forms  # Import shortforms from the external file


# Function to preprocess input
def preprocess_input(user_input):
    words = user_input.lower().split()
    expanded_words = [short_forms.get(word, word) for word in words]
    return " ".join(expanded_words)

# Function to evaluate mathematical expressions
def evaluate_expression(expression):
    try:
        # Remove any non-numeric or operator characters for safety
        sanitized_expression = re.sub(r"[^\d\.\+\-\*/\(\)\s]", "", expression)
        result = eval(sanitized_expression)
        return f"The result is {result}"
    except Exception as e:
        return "It seems like there was an error in your calculation. Please try again."

# Function to check if input is a calculation
def is_calculation(user_input):
    # Match simple arithmetic patterns
    return re.match(r"^[\d\.\+\-\*/\(\)\s]+$", user_input) is not None

def get_response(user_input):
    # Preprocess the user input
    user_input = preprocess_input(user_input)
    
    # Check if the input is a calculation
    if is_calculation(user_input):
        return evaluate_expression(user_input)
    
    # Find the closest matching key
    possible_responses = list(responses.keys())
    best_match = process.extractOne(user_input, possible_responses, scorer=fuzz.ratio)

    # Check if the match is good enough
    if best_match and best_match[1] > 30:  # Adjust threshold as needed
        return responses[best_match[0]]
    else:
        return "I'm sorry, I didn't understand that. Could you please rephrase?"


