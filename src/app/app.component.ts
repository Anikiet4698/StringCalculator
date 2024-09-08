import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  numbers: string = ''; // Input string from the user
  result: number | null = null; // Stores the result of the calculation
  errorMessage: string = ''; // Stores any error messages

  calculate(): void {
    try {
      this.result = this.add(this.numbers);
      this.errorMessage = ''; // Clear any previous errors
    } catch (error: any) {
      this.result = null;
      this.errorMessage = error.message; // Show the error message
    }
  }

  reset(): void {
    this.numbers = '';
    this.result = null;
    this.errorMessage = '';
  }

  add(numbers: string): number {

    numbers = numbers.replace(/^"|"$/g, '').trim();
    numbers = numbers.replace(/\\n/g, '\n').trim();

    if (!numbers) {
      return 0;
    }

    // Default delimiter regex (comma or newline)
    let delimiter = /[\n,]/;
    
    // Check for custom delimiter
    if (numbers.startsWith('//')) {
      const delimiterIndex = numbers.indexOf('\n');
      const customDelimiter = numbers.substring(2, delimiterIndex);
      delimiter = new RegExp(customDelimiter.replace(/[\[\]\\]/g, '\\$&')); // Escape special characters in delimiter
      numbers = numbers.substring(delimiterIndex + 1);
    }

    // Split numbers based on the delimiter
    const numberArray = numbers.split(delimiter).map(num => {
      const parsedNumber = parseInt(num.trim(), 10); // Use trim() to remove extra spaces
      if (isNaN(parsedNumber)) {
        throw new Error('Invalid number format');
      }
      return parsedNumber;
    });

    // Check for negative numbers
    const negatives = numberArray.filter(num => num < 0);

    if (negatives.length > 0) {
      throw new Error('Negative numbers not allowed: ' + negatives.join(', '));
    }

    // Calculate and return sum
    return numberArray.reduce((a, b) => a + b, 0);
  }

}
