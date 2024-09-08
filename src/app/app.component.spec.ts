import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('CalculatorComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 for an empty input', () => {
    component.numbers = '';
    component.calculate();
    expect(component.result).toBe(0);
    expect(component.errorMessage).toBe('');
  });

  it('should handle comma and newline as delimiters', () => {
    component.numbers = '1,2\n3';
    component.calculate();
    expect(component.result).toBe(6);
    expect(component.errorMessage).toBe('');
  });

  it('should handle custom delimiters', () => {
    component.numbers = '//;\n1;2;3';
    component.calculate();
    expect(component.result).toBe(6);
    expect(component.errorMessage).toBe('');
  });

  it('should throw an error for invalid number format', () => {
    component.numbers = '1,2,abc';
    component.calculate();
    expect(component.result).toBeNull();
    expect(component.errorMessage).toBe('Invalid number format');
  });

  it('should throw an error for negative numbers', () => {
    component.numbers = '1,-2,3';
    component.calculate();
    expect(component.result).toBeNull();
    expect(component.errorMessage).toBe('Negative numbers not allowed: -2');
  });

  it('should reset all fields correctly', () => {
    component.numbers = '1,2,3';
    component.result = 6;
    component.errorMessage = '';
    component.reset();
    expect(component.numbers).toBe('');
    expect(component.result).toBeNull();
    expect(component.errorMessage).toBe('');
  });
});
