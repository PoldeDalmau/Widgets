// Get the progress bar element
const progressBar = document.getElementById('progressBar');
const progressValue = document.getElementById('progressValue');
// Function to update the width of the progress bar
function updateProgressBar(percent) {
    // Ensure percent is within valid range (0 to 100)
    percent = Math.max(0, Math.min(100, percent));
    // Set the width of the progress bar based on the percent value
    progressBar.style.width = percent + '%';
    progressValue.innerText = percent + '%'; // Update the text content of progressValue element
}

const max = 100;
let currentValue = 0;
let increasing = true;

// Battery status
const lowmid = 30;
const midhigh = 60;

// Example: Update the progress bar width to 75%
function demo() 
{
    if (increasing) 
    {
        currentValue++;
        updateProgressBar(currentValue); 
        if (currentValue >= max) 
        {
            increasing = false;
        }
    } else 
    {
        currentValue--;
        updateProgressBar(currentValue);
        if (currentValue <= 0) 
        {
            increasing = true;
        }
    }
    
    if (currentValue < lowmid){
        progressBar.style.backgroundColor = 'red';
    } else if (currentValue > midhigh){
        progressBar.style.backgroundColor = 'green';
    } else {
        progressBar.style.backgroundColor = 'orange';
    }
    setTimeout(demo, 30);
}

demo();