// Model: Handles calculation logic
class CalculatorModel {
    constructor() {
      this.clear();
    }
  
    clear() {
      this.current = '';
      this.operator = null;
      this.previous = '';
    }
  
    appendNumber(number) {
      if (number === '.' && this.current.includes('.')) return;
      this.current += number;
    }
  
    chooseOperator(operator) {
      if (this.current === '') return;
      if (this.previous !== '') {
        this.compute();
      }
      this.operator = operator;
      this.previous = this.current;
      this.current = '';
    }
  
    compute() {
      let result;
      const prev = parseFloat(this.previous);
      const curr = parseFloat(this.current);
  
      // For scientific functions, only one operand is needed (prev)
      switch (this.operator) {
        case '+':
          result = prev + curr;
          break;
        case '-':
          result = prev - curr;
          break;
        case '*':
          result = prev * curr;
          break;
        case '/':
          result = curr === 0 ? 'Error' : prev / curr;
          break;
        case 'sin':
          // Degrees to radians
          result = Math.sin(prev * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(prev * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(prev * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(prev);
          break;
        case 'sqrt':
          result = Math.sqrt(prev);
          break;
        default:
          return;
      }
      this.current = result.toString();
      this.operator = null;
      this.previous = '';
    }
  
    getDisplay() {
      return this.current || this.previous || '0';
    }
  }
  
  // View: Handles UI updates
  class CalculatorView {
    constructor(displayElement) {
      this.displayElement = displayElement;
    }
    updateDisplay(value) {
      this.displayElement.value = value;
    }
  }
  
  // Controller: Connects Model & View, handles user input
  class CalculatorController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.init();
    }
  
    init() {
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const value = btn.getAttribute('data-value');
          if (!isNaN(value) || value === '.') {
            this.model.appendNumber(value);
          } else if (value === 'C') {
            this.model.clear();
          } else if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(value)) {
            // For scientific functions, use the current as operand
            this.model.operator = value;
            this.model.previous = this.model.current;
            this.model.current = '';
            this.model.compute();
          } else {
            this.model.chooseOperator(value);
          }
          this.view.updateDisplay(this.model.getDisplay());
        });
      });
  
      document.querySelector('.equals').addEventListener('click', () => {
        this.model.compute();
        this.view.updateDisplay(this.model.getDisplay());
      });
    }
  }
  
  // Initialize MVC Components
  const model = new CalculatorModel();
  const view = new CalculatorView(document.getElementById('display'));
  const controller = new CalculatorController(model, view);
  view.updateDisplay(model.getDisplay());